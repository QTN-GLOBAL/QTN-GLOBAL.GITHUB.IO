/* =========================
   SEARCH SYSTEM (FINAL FIX)
========================= */

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
        "can ghe": "can-ghe-ngoi"
    };

    function filterProducts(products, keyword) {

        if (!keyword) return products;

        const k = normalize(keyword);

        const categoryKey = Object.keys(categoryMap)
            .find(key => normalize(key) === k);

        if (categoryKey) {
            return products.filter(
                p => p.category === categoryMap[categoryKey]
            );
        }

        return products.filter(p => {

            const text = normalize(
                [p.name, p.brand, p.description]
                    .filter(Boolean)
                    .join(" ")
            );

            return text.includes(k);
        });
    }

    window.SearchSystem = {

        filter: filterProducts,

        go(keyword) {

    const k = (keyword || "").trim();
    if (!k) return;

    sessionStorage.setItem("searchKeyword", k);

    // khóa chế độ trang
    window.APP_MODE.mode = "search";

    window.location.href = "index.html";
}
    };

    document.addEventListener("click", function (e) {

        const btn = e.target.closest("#searchBtn");
        if (!btn) return;

        const input = document.getElementById("searchInput");
        window.SearchSystem.go(input ? input.value : "");
    });

    document.addEventListener("keydown", function (e) {

        if (e.key !== "Enter") return;

        const input = document.getElementById("searchInput");

        if (document.activeElement === input) {
            window.SearchSystem.go(input.value);
        }
    });

})();