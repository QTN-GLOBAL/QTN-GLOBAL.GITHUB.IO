window.currentProducts = [];

function boot() {

    const products = getProducts();

    if (!products || !products.length) {
        setTimeout(boot, 100);
        return;
    }

    // Ngôn ngữ
    setLanguage(
        localStorage.getItem("language") || "vi"
    );

    // Dữ liệu gốc
    let result = [...products];

    // Danh mục
    const category =
        sessionStorage.getItem("filterCategory");

    if (category) {

        sessionStorage.removeItem(
            "filterCategory"
        );

        result = result.filter(
            p => p.category === category
        );
    }

    // Thương hiệu
    const brand =
        sessionStorage.getItem("filterBrand");

    if (brand) {

        sessionStorage.removeItem(
            "filterBrand"
        );

        result = result.filter(
            p => p.brand === brand
        );
    }

    // Search
    const keyword =
        sessionStorage.getItem("searchKeyword");

    if (keyword) {

        sessionStorage.removeItem(
            "searchKeyword"
        );

        const k =
            keyword.toLowerCase().trim();

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

        if (categoryMap[k]) {

            result = result.filter(
                p => p.category === categoryMap[k]
            );

        } else {

            result = result.filter(p => {

                return (
                    (p.name || "")
                        .toLowerCase()
                        .includes(k) ||

                    (p.description || "")
                        .toLowerCase()
                        .includes(k) ||

                    (p.brand || "")
                        .toLowerCase()
                        .includes(k)
                );
            });
        }
    }

    // Cache
    allProductsCache = [...result];
    window.currentProducts = [...result];

    // Render
    renderProducts(result);

    // Cart
    if (typeof updateCartCount === "function") {
        updateCartCount();
    }

    // Slider
    if (typeof initExcellSlider === "function") {
        initExcellSlider();
    }

    // Open cart
    const openCartFlag =
        sessionStorage.getItem("openCart");

    if (openCartFlag === "1") {

        sessionStorage.removeItem(
            "openCart"
        );

        if (typeof openCart === "function") {
            openCart();
        }
    }
}

document.addEventListener(
    "DOMContentLoaded",
    boot
);