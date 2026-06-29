/* =========================
   APP ROUTER
   - HOME
   - SEARCH
   - CATEGORY
   - BRAND
   - BUSINESS
========================= */

document.addEventListener("DOMContentLoaded", function () {

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

    const keyword =
        search.trim().toLowerCase();

    /* BRAND */

    const brandProducts =
        getProducts().filter(
            p =>
                p.brand &&
                p.brand.toLowerCase() === keyword
        );

    if (brandProducts.length) {

        window.APP_MODE.mode = "search";

        renderHomeByBrand(
            brandProducts
        );

        initBrandSliders();

        sessionStorage.removeItem(
            "searchKeyword"
        );

        return;
    }

    /* CATEGORY */

    const categoryProducts =
        getProducts().filter(
            p =>
                p.category &&
                p.category.toLowerCase() === keyword
        );

    if (categoryProducts.length) {

        window.APP_MODE.mode = "search";

        renderHomeByBrand(
            categoryProducts
        );

        initBrandSliders();

        sessionStorage.removeItem(
            "searchKeyword"
        );

        return;
    }

    /* PRODUCT */

    const products =
        runSearch(
            getProducts(),
            search
        );

    renderGridWithBrand(
        products,
        search
    );

    sessionStorage.removeItem(
        "searchKeyword"
    );

    return;
}
    /* =========================
       CATEGORY
    ========================= */

    if (category) {

        window.APP_MODE.mode = "category";

        const products =
            getProducts().filter(
                p => p.category === category
            );

        renderGridWithBrand(
            products,
            category
        );

        sessionStorage.removeItem(
            "filterCategory"
        );

        return;
    }

    /* =========================
       BRAND
    ========================= */

    if (brand) {

        window.APP_MODE.mode = "brand";

        const products =
            getProducts().filter(
                p =>
                    p.brand &&
                    p.brand.toUpperCase() ===
                    brand.toUpperCase()
            );

        renderGridWithBrand(
            products,
            brand
        );

        sessionStorage.removeItem(
            "filterBrand"
        );

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