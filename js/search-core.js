window.SearchCore = {

    normalize(str) {
        return (str || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/\s+/g, " ")
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

        // 🔥 FIX 1: tìm key chính xác hơn (không dùng includes sai lệch)
        const matchedCategoryKey = Object.keys(this.categoryMap)
            .find(key => this.normalize(key) === k);

        if (matchedCategoryKey) {
            return products.filter(
                p => p.category === this.categoryMap[matchedCategoryKey]
            );
        }

        // 🔥 FIX 2: fallback search an toàn
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