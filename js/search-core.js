/* =========================
   SEARCH CORE (SAFE VERSION)
========================= */

window.SearchCore = {

    normalize(str) {
        return (str || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .trim();
    },

    categoryMap: {
        "can ban": "can-ban",
        "can dem": "can-dem",
        "can treo": "can-treo",
        "dau can": "dau-can-dien-tu",
        "can phan tich": "can-phan-tich",
        "can chong nuoc": "can-chong-nuoc",
        "can in tem": "can-in-tem-ma-vach",
        "can ghe": "can-ghe-ngoi"
    },

    filter(products, keyword) {

        if (!keyword) return products;

        const k = this.normalize(keyword);

        // 1. category search
        if (this.categoryMap[k]) {
            return products.filter(
                p => p.category === this.categoryMap[k]
            );
        }

        // 2. product/brand search
        return products.filter(p => {

            const text = this.normalize(
                [p.name, p.description, p.brand]
                    .filter(Boolean)
                    .join(" ")
            );

            return text.includes(k);
        });
    }
};