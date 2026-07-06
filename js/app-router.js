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
    }
};

/* =========================
   GET ROUTE
========================= */

function getRoute() {
    return location.pathname
        .split("/")
        .filter(Boolean)
        .pop() || "";
}

/* =========================
   ROUTER
========================= */

function router() {

    const route = getRoute();

    setSEO(route);
    setActiveMenu(route);
    renderCategory(route);
}

/* =========================
   NAVIGATION
========================= */

function goTo(route) {
    history.pushState({}, "", "/" + route);
    router();
}

window.goTo = goTo;

/* =========================
   SEO
========================= */

function setSEO(key) {

    const seo = SEO_MAP[key] || SEO_MAP[""];

    document.title = seo.title;

    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", seo.desc);
}

/* =========================
   ACTIVE MENU (QUAN TRỌNG)
========================= */

function setActiveMenu(route) {

    document.querySelectorAll("[data-category]").forEach(el => {
        el.classList.remove("active");
    });

    const active = document.querySelector(`[data-category="${route}"]`);
    if (active) active.classList.add("active");
}

/* =========================
   RENDER CATEGORY
========================= */

function renderCategory(route) {

    console.log("ROUTE:", route);

    // HOME
    if (!route) {
        showHome();
        return;
    }

    // CATEGORY
    showHome(); // giữ layout home (slider nền)

    if (typeof renderProductsByCategory === "function") {
        renderProductsByCategory(route);
    }

    if (typeof initCategorySlider === "function") {
        initCategorySlider(route);
    }
}

/* =========================
   HOME
========================= */

function showHome() {

    const homeSlider = document.querySelector("#home-slider");

    if (homeSlider) {
        homeSlider.style.display = "block";
    }

    if (typeof initHomeSlider === "function") {
        initHomeSlider();
    }
}