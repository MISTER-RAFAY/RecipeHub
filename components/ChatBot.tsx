"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle, ImageIcon, Mic, MicOff, Paperclip, Calculator, Crown } from "lucide-react";
import Link from "next/link";

type Message = {
  role: "user" | "assistant";
  text: string;
  image?: string;
};

const DAILY_LIMIT = 5;

function getDailyUsage(): { count: number; date: string } {
  if (typeof window === "undefined") return { count: 0, date: "" };
  const stored = localStorage.getItem("chatbot_usage");
  if (!stored) return { count: 0, date: "" };
  return JSON.parse(stored);
}

function incrementDailyUsage(): number {
  const today = new Date().toDateString();
  const usage = getDailyUsage();
  const newCount = usage.date === today ? usage.count + 1 : 1;
  localStorage.setItem("chatbot_usage", JSON.stringify({ count: newCount, date: today }));
  return newCount;
}

function getRemainingQuestions(): number {
  const today = new Date().toDateString();
  const usage = getDailyUsage();
  if (usage.date !== today) return DAILY_LIMIT;
  return Math.max(0, DAILY_LIMIT - usage.count);
}

function isPremiumUser(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("isPremium") === "true";
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi! I'm RecipeHub's AI assistant. Ask me anything about recipes, upload a food photo, calculate calories, or speak your question!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [remaining, setRemaining] = useState(DAILY_LIMIT);
  const [showPaywall, setShowPaywall] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setRemaining(getRemainingQuestions());
    setIsPremium(isPremiumUser());
  }, [isOpen]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText && !selectedImage && !selectedFile) return;

    if (!isPremium && remaining <= 0) {
      setShowPaywall(true);
      return;
    }

    const userMessage: Message = {
      role: "user",
      text: messageText,
      image: previewImage || undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setPreviewImage(null);
    setIsLoading(true);

    if (!isPremium) {
      const newCount = incrementDailyUsage();
      setRemaining(Math.max(0, DAILY_LIMIT - newCount));
    }

    try {
      const formData = new FormData();
      formData.append("message", messageText);
      if (selectedImage) formData.append("image", selectedImage);
      if (selectedFile) formData.append("file", selectedFile);

      setSelectedImage(null);
      setSelectedFile(null);

      const res = await fetch("/api/chat", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.reply || data.error },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedImage(file);
    const reader = new FileReader();
    reader.onload = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setInput(`Attached file: ${file.name}`);
  };

  const toggleVoice = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Voice input is not supported in your browser.");
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsRecording(false);
    };

    recognition.onerror = () => setIsRecording(false);
    recognition.onend = () => setIsRecording(false);

    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  };

  const quickPrompts = [
    { label: "Calorie calculator", prompt: "Calculate calories for: " },
    { label: "What can I cook?", prompt: "I have eggs, cheese and bread. What can I make?" },
    { label: "Healthy dinner", prompt: "Suggest a healthy dinner recipe under 500 calories." },
    { label: "Identify food", prompt: "I uploaded a food photo. What is it and how do I make it?" },
  ];

  const chatWindowStyle: React.CSSProperties = isMobile
    ? {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 999999,
        width: "100%",
        height: "90vh",
        backgroundColor: "white",
        borderRadius: "16px 16px 0 0",
        boxShadow: "0 -4px 32px rgba(0,0,0,0.18)",
        border: "1px solid #f1f5f9",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }
    : {
        position: "fixed",
        bottom: "24px",
        right: "24px",
        zIndex: 999999,
        width: "370px",
        maxWidth: "95vw",
        height: "560px",
        backgroundColor: "white",
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        border: "1px solid #f1f5f9",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      };

  return (
    <>
      {/* Floating Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open recipe assistant"
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 999999,
            width: "56px",
            height: "56px",
            backgroundColor: "#16a34a",
            borderRadius: "50%",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          <MessageCircle color="white" size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={chatWindowStyle}>
          {/* Header */}
          <div className="bg-green-600 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span style={{ fontSize: "16px" }}>🍽️</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">RecipeHub AI</p>
                <p className="text-green-100 text-xs">Recipe & Calorie Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {!isPremium && (
                <span className="text-xs text-green-100">
                  {remaining}/{DAILY_LIMIT} left
                </span>
              )}
              {isPremium && (
                <span className="flex items-center gap-1 text-xs text-yellow-300">
                  <Crown size={12} /> Premium
                </span>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-green-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Paywall overlay */}
          {showPaywall && (
            <div style={{
              position: "absolute",
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: "rgba(255,255,255,0.97)",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>👨‍🍳</div>
              <h2 style={{ fontSize: "20px", fontWeight: 600, color: "#111", marginBottom: "8px" }}>
                Daily limit reached
              </h2>
              <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "8px" }}>
                You have used all 5 free questions for today.
              </p>
              <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "24px" }}>
                Upgrade to Premium for unlimited recipe questions, calorie calculations and more.
              </p>
              <Link href="/pricing" onClick={() => setIsOpen(false)}>
                <button style={{
                  backgroundColor: "#16a34a",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  padding: "12px 24px",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  width: "100%",
                  marginBottom: "12px",
                }}>
                  Upgrade to Premium
                </button>
              </Link>
              <button
                onClick={() => setShowPaywall(false)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#9ca3af",
                  fontSize: "13px",
                  cursor: "pointer",
                }}
              >
                Come back tomorrow for 5 free questions
              </button>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-green-600 text-white rounded-br-sm"
                      : "bg-white text-gray-800 border border-gray-100 rounded-bl-sm shadow-sm"
                  }`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="uploaded food"
                      className="rounded-lg mb-2 max-h-32 object-cover w-full"
                    />
                  )}
                  <p style={{ whiteSpace: "pre-wrap" }}>{msg.text}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 flex gap-2 overflow-x-auto bg-white border-t border-gray-100">
            {quickPrompts.map((q) => (
              <button
                key={q.label}
                onClick={() => setInput(q.prompt)}
                className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full whitespace-nowrap hover:bg-green-100 transition border border-green-100"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Image Preview */}
          {previewImage && (
            <div className="px-3 py-2 bg-white border-t border-gray-100 flex items-center gap-2">
              <img src={previewImage} alt="preview" className="h-12 w-12 object-cover rounded-lg" />
              <span className="text-xs text-gray-500 flex-1">Image ready to send</span>
              <button
                onClick={() => { setPreviewImage(null); setSelectedImage(null); }}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Input Area */}
          <div className="px-3 py-3 bg-white border-t border-gray-100">
            {!isPremium && remaining <= 2 && remaining > 0 && (
              <p className="text-xs text-orange-500 mb-2 text-center">
                ⚠️ {remaining} question{remaining === 1 ? "" : "s"} left today —{" "}
                <Link href="/pricing" className="underline font-medium">upgrade for unlimited</Link>
              </p>
            )}
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200">
              <button
                onClick={() => imageInputRef.current?.click()}
                className="text-gray-400 hover:text-green-600 transition"
                title="Upload food photo"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
              <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-gray-400 hover:text-green-600 transition"
                title="Upload recipe file"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <input ref={fileInputRef} type="file" accept=".txt,.pdf,.csv" className="hidden" onChange={handleFileSelect} />

              <button
                onClick={() => setInput("Calculate calories for: ")}
                className="text-gray-400 hover:text-green-600 transition"
                title="Calorie calculator"
              >
                <Calculator className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder={remaining <= 0 && !isPremium ? "Limit reached — upgrade to continue" : "Ask about recipes or calories..."}
                disabled={remaining <= 0 && !isPremium}
                className="flex-1 bg-transparent text-sm outline-none text-gray-800 placeholder-gray-400 disabled:opacity-50"
              />

              <button
                onClick={toggleVoice}
                className={`transition ${isRecording ? "text-red-500 animate-pulse" : "text-gray-400 hover:text-green-600"}`}
                title="Voice input"
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              <button
                onClick={() => sendMessage()}
                disabled={isLoading || (remaining <= 0 && !isPremium)}
                className="text-green-600 hover:text-green-700 disabled:opacity-40 transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}