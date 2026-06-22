window.currentProducts = [];
window.allProductsCache = [];

/* =========================
   TEXT NORMALIZE
========================= */
function normalizeText(str) {
    return (str || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .trim()
        .replace(/\s+/g, " ");
}

/* =========================
   SAFE SEARCH
========================= */
function runSearch(result, keyword) {

    if (!keyword) return result;

    const k = normalizeText(keyword);

    if (window.SearchCore && typeof SearchCore.filter === "function") {
        return SearchCore.filter(result, keyword);
    }

    const categoryMap = {
        "can ban": "can-ban",
        "can dem": "can-dem",
        "can treo": "can-treo",
        "dau can": "dau-can-dien-tu",
        "can phan tich": "can-phan-tich",
        "can chong nuoc": "can-chong-nuoc",
        "can in tem": "can-in-tem-ma-vach",
        "can ghe": "can-ghe-ngoi"
    };

    if (categoryMap[k]) {
        return result.filter(p => p.category === categoryMap[k]);
    }

    return result.filter(p => {

        const text = normalizeText(
            [p.name, p.description, p.brand]
                .filter(Boolean)
                .join(" ")
        );

        return text.includes(k);
    });
}

/* =========================
   BOOT
========================= */
function boot() {

    const products = getProducts();

    if (!Array.isArray(products) || products.length === 0) {
        setTimeout(boot, 100);
        return;
    }

    setLanguage(localStorage.getItem("language") || "vi");

    let result = [...products];

    /* =========================
       CATEGORY
    ========================= */
    const category = sessionStorage.getItem("filterCategory");

    if (category) {
        sessionStorage.removeItem("filterCategory");
        result = result.filter(p => p && p.category === category);
    }

    /* =========================
       BRAND
    ========================= */
    const brand = sessionStorage.getItem("filterBrand");

    if (brand) {
        sessionStorage.removeItem("filterBrand");
        result = result.filter(p => p && p.brand === brand);
    }

    /* =========================
       SEARCH (FIX QUAN TRỌNG)
    ========================= */
    const keyword = sessionStorage.getItem("searchKeyword");

    if (keyword) {

        // ⚠️ QUAN TRỌNG: KHÔNG xóa trước khi filter
        result = runSearch(result, keyword);

        // chỉ xóa SAU khi đã dùng
        sessionStorage.removeItem("searchKeyword");
    }

    /* =========================
       FINAL SAFETY FILTER
    ========================= */
    result = result.filter(p =>
        p &&
        p.id &&
        p.name &&
        p.category &&
        p.folder
    );

    /* =========================
       CACHE
    ========================= */
    window.allProductsCache = [...result];
    window.currentProducts = [...result];

    /* =========================
       RENDER
    ========================= */
    renderProducts(result);

    /* =========================
       CART
    ========================= */
    if (typeof updateCartCount === "function") {
        updateCartCount();
    }

    /* =========================
       SLIDER
    ========================= */
    if (typeof initExcellSlider === "function") {
        initExcellSlider();
    }

    /* =========================
       OPEN CART
    ========================= */
    const openCartFlag = sessionStorage.getItem("openCart");

    if (openCartFlag === "1") {
        sessionStorage.removeItem("openCart");

        if (typeof openCart === "function") {
            openCart();
        }
    }
}

/* =========================
   START
========================= */
document.addEventListener("DOMContentLoaded", boot);