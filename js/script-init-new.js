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
window.runSearch = function (result, keyword) {

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

    const products = getProducts();

    if (!Array.isArray(products) || products.length === 0) {
        setTimeout(boot, 100);
        return;
    }

    setLanguage(localStorage.getItem("language") || "vi");

    // CHỈ CACHE DATA
    window.allProductsCache = products.slice();
    window.currentProducts = products.slice();

    // CHỈ CART (nếu cần)
    if (typeof updateCartCount === "function") {
        updateCartCount();
    }

    const openCartFlag = sessionStorage.getItem("openCart");

    if (openCartFlag === "1") {
        sessionStorage.removeItem("openCart");

        if (typeof openCart === "function") {
            openCart();
        }
    }
}

document.addEventListener("DOMContentLoaded", boot);