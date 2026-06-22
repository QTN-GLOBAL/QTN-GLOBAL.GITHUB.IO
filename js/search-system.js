/* =========================
   SEARCH SYSTEM (SINGLE SOURCE OF TRUTH)
   - handle search
   - handle category search
   - handle brand search
   - safe normalize
========================= */

(function () {

    /* =========================
       NORMALIZE TEXT
    ========================= */
    function normalize(str) {
        return (str || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/\s+/g, " ")
            .trim();
    }

    /* =========================
       CATEGORY MAP
    ========================= */
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

    /* =========================
       CORE FILTER ENGINE
    ========================= */
    function filterProducts(products, keyword) {

        if (!keyword) return products;

        const k = normalize(keyword);

        // 1. category search (exact match)
        const categoryKey = Object.keys(categoryMap)
            .find(key => normalize(key) === k);

        if (categoryKey) {
            return products.filter(
                p => p.category === categoryMap[categoryKey]
            );
        }

        // 2. fallback search (name + brand + description)
        return products.filter(p => {

            const text = normalize(
                [p.name, p.description, p.brand]
                    .filter(Boolean)
                    .join(" ")
            );

            return text.includes(k);
        });
    }

    /* =========================
       PUBLIC API
    ========================= */
    window.SearchSystem = {

        filter: filterProducts,

        go(keyword) {

            const k = (keyword || "").trim();
            if (!k) return;

            sessionStorage.setItem("searchKeyword", k);
            window.location.href = "index.html";
        }
    };

    /* =========================
       GLOBAL SEARCH EVENTS (NO DEAD CLICK)
    ========================= */

    document.addEventListener("click", function (e) {

        const btn = e.target.closest("#searchBtn");
        if (!btn) return;

        const input = document.getElementById("searchInput");
        const keyword = input ? input.value : "";

        window.SearchSystem.go(keyword);
    });

    document.addEventListener("keydown", function (e) {

        if (e.key !== "Enter") return;

        const input = document.getElementById("searchInput");

        if (document.activeElement === input) {
            window.SearchSystem.go(input.value);
        }
    });

})();