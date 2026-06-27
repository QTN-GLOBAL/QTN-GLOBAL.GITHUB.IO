window.currentProducts = [];
window.allProductsCache = [];

/* =========================
   TEXT NORMALIZE (SAFE)
========================= */
function normalizeText(str) {
    return (str || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/\s+/g, " ")
        .trim();
}

/* =========================
   SAFE SEARCH (NO CONFLICT)
========================= */
function runSearch(result, keyword) {

    if (!keyword) return result;

    const k = normalizeText(keyword);

    // ưu tiên SearchSystem mới (nếu có)
    if (window.SearchSystem && typeof SearchSystem.filter === "function") {
        return SearchSystem.filter(result, keyword);
    }

    // fallback category map
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

    const matchedCategory = Object.keys(categoryMap)
        .find(key => k.includes(normalizeText(key)));

    if (matchedCategory) {
        return result.filter(p => p.category === categoryMap[matchedCategory]);
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
   BOOT (SAFE + NO BREAK DOM)
========================= */
function boot() {
if (
    sessionStorage.getItem("searchKeyword") ||
    sessionStorage.getItem("filterCategory") ||
    sessionStorage.getItem("filterBrand")
) {
    return;
}

    const products = getProducts();

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
/***************************
   BUSINESS FILTER
***************************/
const business =
    sessionStorage.getItem(
        "filterBusiness"
    );

if (business) {

    sessionStorage.removeItem(
        "filterBusiness"
    );

    result = result.filter(
        p => p.business === business
    );
}

    /* =========================
       SEARCH (SAFE FLOW FIXED)
    ========================= */
    const keyword = sessionStorage.getItem("searchKeyword");

    if (keyword) {

        result = runSearch(result, keyword);

        // clear sau khi dùng
        sessionStorage.removeItem("searchKeyword");
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
    window.allProductsCache = result.slice();
    window.currentProducts = result.slice();

    /* =========================
       RENDER
    ========================= */
    if (typeof window.renderProducts === "function") {
    window.renderProducts(result);
}

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