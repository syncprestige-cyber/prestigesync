# StreamVista — TV Dunia di Genggamanmu

Aplikasi web (PWA) untuk menonton channel TV gratis dari seluruh dunia, langsung dari browser HP Android. Tampilan dark mode ala Netflix, lengkap dengan pencarian, filter negara/kategori, dan favorit.

## Apa isinya?
```
StreamVista/
├── index.html          → halaman utama
├── manifest.json        → konfigurasi PWA (agar bisa "diinstall")
├── service-worker.js    → cache offline untuk shell aplikasi
├── css/style.css        → semua styling (dark theme)
├── js/app.js            → logic: fetch channel, player, search, favorit
├── icons/               → ikon aplikasi (192px & 512px)
└── README.md            → file ini
```

## Sumber data channel
Aplikasi ini mengambil daftar channel & link siaran secara **real-time** dari
[iptv-org](https://github.com/iptv-org/iptv) — database channel IPTV gratis & legal
terbesar yang open-source, isinya ribuan channel dari hampir semua negara
(berita, olahraga, hiburan, musik, anak, dll). Karena diambil langsung dari
internet setiap kali app dibuka, **kamu tidak perlu update apapun** — daftar
channel otomatis ikut berubah sesuai sumbernya.

⚠️ Catatan jujur: karena ini siaran publik/gratis, kestabilannya tergantung
pemilik stream masing-masing. Sebagian channel mungkin sesekali offline —
itu normal untuk semua aplikasi IPTV gratis (termasuk yang berbayar di
Play Store sekalipun, kalau sumbernya sama).

## Cara menjalankan / coba dulu

### A. Cara tercepat — buka langsung
1. Extract file `.tar.gz` ini.
2. Karena browser modern membatasi `fetch()` dari file lokal (`file://`),
   kamu perlu menjalankan lewat server lokal kecil. Paling mudah:
   - Install ekstensi **"Web Server for Chrome"**, atau
   - Jalankan salah satu command ini di folder `StreamVista/`:
     ```bash
     python3 -m http.server 8080
     # lalu buka http://localhost:8080 di browser
     ```
3. Buka alamatnya di browser HP/laptop kamu.

### B. Cara paling praktis untuk dipakai sehari-hari — hosting gratis
Upload folder ini ke layanan hosting statis gratis, lalu buka linknya di HP:
- **Netlify Drop** → buka https://app.netlify.com/drop di laptop, drag & drop
  folder `StreamVista`, langsung dapat link.
- **GitHub Pages** → push folder ini ke repo GitHub, aktifkan Pages di Settings.
- **Vercel** → `vercel deploy` dari folder ini (perlu Node.js & akun Vercel).

Setelah online, buka link-nya di Chrome Android.

## Cara "install" jadi seperti aplikasi di HP Android (PWA)
1. Buka link StreamVista di **Chrome** Android.
2. Ketuk menu (⋮) di pojok kanan atas.
3. Pilih **"Tambahkan ke Layar Utama"** / **"Install app"**.
4. Ikon StreamVista akan muncul di home screen, terbuka full-screen tanpa
   address bar — terasa seperti aplikasi native.

## Mau jadi file .apk asli?
Karena ini aplikasi berbasis web, file yang dihasilkan di sini adalah PWA,
bukan `.apk`. Tapi PWA ini bisa **dibungkus** menjadi `.apk` asli pakai
salah satu cara gratis di bawah, tanpa menulis ulang kode:

1. **Google Bubblewrap** (resmi dari tim Chrome, gratis & open-source)
   ```bash
   npm install -g @bubblewrap/cli
   bubblewrap init --manifest=https://link-StreamVista-kamu.com/manifest.json
   bubblewrap build
   ```
   Hasilnya file `.apk` / `.aab` siap install atau upload ke Play Store.

2. **PWABuilder** (https://www.pwabuilder.com) — tinggal masukkan URL
   StreamVista yang sudah online, lalu klik "Package for Android". Tidak perlu
   install apapun, semua dilakukan di browser.

Catatan: kedua cara di atas butuh aplikasi sudah online (punya URL publik),
bukan dari file lokal di komputer — jadi lakukan langkah "hosting gratis" di
atas dulu sebelum membungkus jadi `.apk`.

## Fitur yang sudah ada
- ✅ Streaming langsung (HLS via hls.js) di dalam app, tidak pindah ke app lain
- ✅ Daftar channel per negara & kategori (otomatis dari iptv-org)
- ✅ Pencarian channel by nama / negara
- ✅ Favorit / bookmark (tersimpan di HP, tidak hilang walau app ditutup)
- ✅ Dark mode ala Netflix, responsive (HP & desktop)
- ✅ Bisa diinstall ke home screen Android (PWA)

## Ide pengembangan lanjutan (kalau mau lebih jauh)
- Tambah EPG (jadwal program) — iptv-org juga punya data `guides.json`
- Tambah riwayat tontonan terakhir
- Tambah opsi kualitas video manual
- Backend sendiri untuk channel custom/legal milik kamu sendiri

Selamat nonton! 📺