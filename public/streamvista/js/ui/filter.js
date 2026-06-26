// js/ui/filter.js
import { state } from "../core/state.js";

/**
 * Buat satu chip button dan tambahkan ke container.
 */
function addChip(container, value, label, active, handler) {
    const btn = document.createElement("button");
    btn.className = "chip" + (active ? " active" : "");
    btn.dataset.value = value;
    btn.textContent = label;
    btn.addEventListener("click", () => handler(value, btn, container));
    container.appendChild(btn);
}

function setActiveChip(btn, container) {
    [...container.children].forEach((c) =>
        c.classList.toggle("active", c === btn),
    );
}

/**
 * Build filter strip kategori + negara dari state.channels.
 * @param {object} els - { catStrip, countryStrip }
 * @param {function} onRender - dipanggil setelah filter berubah
 */
export function buildFilterStrips(els, onRender) {
    const { catStrip, countryStrip } = els;

    // ── Kategori ──
    const catCount = {};
    state.channels.forEach((c) =>
        (c.categories || []).forEach(
            (id) => (catCount[id] = (catCount[id] || 0) + 1),
        ),
    );
    const topCats = Object.entries(catCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 14)
        .map((e) => e[0]);

    catStrip.innerHTML = "";
    addChip(catStrip, "all", "Semua", true, (value, btn, container) => {
        state.activeCategory = value;
        setActiveChip(btn, container);
        onRender();
    });
    topCats.forEach((id) =>
        addChip(
            catStrip,
            id,
            state.categories[id] || id,
            false,
            (value, btn, container) => {
                state.activeCategory = value;
                setActiveChip(btn, container);
                onRender();
            },
        ),
    );

    // ── Negara ──
    const countryCount = {};
    state.channels.forEach((c) => {
        if (c.country)
            countryCount[c.country] = (countryCount[c.country] || 0) + 1;
    });
    const topCountries = Object.entries(countryCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
        .map((e) => e[0]);

    countryStrip.innerHTML = "";
    addChip(countryStrip, "all", "Semua", true, (value, btn, container) => {
        state.activeCountry = value;
        setActiveChip(btn, container);
        onRender();
    });
    topCountries.forEach((code) =>
        addChip(
            countryStrip,
            code,
            state.countries[code] || code,
            false,
            (value, btn, container) => {
                state.activeCountry = value;
                setActiveChip(btn, container);
                onRender();
            },
        ),
    );
}

/**
 * Build group strip dari channel custom (playlist M3U).
 * @param {object} els - { groupStrip }
 * @param {function} onRender
 */
export function buildGroupStrip(els, onRender) {
    const { groupStrip } = els;
    if (!groupStrip) return;

    const groups = new Set();
    state.channels.forEach((c) => {
        if (c.source === "custom" && c.group) groups.add(c.group);
    });

    groupStrip.innerHTML = "";
    if (groups.size === 0) {
        groupStrip.style.display = "none";
        return;
    }

    groupStrip.style.display = "";
    addChip(
        groupStrip,
        "all",
        "Semua",
        state.activeGroup === "all",
        (value, btn, container) => {
            state.activeGroup = value;
            setActiveChip(btn, container);
            onRender();
        },
    );
    [...groups].sort().forEach((g) =>
        addChip(
            groupStrip,
            g,
            g,
            state.activeGroup === g,
            (value, btn, container) => {
                state.activeGroup = value;
                setActiveChip(btn, container);
                onRender();
            },
        ),
    );
}
