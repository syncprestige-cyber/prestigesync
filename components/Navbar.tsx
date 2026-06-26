"use client";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/[0.07] bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center relative">
            <Image src="/PrestigeSync.png" alt="PrestigeSync Logo" width={36} height={36} className="object-contain" />
          </div>
          <span className="text-[17px] font-semibold tracking-tight">PrestigeSync</span>
        </div>

        <div className="hidden md:flex gap-8">
          <a href="#products" className="text-sm text-white/50 hover:text-white transition-colors duration-200">Produk</a>
          <a href="#about" className="text-sm text-white/50 hover:text-white transition-colors duration-200">Tentang</a>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-white/[0.07] bg-[#0a0a0a]/95 px-8 py-4 flex flex-col gap-4">
          <a href="#products" className="text-sm text-white/50 hover:text-white transition-colors duration-200" onClick={() => setIsOpen(false)}>Produk</a>
          <a href="#about" className="text-sm text-white/50 hover:text-white transition-colors duration-200" onClick={() => setIsOpen(false)}>Tentang</a>
        </div>
      )}
    </nav>
  );
}
