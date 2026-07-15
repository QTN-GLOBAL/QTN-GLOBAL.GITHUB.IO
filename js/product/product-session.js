/* =====================================================
   PRODUCT SESSION
   Lưu toàn bộ dữ liệu sản phẩm đang chỉnh sửa
===================================================== */

window.currentProduct = {

    business: "",

    category: "",

    brand: "",

    origin: "",

    folder: "",

    id: "",

    name: "",

    status: "draft",

    description: "",

    specs: [],

    images: {

        main: "",

        gallery: []

    },

    seo: {}

};
/* =====================================================
   PRODUCT DRAFT LIST
===================================================== */

window.productDrafts = [];

/* =====================================================
   RESET PRODUCT
===================================================== */

function resetCurrentProduct() {

    window.currentProduct = {

        business: "",

        category: "",

        brand: "",

        origin: "",

        folder: "",

        id: "",

        name: "",

        status: "draft",

        description: "",

        specs: [],

        images: {

            main: "",

            gallery: []

        },

        seo: {}

    };

}