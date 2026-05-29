document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // INIT: RENDER PRODUCTS
    // =========================
    renderProducts(getProducts());

    // 🔒 CART COUNT SAFE INIT
    setTimeout(() => {
        updateCartCount();
    }, 0);

    // =========================
    // OPTIONAL INIT MODULES
    // =========================
    if (typeof initExcellSlider === "function") {
        initExcellSlider();
    }

    // =========================
    // OPEN CART FROM SESSION
    // =========================
    const openCartFlag = sessionStorage.getItem("openCart");

    if (openCartFlag === "1") {

        sessionStorage.removeItem("openCart");

        if (typeof openCart === "function") {
            openCart();
        }
    }

    // =========================
    // FILTER CATEGORY
    // =========================
    const category = sessionStorage.getItem("filterCategory");

    if (category) {

        sessionStorage.removeItem("filterCategory");

        renderProducts(
            getProducts().filter(p => p.category === category)
        );
    }

    // =========================
    // FILTER BRAND
    // =========================
    const brand = sessionStorage.getItem("filterBrand");

    if (brand) {

        sessionStorage.removeItem("filterBrand");

        renderProducts(
            getProducts().filter(p => p.brand === brand)
        );
    }

});