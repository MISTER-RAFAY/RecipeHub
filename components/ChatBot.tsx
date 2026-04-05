"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle, Image, Mic, MicOff, Paperclip, Calculator } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  text: string;
  image?: string;
};

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

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText && !selectedImage && !selectedFile) return;

    const userMessage: Message = {
      role: "user",
      text: messageText,
      image: previewImage || undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setPreviewImage(null);
    setIsLoading(true);

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

  return (
    <>
      {/* Floating Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          aria-label="Open recipe assistant"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[370px] max-w-[95vw] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          style={{ height: "560px" }}
        >
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
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-green-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

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
              <button onClick={() => { setPreviewImage(null); setSelectedImage(null); }} className="text-gray-400 hover:text-red-500">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Input Area */}
          <div className="px-3 py-3 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2 border border-gray-200">
              {/* Image upload */}
              <button
                onClick={() => imageInputRef.current?.click()}
                className="text-gray-400 hover:text-green-600 transition"
                title="Upload food photo"
              >
                <Image className="w-4 h-4" />
              </button>
              <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />

              {/* File upload */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-gray-400 hover:text-green-600 transition"
                title="Upload recipe file"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <input ref={fileInputRef} type="file" accept=".txt,.pdf,.csv" className="hidden" onChange={handleFileSelect} />

              {/* Calorie shortcut */}
              <button
                onClick={() => setInput("Calculate calories for: ")}
                className="text-gray-400 hover:text-green-600 transition"
                title="Calorie calculator"
              >
                <Calculator className="w-4 h-4" />
              </button>

              {/* Text input */}
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about recipes or calories..."
                className="flex-1 bg-transparent text-sm outline-none text-gray-800 placeholder-gray-400"
              />

              {/* Voice input */}
              <button
                onClick={toggleVoice}
                className={`transition ${isRecording ? "text-red-500 animate-pulse" : "text-gray-400 hover:text-green-600"}`}
                title="Voice input"
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Send */}
              <button
                onClick={() => sendMessage()}
                disabled={isLoading}
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