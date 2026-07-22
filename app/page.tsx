import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">

      <Navbar />

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
            <a href="#products" className="px-7 py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-[15px] font-semibold transition-all duration-200 tracking-tight">
              Jelajahi Produk
            </a>
            <a href="#contact" className="px-7 py-3.5 text-white/55 hover:text-white text-[15px] font-medium transition-colors duration-200 tracking-tight">
              Hubungi Kami →
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="border-t border-b border-white/[0.07] py-8">
        <div className="max-w-xl mx-auto flex justify-center gap-16 text-center">
          <div>
            <p className="text-xl font-bold tracking-tight">3+</p>
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
          <h2 className="text-[36px] font-bold tracking-tight text-center mb-4">Produk Kami</h2>
          <p className="text-center text-white/35 text-sm mb-16">Produk yang sedang aktif dan tersedia</p>

          {/* StreamVista - Featured */}
          <div className="max-w-2xl mx-auto">
            <div className="group bg-zinc-900/60 rounded-2xl overflow-hidden border border-white/8 hover:border-blue-500/40 transition-all duration-300">
              <div className="h-72 bg-linear-to-br from-blue-950/60 to-zinc-900 relative overflow-hidden flex items-center justify-center">
                <div className="relative w-36 h-36 group-hover:scale-105 transition-transform duration-500">
                  {/* priority + loading="eager" untuk fix LCP warning */}
                  <Image
                    src="/streamvista/icons/icon-master-4096.png"
                    alt="StreamVista"
                    fill
                    sizes="144px"
                    className="object-contain rounded-2xl"
                    priority
                    loading="eager"
                  />
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full font-medium">TV Streaming</span>
                  <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs rounded-full font-medium">● Live</span>
                </div>
                <h3 className="text-3xl font-semibold tracking-tight mb-3">StreamVista</h3>
                <p className="text-white/45 text-sm leading-relaxed mb-8">
                  Tonton siaran TV dari seluruh dunia secara gratis. Ribuan channel dari berbagai negara tersedia di genggamanmu. Tanpa biaya, tanpa registrasi.
                </p>

                <a
                  href="/streamvista"
                  className="block w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-semibold text-center transition-all duration-200"
                >
                  Buka StreamVista →
                </a>
              </div>
            </div>
          </div>

          {/* FunMath - Featured */}
          <div className="max-w-2xl mx-auto">
            <div className="group bg-zinc-900/60 rounded-2xl overflow-hidden border border-white/8 hover:border-blue-500/40 transition-all duration-300">
              <div className="h-72 bg-linear-to-br from-blue-950/60 to-zinc-900 relative overflow-hidden flex items-center justify-center">
                <div className="relative w-36 h-36 group-hover:scale-105 transition-transform duration-500">
                  {/* priority + loading="eager" untuk fix LCP warning */}
                  <Image
                    src="/funmath/icons/funmath.png"
                    alt="Fun Math"
                    fill
                    sizes="144px"
                    className="object-contain rounded-2xl"
                    priority
                    loading="eager"
                  />
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs rounded-full font-medium">Fun Math</span>
                  <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs rounded-full font-medium">● Live</span>
                </div>
                <h3 className="text-3xl font-semibold tracking-tight mb-3">Fun Math</h3>
                <p className="text-white/45 text-sm leading-relaxed mb-8">
                  Game Matematika yang menyenangkan untuk anak-anak. Latih kemampuan berhitung, penjumlahan, pengurangan, perkalian, dan pembagian dengan cara yang interaktif dan seru.
                </p>

                <a
                  href="https://play.google.com/store/apps/details?id=com.aistudio.mathkilat.gmqxpv"
                  className="block w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full text-sm font-semibold text-center transition-all duration-200"
                >
                  Download Fun Math →
                </a>
              </div>
            </div>
          </div>

          {/* Coming Soon */}
          <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {/* <a
              href="https://play.google.com/store/apps/details?id=com.aistudio.mathkilat.gmqxpv"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900/60 rounded-2xl border border-white/8 hover:border-orange-500/40 p-6 text-center transition-all duration-300"
            >
              <div className="relative w-12 h-12 mx-auto mb-3">
                <Image
                  src="/funmath/icons/funmath.png"
                  alt="Fun Math"
                  fill
                  sizes="48px"
                  className="object-contain rounded-xl"
                />
              </div>
              <h4 className="font-medium text-sm text-white">Fun Math</h4>
              <p className="text-xs text-green-400 mt-1">● Live</p>
            </a> */}
            <a
              href="https://play.google.com/store/apps/details?id=com.prestigesync.calender"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-zinc-900/60 rounded-2xl border border-white/8 hover:border-orange-500/40 p-6 text-center transition-all duration-300"
            >
              <div className="relative w-12 h-12 mx-auto mb-3">
                <Image
                  src="/kalender/icons/kalender.png"
                  alt="Kalender"
                  fill
                  sizes="48px"
                  className="object-contain rounded-xl"
                />
              </div>
              <h4 className="font-medium text-sm text-white">Kalender</h4>
              <p className="text-xs text-green-400 mt-1">● Live</p>
            </a>
            <div className="bg-zinc-900/30 rounded-2xl border border-white/5 p-6 text-center opacity-40">
              <div className="text-4xl mb-3">🎬</div>
              <h4 className="font-medium text-sm text-white/60">Video Clipper</h4>
              <p className="text-xs text-white/30 mt-1">Coming Soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.07] py-10 text-center text-xs text-white/30">
        <p>© 2024 – {new Date().getFullYear()} PrestigeSync. All rights reserved.</p>
        <p className="mt-1.5">Made with passion in Indonesia</p>
        <p className="mt-4">
          <a href="/privacy" className="hover:text-orange-400 transition-colors underline underline-offset-2">Privacy Policy</a>
        </p>
      </footer>
    </main>
  );
}