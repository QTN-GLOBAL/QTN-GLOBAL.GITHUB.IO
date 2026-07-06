/* =========================
   APP ROUTER (SPA NO RELOAD)
   - HOME
   - SEARCH
   - CATEGORY
   - BRAND
   - BUSINESS
========================= */


/* =========================
   GLOBAL ROUTER CORE
========================= */

window.APP_ROUTER = window.APP_ROUTER || {};


/* =========================
   SEO CONFIG
========================= */

const SEO_MAP = {
    "": {
        title: "QTN GLOBAL | Cân điện tử",
        desc: "Thiết bị đo lường công nghiệp chính xác"
    },

    "can-ban": {
        title: "Cân bàn điện tử | QTN GLOBAL",
        desc: "Cân bàn điện tử chính xác cao"
    },

    "can-ban-dung": {
        title: "Cân bàn đứng | QTN GLOBAL",
        desc: "Cân bàn đứng tải trọng lớn"
    },

    "can-dem": {
        title: "Cân đếm điện tử | QTN GLOBAL",
        desc: "Cân đếm linh kiện chính xác"
    },

    "can-treo": {
        title: "Cân treo điện tử | QTN GLOBAL",
        desc: "Cân treo công nghiệp tải nặng"
    
    },
    "dau-can-dien-tu": {
        title: "Đầu cân điện từ | QTN GLOBAL",
        desc: "Đầu cân điện tử chất lượng cao"
 },
 "can-phan-tich": {
        title: "Cân phân tích | QTN GLOBAL",
        desc: "Cân phân tích chính xác cao"
 },
 "can-chong-nuoc": {
        title: "Cân chống nước| QTN GLOBAL",
        desc: "Cân chống nước chất lượng cao"
 },
 "can-in-tem-ma-vach": {
        title: "Cân in tem mã vạch | QTN GLOBAL",
        desc: "Cân siêu thị chất lượng cao"
 },
 "can-ghe-ngoi": {
        title: "Cân ghế ngồi | QTN GLOBAL",
        desc: "Cân ghế ngồi chắc chắn"
 }
};

function setSEO(key) {

    const seo = SEO_MAP[key] || SEO_MAP[""];

    document.title = seo.title;

    const meta = document.querySelector('meta[name="description"]');

    if (meta) {
        meta.setAttribute("content", seo.desc);
    }
}


/* =========================
   ROUTER INIT (SPA CORE)
========================= */

function initRouter() {
    const state = getSessionState();
    logSession(state);
    routeController(state);
}

document.addEventListener("DOMContentLoaded", initRouter);

/* back/forward browser */
window.addEventListener("popstate", function () {
    initRouter();
});


/* =========================
   SESSION STATE
========================= */

function getSessionState() {
    return {
        search: sessionStorage.getItem("searchKeyword"),
        category: sessionStorage.getItem("filterCategory"),
        brand: sessionStorage.getItem("filterBrand"),
        business: sessionStorage.getItem("filterBusiness")
    };
}

function logSession(state) {
    console.log("search:", state.search);
    console.log("category:", state.category);
    console.log("brand:", state.brand);
    console.log("business:", state.business);
}


/* =========================
   ROUTER CONTROLLER
========================= */

function routeController(state) {

    /* =========================
       SEARCH ROUTE
    ========================= */

    if (state.search) {

        const { type, data } =
            SearchSystem.detectType(getProducts(), state.search);

        console.log("SEARCH TYPE:", type, data.length);

        if (type === "category") {

            window.APP_MODE.mode = "category-slider";

            renderSingleSlider(data, state.search);

            sessionStorage.removeItem("searchKeyword");
            return;
        }

        if (type === "brand") {

            window.APP_MODE.mode = "brand-slider";

            renderSingleSlider(data, state.search);

            sessionStorage.removeItem("searchKeyword");
            return;
        }

        window.APP_MODE.mode = "search-grid";

        renderGridWithBrand(data, state.search);

        sessionStorage.removeItem("searchKeyword");
        return;
    }


    /* =========================
       CATEGORY ROUTE
    ========================= */

    if (state.category) {

        const products = getProducts().filter(
            p => p.category === state.category
        );

        if (!products.length) {

            alert("Sản phẩm đang cập nhật.");
            goHomePage();
            return;
        }

        window.APP_MODE.mode = "category-slider";

        setSEO(state.category);

        renderSingleSlider(products, state.category);

        sessionStorage.removeItem("filterCategory");
        return;
    }


    /* =========================
       BRAND ROUTE
    ========================= */

    if (state.brand) {

        const products = getProducts().filter(
            p => (p.brand || "").toUpperCase() === state.brand.toUpperCase()
        );

        window.APP_MODE.mode = "brand-slider";

        renderSingleSlider(products, state.brand);

        sessionStorage.removeItem("filterBrand");
        return;
    }


    /* =========================
       BUSINESS ROUTE
    ========================= */

    if (state.business) {

        const products = getProducts();

        const ALLOWED = ["measure", "home"];

        const filtered = products.filter(
            p => p.business === state.business
        );

        sessionStorage.removeItem("filterBusiness");

        if (ALLOWED.includes(state.business)) {

            if (!filtered.length) {

                alert(
                    t("businessUpdateTitle") +
                    "\n" +
                    t("businessUpdateDesc")
                );

                goHomePage();
                return;
            }

            window.APP_MODE.mode = "business-slider";

            renderHomeByBrand(filtered);

            initBrandSliders();

            return;
        }

        const container = document.getElementById("homeContainer");

        if (container) {
            container.innerHTML = `
                <div style="text-align:center;padding:60px 20px;">
                    <h2>${t("businessUpdateTitle")}</h2>
                    <p>${t("businessUpdateDesc")}</p>
                    <button onclick="goHomePage()">OK</button>
                </div>
            `;
        }

        return;
    }


    /* =========================
       HOME ROUTE
    ========================= */

    setSEO("");

    window.APP_MODE.mode = "home";

    renderHomeByBrand();

    initHeroSlider();

    initBrandSliders();
}


/* =========================
   NAVIGATION (SPA CORE)
========================= */

function goToCategoryURL(category) {

    const urlMap = {
        "can-ban": "/can-ban",
        "can-ban-dung": "/can-ban-dung",
        "can-dem": "/can-dem",
        "can-treo": "/can-treo"
    };

    const path = urlMap[category] || "/";

    sessionStorage.setItem("filterCategory", category);

    history.pushState({}, "", path);

    routeController(getSessionState());
}


/* =========================
   GLOBAL ROUTER API
========================= */

window.APP_ROUTER.goCategory = goToCategoryURL;

window.APP_ROUTER.goHome = function () {
    sessionStorage.clear();
    history.pushState({}, "", "/");
    routeController(getSessionState());
};

window.APP_ROUTER.goBrand = function (brand) {
    sessionStorage.setItem("filterBrand", brand);
    history.pushState({}, "", "/brand/" + brand);
    routeController(getSessionState());
};