// js/playlist/parser.js

/**
 * Parse teks M3U menjadi array channel.
 * Pure function — tidak ada side effect, tidak ada dependency.
 * @param {string} text - isi file M3U
 * @returns {Array<{name, logo, group, url}>}
 */
export function parseM3U(text) {
    const lines = text.split(/\r?\n/);
    const items = [];
    let pending = null;

    for (const raw of lines) {
        const line = raw.trim();
        if (!line) continue;

        if (line.startsWith("#EXTINF")) {
            const nameMatch  = line.match(/,(.*)$/);
            const logoMatch  = line.match(/tvg-logo="([^"]*)"/i);
            const groupMatch = line.match(/group-title="([^"]*)"/i);
            pending = {
                name:  (nameMatch ? nameMatch[1] : "Untitled").trim(),
                logo:  logoMatch  ? logoMatch[1]  : "",
                group: groupMatch ? groupMatch[1] : "Custom",
            };
        } else if (pending && !line.startsWith("#")) {
            items.push({ ...pending, url: line });
            pending = null;
        }
    }
    return items;
}

/**
 * Tebak nama playlist dari URL-nya.
 * Contoh: "https://raw.githubusercontent.com/user/repo/main/list.m3u" → "raw.githubusercontent.com"
 */
export function guessPlaylistName(url) {
    try {
        return new URL(url).hostname.replace("www.", "");
    } catch {
        return "Playlist Custom";
    }
}
