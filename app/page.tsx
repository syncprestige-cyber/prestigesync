import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-linear-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center font-bold text-xl">
              PS
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">PrestigeSync</h1>
          </div>
          <div className="hidden md:flex gap-8 text-sm">
            <a href="#products" className="hover:text-orange-400 transition">Produk</a>
            <a href="#about" className="hover:text-orange-400 transition">Tentang</a>
          </div>
          <a href="#products" className="px-6 py-2.5 bg-white text-black rounded-full font-medium hover:bg-orange-400 hover:text-white transition">
            Lihat Produk
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-orange-400 text-sm tracking-widest mb-4">EST. 2024 • INDONESIA</p>
          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
            Synced with<br />
            <span className="bg-linear-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
            Excellence
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Brand teknologi yang menggabungkan kesederhanaan, kecerdasan, dan pengalaman premium.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <a href="#products" className="px-8 py-4 bg-orange-500 hover:bg-orange-600 rounded-2xl text-lg font-semibold transition">
              Jelajahi Produk
            </a>
            <a href="#contact" className="px-8 py-4 border border-white/30 hover:bg-white/5 rounded-2xl text-lg font-semibold transition">
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-20 bg-black/60">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Produk Kami</h2>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Math Rush */}
            <div className="group bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 hover:border-orange-500/50 transition-all">
              <div className="h-80 bg-zinc-800 flex items-center justify-center p-8 relative">
                <Image 
                  src="https://i.imgur.com/0z3vK8L.png" 
                  alt="Math Rush" 
                  width={300} 
                  height={300}
                  className="group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8">
                <span className="px-4 py-1.5 bg-orange-500/10 text-orange-400 text-sm rounded-full">Game Edukasi</span>
                <h3 className="text-3xl font-semibold mt-4 mb-3">Math Rush</h3>
                <p className="text-gray-400 leading-relaxed">
                  Game matematika cepat dengan operasi penjumlahan dan pengurangan sederhana.
                  Cocok untuk siapa saja yang ingin melatih kemampuan berhitung dengan cara yang seru.
                </p>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 block w-full py-3.5 bg-white text-black rounded-2xl font-medium text-center hover:bg-orange-400 hover:text-white transition"
                >
                  Download di Google Play
                </a>
              </div>
            </div>

            {/* Video Clipper */}
            <div className="group bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/30 transition-all opacity-90">
              <div className="h-80 bg-linear-to-br from-purple-950 to-zinc-900 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-7xl mb-6">🎬</div>
                  <p className="text-2xl font-semibold text-purple-300">Coming Soon</p>
                </div>
              </div>
              <div className="p-8">
                <span className="px-4 py-1.5 bg-purple-500/10 text-purple-400 text-sm rounded-full">Productivity Tool</span>
                <h3 className="text-3xl font-semibold mt-4 mb-3">Video Clipper Desktop</h3>
                <p className="text-gray-400 leading-relaxed">
                  Tool canggih untuk memotong, mengedit, dan mengoptimasi video clip dengan cepat. 
                  Saat ini masih dalam tahap pengembangan.
                </p>
                <button className="mt-8 w-full py-3.5 border border-white/30 rounded-2xl font-medium hover:bg-white/5 transition">
                  Notify Me Saat Rilis
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 text-center text-sm text-gray-500">
        <p>© 2024 - {new Date().getFullYear()} PrestigeSync. All rights reserved.</p>
        <p className="mt-2">Made with passion in Indonesia</p>
        <p className="mt-4">
          <a href="/privacy" className="hover:text-orange-400 transition underline">
            Privacy Policy
          </a>
        </p>
      </footer>
    </main>
  );
}