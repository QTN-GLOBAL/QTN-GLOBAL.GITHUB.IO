function getCurrentLang() {
    return localStorage.getItem("lang") || "vi";
}

function setCurrentLang(lang) {
    localStorage.setItem("lang", lang);
}

function applyTranslations(lang) {
    const t = aboutTranslations[lang];
    if (!t) return;

    // update tất cả element có data-i18n
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (t[key] !== undefined) {
            el.textContent = t[key];
        }
    });

    // update title browser
    document.title = t.aboutHero + " - QTN GLOBAL";
}

function initLanguageSelect() {
    const select = document.getElementById("languageSelect");
    if (!select) return;

    // set default value
    select.value = getCurrentLang();

    // khi đổi ngôn ngữ
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