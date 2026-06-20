window.currentProducts = [];
function boot() {

    const products = getProducts();

    if (!products || !products.length) {
        setTimeout(boot, 100);
        return;
    }

    // Ngôn ngữ
    currentLang =
        localStorage.getItem("language") || "vi";

   
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
    const keyword = sessionStorage.getItem("searchKeyword");

if (keyword) {

    sessionStorage.removeItem("searchKeyword");

    const k = keyword.toLowerCase().trim();

const categoryMap = {
    "cân bàn": "can-ban",
    "cân đếm": "can-dem",
    "cân treo": "can-treo",
    "đầu cân": "dau-can-dien-tu",
    "cân phân tích": "can-phan-tich",
    "cân chống nước": "can-chong-nuoc",
    "cân in tem": "can-in-tem-ma-vach",
    "cân ghế": "can-ghe-ngoi"
};

// Nếu người dùng tìm tên danh mục
if (categoryMap[k]) {

    result = result.filter(
        p => p.category === categoryMap[k]
    );

}
// Tìm sản phẩm hoặc hãng
else {

    result = result.filter(p => {

        return (
            (p.name || "").toLowerCase().includes(k) ||
            (p.description || "").toLowerCase().includes(k) ||
            (p.brand || "").toLowerCase().includes(k)
        );
    });
}
    allProductsCache = [...result];
    window.currentProducts = result;
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