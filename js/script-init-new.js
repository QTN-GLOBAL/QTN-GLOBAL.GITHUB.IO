
window.currentProducts = [];
let allProductsCache = [];

/* =========================
   TEXT NORMALIZE
========================= */
function normalizeText(str) {

    return (str || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .trim();
}

/* =========================
   BOOT
========================= */
function boot() {

    const products = getProducts();

    if (!products || !products.length) {
        setTimeout(boot, 100);
        return;
    }

    /* =========================
       LANGUAGE
    ========================= */
    setLanguage(
        localStorage.getItem("language") || "vi"
    );

    /* =========================
       ORIGINAL DATA
    ========================= */
    let result = [...products];

    /* =========================
       CATEGORY FILTER
    ========================= */
    const category =
        sessionStorage.getItem("filterCategory");

    if (category) {

        sessionStorage.removeItem(
            "filterCategory"
        );

        result = result.filter(
            p => p.category === category
        );
    }

    /* =========================
       BRAND FILTER
    ========================= */
    const brand =
        sessionStorage.getItem("filterBrand");

    if (brand) {

        sessionStorage.removeItem(
            "filterBrand"
        );

        result = result.filter(
            p => p.brand === brand
        );
    }

    /* =========================
       SEARCH
    ========================= */
    const keyword = sessionStorage.getItem("searchKeyword");

if (keyword) {

    sessionStorage.removeItem("searchKeyword");

    result = SearchCore.filter(result, keyword);
}
    /* =========================
       CACHE
    ========================= */
    allProductsCache = [...result];

    window.currentProducts =
        [...result];

    /* =========================
       RENDER
    ========================= */
    renderProducts(result);

    /* =========================
       CART
    ========================= */
    if (
        typeof updateCartCount ===
        "function"
    ) {
        updateCartCount();
    }

    /* =========================
       SLIDER
    ========================= */
    if (
        typeof initExcellSlider ===
        "function"
    ) {
        initExcellSlider();
    }

    /* =========================
       OPEN CART
    ========================= */
    const openCartFlag =
        sessionStorage.getItem(
            "openCart"
        );

    if (openCartFlag === "1") {

        sessionStorage.removeItem(
            "openCart"
        );

        if (
            typeof openCart ===
            "function"
        ) {
            openCart();
        }
    }
}

/* =========================
   START
========================= */
document.addEventListener(
    "DOMContentLoaded",
    boot
);

