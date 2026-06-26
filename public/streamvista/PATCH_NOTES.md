# StreamVista — Patch Notes

## File yang diubah
| File | Jumlah fix |
|------|-----------|
| `js/ui/render.js` | 3 |
| `js/player/player.js` | 5 |
| `js/app.js` | 1 |
| `index.html` | 1 |

---

## Detail Perubahan

### js/ui/render.js

**[FIX 1] Memory leak — logoObserver tidak pernah di-reset**
- Tambah fungsi `resetLogoObserver()` yang memanggil `.disconnect()` dan set ke `null`
- Dipanggil di awal `render()` sebelum `grid.innerHTML = ""`
- Sebelumnya: setiap render ulang (ganti filter, search) menyebabkan placeholder lama
  yang sudah dihapus dari DOM tetap di-observe → leak terakumulasi

**[FIX 2] Dead code — `renderNextChunk` dan `ensureSentinel` top-level dihapus**
- Kedua fungsi ini sudah tidak dipakai (digantikan closure `chunk()` di dalam `render()`)
- Bahayanya: `ensureSentinel` memanggil `renderNextChunk(grid)` *tanpa* `onOpen`/`onFavToggle`
  → kalau terpanggil, semua card hasil infinite scroll tidak bisa diklik dan bintang
  favorit tidak berfungsi
- Komentar usang yang menyebut `renderNextChunk` juga dibersihkan

---

### js/player/player.js

**[FIX 3] XSS di sidebar channel list**
- `initials(c.name)` sekarang di-escape dengan `escapeHtml()` sebelum masuk `innerHTML`
- Logo src di-escape dengan `escapeAttr()` (mencegah attribute injection)
- Import `escapeAttr` ditambahkan ke baris import escape.js

**[FIX 4] BASE_URL hardcoded**
- `"https://streamvista.netlify.app"` → `window.location.origin`
- Share link sekarang otomatis menggunakan domain apapun tempat app di-deploy

**[FIX 5] Race condition playing event listener**
- Tambah variabel modul `_playingListener` untuk menyimpan referensi listener aktif
- Di awal setiap `loadStream()`, listener lama di-remove dulu sebelum yang baru dipasang
- Sebelumnya: navigasi channel cepat (↑↓) bisa menyebabkan listener dari
  channel sebelumnya mematikan status loading channel baru

**[FIX 6] Dynamic import tidak perlu untuk `toggleFavorite`**
- `import("../core/state.js").then(...)` → import statis di baris atas file
- `toggleFavorite` ditambahkan ke destructure import `state.js`
- Menghilangkan async micro-task yang tidak perlu saat user klik tombol favorit

---

### js/app.js

**[FIX 7] Deep link regex title case salah**
- `/\w/g` → `/\b\w/g`
- Sebelumnya: `/\w/g` mencocokkan setiap karakter → `"metro-tv"` menjadi `"METRO TV"`
  (semua huruf uppercase, bukan hanya huruf pertama setiap kata)
- Sesudahnya: `"metro-tv"` → `"Metro Tv"` (title case yang benar)

---

### index.html

**[FIX 8] Alt text splash screen salah**
- `alt="PrestigeSync"` → `alt="StreamVista"`
- Accessibility & SEO kecil tapi terlihat tidak profesional

---

## File yang TIDAK berubah
File berikut tidak disentuh karena tidak ada bug kritis:
`iptv.js`, `epg.js`, `state.js`, `storage.js`, `cache.js`, `parser.js`,
`manager.js`, `filter.js`, `modal.js`, `quality.js`, `time.js`, `escape.js`

## Cara apply patch
Salin file dari folder ini ke project sesuai path-nya:
```
streamvista-patch/
├── index.html              → ganti index.html di root
├── js/
│   ├── app.js              → ganti js/app.js
│   ├── ui/render.js        → ganti js/ui/render.js
│   └── player/player.js   → ganti js/player/player.js
└── PATCH_NOTES.md          → ini
```
