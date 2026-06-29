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

    const keyword =
        search.trim().toLowerCase();
const categoryMap = {

    // CÂN

    "cân bàn": "can-ban",
    "can ban": "can-ban",

    "cân đếm": "can-dem",
    "can dem": "can-dem",

    "cân treo": "can-treo",
    "can treo": "can-treo",

    "đầu cân": "dau-can-dien-tu",
    "dau can": "dau-can-dien-tu",

    "cân phân tích": "can-phan-tich",
    "can phan tich": "can-phan-tich",

    "cân chống nước": "can-chong-nuoc",
    "can chong nuoc": "can-chong-nuoc",

    "cân in tem": "can-in-tem-ma-vach",
    "can in tem": "can-in-tem-ma-vach",

    "cân ghế": "can-ghe-ngoi",
    "can ghe": "can-ghe-ngoi",

    // GIA DỤNG

    "máy lọc nước": "water-purifier",
    "may loc nuoc": "water-purifier",

    "lõi lọc": "water-filter",
    "loi loc": "water-filter",

    "máy lọc không khí": "air-purifier",
    "may loc khong khi": "air-purifier",

    "phụ kiện máy lọc không khí": "air-filter",
    "phu kien may loc khong khi": "air-filter"
};

const categoryCode =
    categoryMap[keyword] || keyword;

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

   /***************************
   CATEGORY
***************************/
if (category) {

    const products = getProducts().filter(
        p =>
            p.category &&
            p.category === category
    );

    if (!products.length) {

        sessionStorage.removeItem(
            "filterCategory"
        );

        alert(
            "Sản phẩm đang cập nhật.\nVui lòng quay lại sau."
        );

        goHomePage();

        return;
    }

    window.APP_MODE.mode =
        "category";

    renderSingleSlider(
        products,
        category
    );

    initBrandSliders();

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