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

    const { type, data } =
        SearchSystem.detectType(getProducts(), search);

    console.log("SEARCH TYPE:", type, data.length);

    if (type === "category") {

        window.APP_MODE.mode = "category-slider";

        renderSingleSlider(data, search);

        sessionStorage.removeItem("searchKeyword");
        return;
    }

    if (type === "brand") {

        window.APP_MODE.mode = "brand-slider";

        renderSingleSlider(data, search);

        sessionStorage.removeItem("searchKeyword");
        return;
    }

    // PRODUCT GRID
    window.APP_MODE.mode = "search-grid";

    renderGridWithBrand(data, search);

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
   BUSINESS ROUTE (FINAL CLEAN)
========================= */

if (business) {

    const products = getProducts();

    sessionStorage.removeItem("filterBusiness");

    // các lĩnh vực đã có sản phẩm
    const ALLOWED = ["measure", "home"];

    const filtered = products.filter(
        p => p.business === business
    );

    // =========================
    // CASE 1: CÓ SẢN PHẨM
    // =========================
    if (ALLOWED.includes(business)) {

        if (!filtered.length) {

            alert(
                t("businessUpdateTitle") +
                "\n" +
                t("businessUpdateDesc")
            );

            goHomePage();
            return;
        }

        window.APP_MODE.mode =
            "business-slider";

        renderHomeByBrand(filtered);

        initBrandSliders();

        return;
    }

    // =========================
    // CASE 2: CHƯA CÓ SẢN PHẨM
    // =========================
    const container =
        document.getElementById(
            "homeContainer"
        );

    if (container) {

        container.innerHTML = `
            <div style="
                text-align:center;
                padding:60px 20px;
            ">
                <h2>${t("businessUpdateTitle")}</h2>
                <p>${t("businessUpdateDesc")}</p>

                <button onclick="goHomePage()">
                    OK
                </button>
            </div>
        `;
    }

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