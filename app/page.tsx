import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/[0.07] bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center relative">
              <Image
                src="/PrestigeSync.png"
                alt="PrestigeSync Logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <span className="text-[17px] font-semibold tracking-tight">PrestigeSync</span>
          </div>

          <div className="hidden md:flex gap-8">
            <a href="#products" className="text-sm text-white/50 hover:text-white transition-colors duration-200">Produk</a>
            <a href="#about" className="text-sm text-white/50 hover:text-white transition-colors duration-200">Tentang</a>
          </div>

          <a
            href="#products"
            className="px-5 py-2 border border-white/15 rounded-full text-sm font-medium hover:bg-white/[0.07] transition-all duration-200"
          >
            Lihat Produk
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] tracking-[2.5px] text-orange-500 uppercase mb-7 font-medium">
            Est. 2024 &nbsp;·&nbsp; Indonesia
          </p>

          <h1 className="text-[64px] md:text-[72px] font-bold leading-[1.07] tracking-[-2.5px] mb-6">
            Synced with<br />
            <span className="text-orange-500">Excellence.</span>
          </h1>

          <p className="text-[17px] leading-relaxed text-white/45 max-w-md mx-auto mb-10 font-normal">
            Brand teknologi yang menggabungkan kesederhanaan, kecerdasan, dan pengalaman premium.
          </p>

          <div className="flex gap-3 justify-center items-center">
            <a
              href="#products"
              className="px-7 py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-[15px] font-semibold transition-all duration-200 tracking-tight"
            >
              Jelajahi Produk
            </a>
            <a
              href="#contact"
              className="px-7 py-3.5 text-white/55 hover:text-white text-[15px] font-medium transition-colors duration-200 tracking-tight"
            >
              Hubungi Kami →
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="border-t border-b border-white/[0.07] py-8">
        <div className="max-w-xl mx-auto flex justify-center gap-16 text-center">
          <div>
            <p className="text-xl font-bold tracking-tight">2+</p>
            <p className="text-xs text-white/35 mt-1 tracking-wide">Produk Aktif</p>
          </div>
          <div>
            <p className="text-xl font-bold tracking-tight">2024</p>
            <p className="text-xs text-white/35 mt-1 tracking-wide">Didirikan</p>
          </div>
          <div>
            <p className="text-xl font-bold tracking-tight">🇮🇩</p>
            <p className="text-xs text-white/35 mt-1 tracking-wide">Made in Indonesia</p>
          </div>
        </div>
      </div>

      {/* Products */}
      <section id="products" className="py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[36px] font-bold tracking-tight text-center mb-16">Produk Kami</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Math Rush */}
            <div className="group bg-zinc-900/60 rounded-2xl overflow-hidden border border-white/[0.08] hover:border-orange-500/40 transition-all duration-300">
              <div className="h-64 bg-zinc-800/60 relative overflow-hidden">
                <Image
                  src="/mathrush-logo.png"
                  alt="Math Rush"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain p-10 group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-7">
                <span className="px-3 py-1 bg-orange-500/10 text-orange-400 text-xs rounded-full font-medium">Game Edukasi</span>
                <h3 className="text-2xl font-semibold tracking-tight mt-4 mb-2">Math Rush</h3>
                <p className="text-white/45 text-sm leading-relaxed">
                  Game matematika cepat dengan operasi penjumlahan dan pengurangan sederhana.
                  Cocok untuk siapa saja yang ingin melatih kemampuan berhitung dengan cara yang seru.
                </p>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 block w-full py-3 bg-white text-black rounded-full text-sm font-semibold text-center hover:bg-orange-500 hover:text-white transition-all duration-200"
                >
                  Download di Google Play
                </a>
              </div>
            </div>

            {/* Video Clipper */}
            <div className="group bg-zinc-900/60 rounded-2xl overflow-hidden border border-white/[0.08] hover:border-purple-500/30 transition-all duration-300">
              <div className="h-64 bg-gradient-to-br from-purple-950/60 to-zinc-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-lg font-medium text-purple-300/80">Coming Soon</p>
                </div>
              </div>
              <div className="p-7">
                <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-xs rounded-full font-medium">Productivity Tool</span>
                <h3 className="text-2xl font-semibold tracking-tight mt-4 mb-2">Video Clipper Desktop</h3>
                <p className="text-white/45 text-sm leading-relaxed">
                  Tool canggih untuk memotong, mengedit, dan mengoptimasi video clip dengan cepat.
                  Saat ini masih dalam tahap pengembangan.
                </p>
                <button className="mt-7 w-full py-3 border border-white/15 rounded-full text-sm font-medium hover:bg-white/[0.05] transition-all duration-200">
                  Notify Me Saat Rilis
                </button>
              </div>
            </div>

            {/* StreamVista */}
            <div className="group bg-zinc-900/60 rounded-2xl overflow-hidden border border-white/[0.08] hover:border-blue-500/40 transition-all duration-300">
              <div className="h-64 bg-gradient-to-br from-blue-950/60 to-zinc-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📺</div>
                  <p className="text-lg font-medium text-blue-300/80">StreamVista</p>
                </div>
              </div>
              <div className="p-7">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full font-medium">TV Streaming</span>
                <h3 className="text-2xl font-semibold tracking-tight mt-4 mb-2">StreamVista</h3>
                <p className="text-white/45 text-sm leading-relaxed">
                  Tonton siaran TV dari seluruh dunia secara gratis. Ribuan channel dari berbagai negara tersedia di genggamanmu.
                </p>
                <a
                  href="/streamvista"
                  className="mt-7 block w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-semibold text-center transition-all duration-200"
                >
                  Buka StreamVista
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.07] py-10 text-center text-xs text-white/30">
        <p>© 2024 – {new Date().getFullYear()} PrestigeSync. All rights reserved.</p>
        <p className="mt-1.5">Made with passion in Indonesia</p>
        <p className="mt-4">
          <a href="/privacy" className="hover:text-orange-400 transition-colors underline underline-offset-2">
            Privacy Policy
          </a>
        </p>
      </footer>
    </main>
  );
}