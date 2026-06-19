function boot() {

    const products = getProducts();

    if (!products || !products.length) {
        console.warn("Products chưa load, retry...");
        setTimeout(boot, 100);
        return;
    }

    // =========================
    // LANGUAGE
    // =========================
    setLanguage(localStorage.getItem("language") || "vi");

    // =========================
    // PIPELINE DATA
    // =========================
    let result = [...products];

    // =========================
    // SEARCH (từ detail page)
    // =========================
    const keyword = sessionStorage.getItem("searchKeyword");

    if (keyword) {

        sessionStorage.removeItem("searchKeyword");

        const k = keyword.toLowerCase();

        result = result.filter(p =>
            (p.name || "").toLowerCase().includes(k) ||
            (p.description || "").toLowerCase().includes(k) ||
            (p.brand || "").toLowerCase().includes(k)
        );
    }

    // =========================
    // CATEGORY FILTER
    // =========================
    const category = sessionStorage.getItem("filterCategory");

    if (category) {

        sessionStorage.removeItem("filterCategory");

        result = result.filter(p => p.category === category);
    }

    // =========================
    // BRAND FILTER
    // =========================
    const brand = sessionStorage.getItem("filterBrand");

    if (brand) {

        sessionStorage.removeItem("filterBrand");

        result = result.filter(p => p.brand === brand);
    }

    // =========================
    // FINAL RENDER
    // =========================
    renderProducts(result);

    // =========================
    // CART
    // =========================
    updateCartCount();

    // =========================
    // SLIDER
    // =========================
    if (typeof initExcellSlider === "function") {
        initExcellSlider();
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