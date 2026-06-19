document.addEventListener("DOMContentLoaded", () => {

    function boot() {

        const products = getProducts();

        if (!products || !products.length) {
            console.warn("Products chưa load, retry...");

            setTimeout(boot, 100);
            return;
        }

        // =========================
        // RENDER DEFAULT
        // =========================
       renderProducts(products);
setLanguage(localStorage.getItem("language") || "vi");
        // =========================
        // CART INIT SAFE
        // =========================
        updateCartCount();

        // =========================
        // SLIDER
        // =========================
        if (typeof initExcellSlider === "function") {
            initExcellSlider();
        }

        // =========================
        // FILTER CATEGORY
        // =========================
        const category = sessionStorage.getItem("filterCategory");

        if (category) {
            sessionStorage.removeItem("filterCategory");
            renderProducts(products.filter(p => p.category === category));
        }

        // =========================
        // FILTER BRAND
        // =========================
        const brand = sessionStorage.getItem("filterBrand");

        if (brand) {
            sessionStorage.removeItem("filterBrand");
            renderProducts(products.filter(p => p.brand === brand));
        }

        // =========================
        // OPEN CART
        // =========================
        const openCartFlag = sessionStorage.getItem("openCart");

        if (openCartFlag === "1") {
            sessionStorage.removeItem("openCart");
            if (typeof openCart === "function") openCart();
        }
    }

    boot();

});