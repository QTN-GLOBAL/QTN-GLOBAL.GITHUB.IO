/* =====================================================
   PRODUCT SYNC
   Form -> currentProduct
===================================================== */

function syncProductSession() {

    if (!window.currentProduct) return;

    const business =
        document.getElementById("productBusiness");

    const category =
        document.getElementById("productCategory");

    const brand =
        document.getElementById("productBrand");

    const origin =
        document.getElementById("productOrigin");

    const folder =
        document.getElementById("productFolder");

    const productId =
        document.getElementById("productId");

    const productName =
        document.getElementById("productName");

    const status =
        document.querySelector(
            'input[name="productStatus"]:checked'
        );

    window.currentProduct.business =
        business ? business.value : "";

    window.currentProduct.category =
        category ? category.value : "";

    window.currentProduct.brand =
        brand ? brand.value : "";

    window.currentProduct.origin =
        origin ? origin.value : "";

    window.currentProduct.folder =
        folder ? folder.value : "";

    window.currentProduct.id =
        productId ? productId.value : "";

    window.currentProduct.name =
        productName ? productName.value : "";

    window.currentProduct.status =
        status ? status.value : "draft";

}

/* =====================================================
   BIND SYNC EVENTS
===================================================== */

function bindProductSync() {

    const ids = [

        "productBusiness",

        "productCategory",

        "productBrand",

        "productOrigin",

        "productFolder",

        "productId",

        "productName"

    ];

    ids.forEach(id => {

        const el =
            document.getElementById(id);

        if (!el) return;

        el.addEventListener("input", syncProductSession);

        el.addEventListener("change", syncProductSession);

    });

    document
        .querySelectorAll(
            'input[name="productStatus"]'
        )
        .forEach(radio => {

            radio.addEventListener(
                "change",
                syncProductSession
            );

        });

    syncProductSession();

}