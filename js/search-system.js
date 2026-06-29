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

        sessionStorage.setItem("searchKeyword", k);

        window.location.href = "index.html";
    }

    window.SearchSystem = {
        detectType,
        go
    };

})();