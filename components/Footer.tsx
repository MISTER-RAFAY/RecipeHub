import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Column 1: Brand */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">RecipeHub</h3>
          <p className="text-sm">
            Delicious recipes for everyone. <br/> Cook better, eat healthier.
          </p>
        </div>

        {/* Column 2: Legal */}
        <div className="flex flex-col space-y-2">
          <h4 className="font-semibold text-white mb-2">Legal</h4>
          <Link href="/terms" className="hover:text-green-400 transition">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-green-400 transition">Privacy Policy</Link>
          <Link href="/refund" className="hover:text-green-400 transition">Refund Policy</Link>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h4 className="font-semibold text-white mb-2">Contact</h4>
          <p className="text-sm">recipehub120@gmail.com</p>
        </div>
      </div>
      
      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} RecipeHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;