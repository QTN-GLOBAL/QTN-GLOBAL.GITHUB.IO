/* =========================
   QTN GLOBAL SPA ROUTER
   - SEO
   - CATEGORY ROUTE
   - HOME / SEARCH / BRAND / BUSINESS
   - SUPPORT GITHUB PAGES
========================= */

document.addEventListener("DOMContentLoaded", function () {

    router();

    window.addEventListener("popstate", router);
});

/* =========================
   SEO MAP
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
        title: "Đầu cân điện tử | QTN GLOBAL",
        desc: "Đầu cân điện tử chất lượng cao"
    },

    "can-phan-tich": {
        title: "Cân phân tích | QTN GLOBAL",
        desc: "Cân phân tích chính xác cao"
    },

    "can-chong-nuoc": {
        title: "Cân chống nước | QTN GLOBAL",
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

/* =========================
   GET ROUTE (FIX GITHUB PAGES)
========================= */

function getRoute() {

    return location.pathname
        .split("/")
        .filter(Boolean)
        .slice(-1)[0] || "";
}

/* =========================
   ROUTER CORE
========================= */

function router() {

    const route = getRoute();

    setSEO(route);
    renderPage(route);
}

/* =========================
   NAVIGATION
========================= */

function goTo(route) {

    history.pushState({}, "", "/" + route);

    router();
}

/* =========================
   SEO HANDLER
========================= */

function setSEO(key) {

    const seo = SEO_MAP[key] || SEO_MAP[""];

    document.title = seo.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", seo.desc);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", seo.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", seo.desc);
}

/* =========================
   RENDER PAGE
========================= */

function renderPage(route) {

    // reset UI
    hideAllSections();

    switch (route) {

        case "":
            showHome();
            break;

        case "can-ban":
            showCategory("can-ban");
            break;

        case "can-ban-dung":
            showCategory("can-ban-dung");
            break;

        case "can-dem":
            showCategory("can-dem");
            break;

        case "can-treo":
            showCategory("can-treo");
            break;

        case "dau-can-dien-tu":
            showCategory("dau-can-dien-tu");
            break;

        case "can-phan-tich":
            showCategory("can-phan-tich");
            break;

        case "can-chong-nuoc":
            showCategory("can-chong-nuoc");
            break;

        case "can-in-tem-ma-vach":
            showCategory("can-in-tem-ma-vach");
            break;

        case "can-ghe-ngoi":
            showCategory("can-ghe-ngoi");
            break;

        default:
            showHome();
            break;
    }
}

/* =========================
   UI HELPERS
========================= */

function hideAllSections() {

    const sections = document.querySelectorAll("[data-page]");
    sections.forEach(el => el.style.display = "none");
}

function showHome() {

    const home = document.querySelector('[data-page="home"]');
    if (home) home.style.display = "block";

    initHomeSlider();
}

function showCategory(key) {

    const cat = document.querySelector('[data-page="category"]');
    if (cat) cat.style.display = "block";

    initCategorySlider(key);
}

/* =========================
   SLIDER LOGIC
   (bạn thay bằng code hiện tại của bạn)
========================= */

function initHomeSlider() {

    console.log("Init HOME slider");

    // tránh init lại nhiều lần
    if (window.homeSliderInitDone) return;
    window.homeSliderInitDone = true;

    // TODO: gắn code slider home của bạn vào đây
}

function initCategorySlider(category) {

    console.log("Init CATEGORY slider:", category);

    // reset mỗi lần vào category
    window.homeSliderInitDone = false;

    // TODO: render slider theo category
}

/* =========================
   CLICK MENU GLOBAL (OPTIONAL)
========================= */

// dùng trong HTML: onclick="goTo('can-ban')"
window.goTo = goTo;