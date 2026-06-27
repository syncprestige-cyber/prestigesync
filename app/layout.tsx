import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrestigeSync - Synced with Excellence",
  description:
    "Brand teknologi yang menggabungkan kesederhanaan, kecerdasan, dan pengalaman premium. Math Rush & Video Clipper.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Verifikasi kepemilikan AdSense */}
        <meta name="google-adsense-account" content="ca-pub-3213485046839115" />

        {/* Google AdSense — pakai <script> biasa agar tidak dapat data-nscript dari Next.js */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3213485046839115"
          crossOrigin="anonymous"
        />
      </head>

      <body className="min-h-full flex flex-col">
        {children}

        {/* Google Analytics — pakai <Script> Next.js di luar <head>, strategy afterInteractive */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Z255FJE85S"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z255FJE85S');
          `}
        </Script>
      </body>
    </html>
  );
}