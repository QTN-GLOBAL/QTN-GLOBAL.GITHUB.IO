/* =========================
   APP ROUTER
   - HOME
   - SEARCH
   - CATEGORY
   - BRAND
   - BUSINESS
========================= */

document.addEventListener("DOMContentLoaded", function () {
console.log("APP ROUTER RUN");

console.log("search:",
    sessionStorage.getItem("searchKeyword"));

console.log("category:",
    sessionStorage.getItem("filterCategory"));

console.log("brand:",
    sessionStorage.getItem("filterBrand"));

console.log("business:",
    sessionStorage.getItem("filterBusiness"));

    const search =
        sessionStorage.getItem("searchKeyword");

    const category =
        sessionStorage.getItem("filterCategory");

    const brand =
        sessionStorage.getItem("filterBrand");

    const business =
        sessionStorage.getItem("filterBusiness");

   /***************************
   SEARCH
***************************/
/* SEARCH */

if (search) {

    const k = search.trim().toLowerCase();

    const products = runSearch(getProducts(), k);

    // 👉 phân loại:
    const isBrand = products.some(p =>
        p.brand &&
        normalizeText(p.brand) === normalizeText(k)
    );

    const isCategory = categoryMap?.[k];

    if (isBrand) {

        window.APP_MODE.mode = "brand-slider";

        renderSingleSlider(products, search);

        sessionStorage.removeItem("searchKeyword");

        return;
    }

    if (isCategory) {

        const categoryProducts =
            getProducts().filter(p =>
                p.category === categoryMap[k]
            );

        window.APP_MODE.mode = "category-slider";

        renderSingleSlider(categoryProducts, search);

        sessionStorage.removeItem("searchKeyword");

        return;
    }

    // default product search
    window.APP_MODE.mode = "search-grid";

    renderGridWithBrand(products, search);

    sessionStorage.removeItem("searchKeyword");

    return;
}
    /* =========================
       CATEGORY
    ========================= */

   /***************************
   CATEGORY
***************************/
if (category) {

    const products = getProducts().filter(
        p => p.category === category
    );

    if (!products.length) {

        alert("Sản phẩm đang cập nhật.");
        goHomePage();
        return;
    }

    window.APP_MODE.mode = "category-slider";

    renderSingleSlider(products, category);

    sessionStorage.removeItem("filterCategory");

    return;
}

    /* =========================
       BRAND
    ========================= */

    if (brand) {

    const products = getProducts().filter(
        p => (p.brand || "").toUpperCase() === brand.toUpperCase()
    );

    window.APP_MODE.mode = "brand-slider";

    renderSingleSlider(products, brand);

    sessionStorage.removeItem("filterBrand");

    return;
}

    /* =========================
       BUSINESS
    ========================= */

    if (business) {

        window.APP_MODE.mode = "business";

        const products =
            getProducts().filter(
                p => p.business === business
            );

        if (!products.length) {

            renderGridWithBrand(
                [],
                business
            );

            sessionStorage.removeItem(
                "filterBusiness"
            );

            return;
        }

        renderHomeByBrand(products);

        initBrandSliders();

        sessionStorage.removeItem(
            "filterBusiness"
        );

        return;
    }

    /* =========================
       HOME
    ========================= */

    window.APP_MODE.mode = "home";

    renderHomeByBrand();

    initHeroSlider();

    initBrandSliders();
});