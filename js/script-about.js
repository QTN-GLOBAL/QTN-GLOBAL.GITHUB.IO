/* =========================
   ABOUT PAGE
========================= */

// Render nội dung giới thiệu
function renderAboutContent() {

    const container = document.getElementById("aboutContent");
    if (!container) return;

    if (typeof aboutTranslations === "undefined") return;

    const lang =
        localStorage.getItem("language") || "vi";

    const data = aboutTranslations[lang]
        || aboutTranslations.vi;

    if (!data?.aboutContent) return;

    if (typeof marked === "undefined") return;

    container.innerHTML =
        marked.parse(data.aboutContent);
}

/* =========================
   INIT
========================= */

function initAboutPage() {

    renderAboutContent();

    // Hero
    if (typeof initHeroSlider === "function") {
        initHeroSlider();
    }

    // Brand Slider
    if (typeof initBrandSliders === "function") {
        initBrandSliders();
    }
}

document.addEventListener(
    "DOMContentLoaded",
    initAboutPage
);