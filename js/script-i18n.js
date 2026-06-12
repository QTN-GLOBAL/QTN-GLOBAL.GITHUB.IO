/* =========================
   I18N CORE SYSTEM
   (SAFE - NO BREAK CART / PRODUCTS)
========================= */

/* =========================
   LANGUAGE CORE
========================= */

function getLang() {
    return localStorage.getItem("lang") || "vi";
}

function setLang(lang) {
    localStorage.setItem("lang", lang);
    window.currentLang = lang;

    document.dispatchEvent(new Event("langChanged"));
}

/* =========================
   TRANSLATION (UI TEXT)
========================= */

function t(key) {

    const lang = getLang();

    return window.translations?.[lang]?.[key] || key;
}

/* =========================
   PRODUCT TRANSLATION
   (SAFE - DO NOT CLONE OBJECT)
========================= */

function tProduct(product, field) {

    const lang = getLang();

    const trans = window.productI18n?.[lang]?.[product.id];

    return trans?.[field] || product[field];
}

/* =========================
   GET PRODUCT BY ID
========================= */

function getProductById(id) {

    return (window.products || []).find(p => p.id === Number(id));
}

/* =========================
   RERENDER SYSTEM
========================= */

document.addEventListener("langChanged", () => {

    // Index page render
    if (typeof renderProducts === "function") {
        renderProducts();
    }

    // Cart render
    if (typeof renderCart === "function") {
        renderCart();
    }

    // Detail render
    if (typeof renderDetail === "function") {
        renderDetail();
    }

    // Optional: update cart count UI text
    if (typeof updateCartCount === "function") {
        updateCartCount();
    }
});

/* =========================
   INIT LANGUAGE ON LOAD
========================= */

window.currentLang = getLang();