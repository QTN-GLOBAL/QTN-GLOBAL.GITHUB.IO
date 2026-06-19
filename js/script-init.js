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
    // PIPELINE (GOM FILTER 1 CHỖ DUY NHẤT)
    // =========================
    let result = [...products];

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
    // SEARCH FILTER (TỪ DETAIL PAGE)
    // =========================
   const keyword = sessionStorage.getItem("searchKeyword");

if (keyword) {

    const k = keyword.toLowerCase().trim();

    sessionStorage.removeItem("searchKeyword");

    result = result.filter(p => {

        // gom toàn bộ dữ liệu sản phẩm thành 1 chuỗi an toàn
        const text = [
            p.name,
            p.description,
            p.brand
        ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

        return text.includes(k);
    });
}

    // =========================
    // FINAL RENDER (CHỈ 1 LẦN DUY NHẤT)
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