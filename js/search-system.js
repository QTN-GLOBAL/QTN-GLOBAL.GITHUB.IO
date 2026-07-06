(function () {

    function normalize(str) {
        return (str || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/\s+/g, " ")
            .trim();
    }

    const categoryMap = {
        "can ban": "can-ban",
        "can dem": "can-dem",
        "can treo": "can-treo",
        "dau can": "dau-can-dien-tu",
        "can phan tich": "can-phan-tich",
        "can chong nuoc": "can-chong-nuoc",
        "can in tem": "can-in-tem-ma-vach",
        "can ghe": "can-ghe-ngoi",

        "may loc khong khi": "air-purifier",
        "may loc nuoc": "water-purifier",
        "loi loc": "water-filter",
        "phu kien": "air-filter"
    };

    function detectType(products, keyword) {

        if (!keyword) {
            return { type: "product", data: products };
        }

        const k = normalize(keyword);

        // ======================
        // CATEGORY (FIXED)
        // ======================
        const categoryKey = Object.keys(categoryMap)
            .find(key => k.includes(normalize(key)));

        if (categoryKey) {

            const categoryProducts = products.filter(
                p => p.category === categoryMap[categoryKey]
            );

            return {
                type: "category",
                data: categoryProducts
            };
        }

        // ======================
        // BRAND
        // ======================
        const brandProducts = products.filter(
            p => normalize(p.brand).includes(k)
        );

        if (brandProducts.length > 0) {
            return {
                type: "brand",
                data: brandProducts
            };
        }

        // ======================
        // PRODUCT SEARCH
        // ======================
        const result = products.filter(p => {

            const text = normalize([
                p.name,
                p.brand,
                p.description
            ].join(" "));

            return text.includes(k);
        });

        return {
            type: "product",
            data: result
        };
    }

    function go(keyword) {

    const k = (keyword || "").trim();
    if (!k) return;

    console.log("SEARCH GO:", k);

    try {
        sessionStorage.setItem("searchKeyword", k);
    } catch (e) {
        console.error("sessionStorage error", e);
    }

    window.APP_MODE = window.APP_MODE || {};
    window.APP_MODE.mode = "search";

    // 🔥 delay nhỏ để chắc chắn storage được ghi
    setTimeout(() => {
        window.location.href = "index.html";
    }, 10);
}

    window.SearchSystem = {
        detectType,
        go
    };
window.runSearch = function () {

    const input = document.getElementById("searchInput");

    if (!input) return;

    alert("Nút Search đã được bấm");

    SearchSystem.go(input.value);

};
document.addEventListener("keydown", function (e) {

    if (e.key !== "Enter") return;

    const input = document.getElementById("searchInput");

    if (!input) return;

    if (document.activeElement === input) {
        e.preventDefault(); // 🔥 cực quan trọng
        window.SearchSystem.go(input.value);
    }
});
// Click nút tìm kiếm
window.runSearch = function () {

    const input = document.getElementById("searchInput");

    if (!input) return;

    SearchSystem.go(input.value);

};
})();