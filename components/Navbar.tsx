"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled
        ? "border-b border-white/[0.07] bg-[#0a0a0a]/95 backdrop-blur-xl shadow-lg shadow-black/20"
        : "border-b border-transparent bg-[#0a0a0a]/70 backdrop-blur-md"
    }`}>
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
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/5 transition-colors duration-200"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${isOpen ? "rotate-45 translate-y-1.5" : ""}`} />
            <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
          </div>
        </button>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="border-t border-white/[0.07] bg-[#0a0a0a]/98 px-8 py-5 flex flex-col gap-1">
          <a href="#products" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200">
            <span className="text-orange-500 text-xs">01</span>
            Produk
          </a>
          <a href="#about" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200">
            <span className="text-orange-500 text-xs">02</span>
            Tentang
          </a>
        </div>
      </div>
    </nav>
  );
}