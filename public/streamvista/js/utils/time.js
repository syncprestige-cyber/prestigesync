// js/utils/time.js

export function fmtTime(ts) {
    return new Date(ts).toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function parseXmltvTime(str) {
    if (!str) return null;
    const m = str.match(
        /^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})\s?([+-]\d{4})?$/,
    );
    if (!m) return null;
    const [, y, mo, d, h, mi, s, tz] = m;
    let iso = `${y}-${mo}-${d}T${h}:${mi}:${s}`;
    iso += tz ? `${tz.slice(0, 3)}:${tz.slice(3)}` : "Z";
    const t = new Date(iso).getTime();
    return isNaN(t) ? null : t;
}
