// js/player/quality.js

/**
 * Build quality selector menu dari HLS levels.
 * @param {object} els     - { qualityBtn, qualityMenu }
 * @param {object} hls     - instance Hls.js
 * @param {Array}  levels  - data.levels dari MANIFEST_PARSED
 */
export function buildQualityMenu(els, hls, levels) {
    const { qualityBtn, qualityMenu } = els;
    if (!qualityMenu || !qualityBtn) return;

    if (!levels || levels.length <= 1) {
        qualityBtn.style.display = "none";
        return;
    }
    qualityBtn.style.display = "";
    qualityMenu.innerHTML    = "";

    const setActive = (activeBtn) => {
        qualityMenu
            .querySelectorAll(".quality-option")
            .forEach((b) => b.classList.remove("active"));
        activeBtn.classList.add("active");
        qualityMenu.classList.add("hidden");
    };

    // Tombol Auto
    const autoBtn       = document.createElement("button");
    autoBtn.textContent = "🔄 Auto";
    autoBtn.className   = "quality-option active";
    autoBtn.addEventListener("click", () => {
        hls.currentLevel = -1;
        setActive(autoBtn);
    });
    qualityMenu.appendChild(autoBtn);

    // Tombol per resolusi
    [...levels]
        .sort((a, b) => b.height - a.height)
        .forEach((lvl) => {
            const label       = lvl.height ? `${lvl.height}p` : "SD";
            const btn         = document.createElement("button");
            btn.textContent   = label;
            btn.className     = "quality-option";
            btn.addEventListener("click", () => {
                hls.currentLevel = levels.indexOf(lvl);
                setActive(btn);
            });
            qualityMenu.appendChild(btn);
        });
}
