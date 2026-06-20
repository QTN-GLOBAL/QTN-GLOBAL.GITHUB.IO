function boot() {

    const products = getProducts();

    if (!products || !products.length) {
        setTimeout(boot, 100);
        return;
    }

    // Ngôn ngữ
    currentLang =
        localStorage.getItem("language") || "vi";

    applyLanguage(currentLang);

    // Dữ liệu
    let result = [...products];

    // Danh mục
    const category =
        sessionStorage.getItem("filterCategory");

    if (category) {
        sessionStorage.removeItem("filterCategory");

        result = result.filter(
            p => p.category === category
        );
    }

    // Thương hiệu
    const brand =
        sessionStorage.getItem("filterBrand");

    if (brand) {
        sessionStorage.removeItem("filterBrand");

        result = result.filter(
            p => p.brand === brand
        );
    }

    // Tìm kiếm
    const keyword =
        sessionStorage.getItem("searchKeyword");

    if (keyword) {

        sessionStorage.removeItem("searchKeyword");

        const k = keyword.toLowerCase().trim();

        result = result.filter(p => {

            const text = Object.values(p)
                .join(" ")
                .toLowerCase();

            return text.includes(k);
        });
    }

    renderProducts(result);

    if (typeof updateCartCount === "function") {
        updateCartCount();
    }

    if (typeof initExcellSlider === "function") {
        initExcellSlider();
    }

    const openCartFlag =
        sessionStorage.getItem("openCart");

    if (openCartFlag === "1") {

        sessionStorage.removeItem("openCart");

        if (typeof openCart === "function") {
            openCart();
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    boot();
});