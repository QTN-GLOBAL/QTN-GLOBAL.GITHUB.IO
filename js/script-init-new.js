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
        .trim();
}

/* =========================
   SAFE SEARCH WRAPPER
========================= */
function runSearch(result, keyword) {

    if (!keyword) return result;

    const k = normalizeText(keyword);

    // nếu SearchCore tồn tại thì dùng
    if (window.SearchCore && typeof SearchCore.filter === "function") {
        return SearchCore.filter(result, keyword);
    }

    // fallback nếu chưa load SearchCore
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

    // guard cực quan trọng (fix mất ảnh)
    if (!Array.isArray(products) || products.length === 0) {
        setTimeout(boot, 100);
        return;
    }

    setLanguage(localStorage.getItem("language") || "vi");

    let result = [...products];

    /* =========================
       CATEGORY FILTER
    ========================= */
    const category = sessionStorage.getItem("filterCategory");

    if (category) {
        sessionStorage.removeItem("filterCategory");
        result = result.filter(p => p && p.category === category);
    }

    /* =========================
       BRAND FILTER
    ========================= */
    const brand = sessionStorage.getItem("filterBrand");

    if (brand) {
        sessionStorage.removeItem("filterBrand");
        result = result.filter(p => p && p.brand === brand);
    }

    /* =========================
       SEARCH
    ========================= */
    const keyword = sessionStorage.getItem("searchKeyword");

    if (keyword) {
        sessionStorage.removeItem("searchKeyword");
        result = runSearch(result, keyword);
    }

    /* =========================
       FINAL SAFETY FILTER
       (FIX MẤT ẢNH + MẤT NAME)
    ========================= */
    result = result.filter(p =>
        p &&
        p.id &&
        p.name &&
        p.category &&
        p.folder
    );

    /* =========================
       CACHE STATE
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