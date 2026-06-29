function getCurrentLang() {
    return localStorage.getItem("lang") || "vi";
}

function setCurrentLang(lang) {
    localStorage.setItem("lang", lang);
}

// render markdown about content
function renderAboutContent(lang) {
    const container = document.getElementById("aboutContent");
    if (!container) return;

    if (typeof aboutTranslations === "undefined") {
        console.error("aboutTranslations is not defined");
        return;
    }

    const t = aboutTranslations[lang];
    if (!t || !t.aboutContent) {
        console.error("Missing aboutContent for lang:", lang);
        return;
    }

    if (typeof marked === "undefined") {
        console.error("marked.js is not loaded");
        return;
    }

    container.innerHTML = marked.parse(t.aboutContent);
}

function applyTranslations(lang) {
    const t = aboutTranslations[lang];
    if (!t) return;

    // update tất cả element có data-i18n (menu, footer,...)
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (t[key] !== undefined) {
            el.textContent = t[key];
        }
    });

    // update title browser
    if (t.aboutHero) {
        document.title = t.aboutHero + " - QTN GLOBAL";
    }

    // render ABOUT CONTENT (MARKDOWN)
    renderAboutContent(lang);
}

function initLanguageSelect() {
    const select = document.getElementById("languageSelect");
    if (!select) return;

    select.value = getCurrentLang();

    select.addEventListener("change", (e) => {
        const lang = e.target.value;
        setCurrentLang(lang);
        applyTranslations(lang);
    });
}

function initAboutPage() {
    const lang = getCurrentLang();

    applyTranslations(lang);
    initLanguageSelect();
}

// run
document.addEventListener("DOMContentLoaded", initAboutPage);