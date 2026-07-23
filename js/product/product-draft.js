/* =====================================================
   PRODUCT DRAFT SYSTEM
   QTN GLOBAL CMS

   PURPOSE
   -----------------------------------------------------
   - Lưu Product Draft vào localStorage
   - Không lưu Base64 ảnh vào localStorage
   - Giữ ảnh trong window.currentProduct khi đang làm việc
   - Load Draft
   - Xóa Draft
   - Xóa toàn bộ Draft
   - Quản lý currentProduct

   STORAGE KEY
   -----------------------------------------------------
   productDrafts

===================================================== */


/* =====================================================
   STORAGE KEY
===================================================== */

const PRODUCT_DRAFT_STORAGE_KEY = "productDrafts";


/* =====================================================
   GET ALL DRAFTS
===================================================== */

function getProductDrafts() {

    try {

        const raw = localStorage.getItem(
            PRODUCT_DRAFT_STORAGE_KEY
        );

        if (!raw) {

            return [];

        }

        const drafts = JSON.parse(raw);

        if (!Array.isArray(drafts)) {

            console.warn(
                "productDrafts không phải Array."
            );

            return [];

        }

        return drafts;

    }

    catch (error) {

        console.error(
            "Không thể đọc Product Drafts:",
            error
        );

        return [];

    }

}


/* =====================================================
   SAVE ALL DRAFTS
===================================================== */

function saveAllProductDrafts(drafts) {

    try {

        localStorage.setItem(

            PRODUCT_DRAFT_STORAGE_KEY,

            JSON.stringify(drafts)

        );

        return true;

    }

    catch (error) {

        console.error(
            "Không thể lưu Product Draft:",
            error
        );

        console.error(
            "Storage Error:",
            error.name,
            error.message
        );

        alert(
            "Không thể lưu Product Draft.\n\n" +
            "Bộ nhớ trình duyệt có thể đã đầy."
        );

        return false;

    }

}


/* =====================================================
   REMOVE BASE64 IMAGE
   -----------------------------------------------------
   Không lưu Base64 ảnh vào localStorage.
===================================================== */

function sanitizeDraftImage(image) {

    if (!image) {

        return image;

    }


    /* =========================
       IMAGE STRING
    ========================== */

    if (typeof image === "string") {

        if (
            image.startsWith("data:image/")
        ) {

            return "";

        }

        return image;

    }


    /* =========================
       IMAGE OBJECT
    ========================== */

    if (
        typeof image === "object"
    ) {

        const cleanImage = {

            ...image

        };


        if (
            typeof cleanImage.src === "string" &&
            cleanImage.src.startsWith("data:image/")
        ) {

            cleanImage.src = "";

            cleanImage.base64Excluded = true;

        }


        return cleanImage;

    }


    return image;

}


/* =====================================================
   SANITIZE PRODUCT DRAFT
===================================================== */

function sanitizeProductDraft(product) {

    if (!product) {

        return null;

    }

    let draft;

    try {

        draft = JSON.parse(

            JSON.stringify(product)

        );

    }

    catch (error) {

        console.error(
            "Không thể clone currentProduct:",
            error
        );

        return null;

    }


    /* =========================
       MAIN IMAGE
    ========================== */

    if (draft.mainImage) {

        draft.mainImage =

            sanitizeDraftImage(

                draft.mainImage

            );

    }


    /* =========================
       GALLERY
    ========================== */

    if (
        Array.isArray(draft.gallery)
    ) {

        draft.gallery =

            draft.gallery.map(

                function (image) {

                    return sanitizeDraftImage(

                        image

                    );

                }

            );

    }


    /* =========================
       IMAGES OBJECT
    ========================== */

    if (
        draft.images &&
        typeof draft.images === "object"
    ) {

        if (draft.images.main) {

            draft.images.main =

                sanitizeDraftImage(

                    draft.images.main

                );

        }


        if (
            Array.isArray(
                draft.images.gallery
            )
        ) {

            draft.images.gallery =

                draft.images.gallery.map(

                    function (image) {

                        return sanitizeDraftImage(

                            image

                        );

                    }

                );

        }

    }


    return draft;

}


/* =====================================================
   SAVE PRODUCT DRAFT
===================================================== */

function saveProductDraft() {

    /* =========================
       CHECK CURRENT PRODUCT
    ========================== */

    if (!window.currentProduct) {

        console.warn(
            "Không có currentProduct để lưu."
        );

        return false;

    }


    /* =========================
       CHECK ID
    ========================== */

    if (!window.currentProduct.id) {

        console.warn(
            "Product chưa có ID."
        );

        return false;

    }


    /* =========================
       GET DRAFTS
    ========================== */

    const drafts = getProductDrafts();


    /* =========================
       CREATE SAFE DRAFT
    ========================== */

    const draft = sanitizeProductDraft(

        window.currentProduct

    );


    if (!draft) {

        console.error(
            "Không thể tạo Product Draft."
        );

        return false;

    }


    /* =========================
       META
    ========================== */

    if (!draft.createdAt) {

        draft.createdAt =

            new Date().toISOString();

    }


    draft.updatedAt =

        new Date().toISOString();


    draft.status = "draft";


    /* =========================
       FIND EXISTING
    ========================== */

    const index = drafts.findIndex(

        function (item) {

            return (

                String(item.id) ===

                String(draft.id)

            );

        }

    );


    /* =========================
       UPDATE
    ========================== */

    if (index >= 0) {

        drafts[index] = draft;

    }


    /* =========================
       CREATE
    ========================== */

    else {

        drafts.push(draft);

    }


    /* =========================
       SAVE
    ========================== */

    const saved = saveAllProductDrafts(

        drafts

    );


    if (!saved) {

        return false;

    }


    /* =========================
       DEBUG
    ========================== */

    console.log("");

    console.log(
        "========== DRAFT SAVED =========="
    );

    console.log(draft);

    console.log(
        "================================="
    );


    /* =========================
       REFRESH DRAFT LIST
    ========================== */

    renderDraftList();


    /* =========================
       REFRESH PRODUCT LIST
    ========================== */

    if (
        typeof renderProductList ===
        "function"
    ) {

        renderProductList();

    }


    return true;

}


/* =====================================================
   RENDER DRAFT LIST
===================================================== */

function renderDraftList() {

    const container =

        document.getElementById(

            "draftProductList"

        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    const drafts =

        getProductDrafts();


    if (!drafts.length) {

        container.innerHTML = `

            <div class="empty-draft">

                Chưa có Draft

            </div>

        `;

        return;

    }


    drafts.forEach(

        function (product) {

            const name =

                product.product?.name ||

                product.name ||

                "Unnamed Product";


            const id =

                product.id || "";


            const updatedAt =

                product.updatedAt || "";


            const item =

                document.createElement(

                    "div"

                );


            item.className =

                "draft-item";


            item.dataset.id = id;


            /* =========================
               PRODUCT NAME
            ========================== */

            const nameElement =

                document.createElement(

                    "div"

                );


            nameElement.className =

                "draft-product-name";


            nameElement.textContent =

                name;


            /* =========================
               PRODUCT ID
            ========================== */

            const idElement =

                document.createElement(

                    "div"

                );


            idElement.className =

                "draft-product-id";


            idElement.textContent =

                "ID: " + id;


            /* =========================
               DATE
            ========================== */

            const dateElement =

                document.createElement(

                    "div"

                );


            dateElement.className =

                "draft-product-date";


            if (updatedAt) {

                dateElement.textContent =

                    "Updated: " +

                    formatDraftDate(

                        updatedAt

                    );

            }


            /* =========================
               ACTIONS
            ========================== */

            const actions =

                document.createElement(

                    "div"

                );


            actions.className =

                "draft-actions";


            /* =========================
               EDIT BUTTON
            ========================== */

            const editButton =

                document.createElement(

                    "button"

                );


            editButton.type =

                "button";


            editButton.textContent =

                "Edit";


            editButton.addEventListener(

                "click",

                function () {

                    loadProductDraft(

                        id

                    );

                }

            );


            /* =========================
               DELETE BUTTON
            ========================== */

            const deleteButton =

                document.createElement(

                    "button"

                );


            deleteButton.type =

                "button";


            deleteButton.textContent =

                "Delete";


            deleteButton.addEventListener(

                "click",

                function () {

                    deleteProductDraft(

                        id

                    );

                }

            );


            /* =========================
               APPEND
            ========================== */

            actions.appendChild(

                editButton

            );


            actions.appendChild(

                deleteButton

            );


            item.appendChild(

                nameElement

            );


            item.appendChild(

                idElement

            );


            if (updatedAt) {

                item.appendChild(

                    dateElement

                );

            }


            item.appendChild(

                actions

            );


            container.appendChild(

                item

            );

        }

    );

}


/* =====================================================
   LOAD PRODUCT DRAFT
===================================================== */

function loadProductDraft(id) {

    if (
        id === null ||
        id === undefined ||
        String(id).trim() === ""
    ) {

        alert(
            "Product Draft không có ID."
        );

        return false;

    }


    const drafts =

        getProductDrafts();


    const draft = drafts.find(

        function (item) {

            return (

                String(item.id) ===

                String(id)

            );

        }

    );


    if (!draft) {

        alert(
            "Không tìm thấy Product Draft."
        );

        return false;

    }


    try {

        window.currentProduct =

            JSON.parse(

                JSON.stringify(

                    draft

                )

            );

    }

    catch (error) {

        console.error(

            "Không thể load Product Draft:",

            error

        );

        alert(

            "Không thể mở Product Draft."

        );

        return false;

    }


    console.log("");

    console.log(

        "========== DRAFT LOADED =========="

    );

    console.log(

        window.currentProduct

    );

    console.log(

        "=================================="

    );


    if (

        typeof renderProductBasic ===

        "function"

    ) {

        renderProductBasic();

    }


    return true;

}


/* =====================================================
   DELETE PRODUCT DRAFT
===================================================== */

function deleteProductDraft(id) {

    if (
        id === null ||
        id === undefined ||
        String(id).trim() === ""
    ) {

        alert(
            "Không xác định được Draft cần xóa."
        );

        return false;

    }


    const drafts =

        getProductDrafts();


    const draft = drafts.find(

        function (item) {

            return (

                String(item.id) ===

                String(id)

            );

        }

    );


    if (!draft) {

        alert(
            "Không tìm thấy Product Draft."
        );

        return false;

    }


    const name =

        draft.product?.name ||

        draft.name ||

        "Unnamed Product";


    const confirmed = confirm(

        "Bạn có chắc muốn xóa Draft này?\n\n" +

        "Product: " +

        name +

        "\n\n" +

        "ID: " +

        id

    );


    if (!confirmed) {

        return false;

    }


    const newDrafts = drafts.filter(

        function (item) {

            return (

                String(item.id) !==

                String(id)

            );

        }

    );


    const saved =

        saveAllProductDrafts(

            newDrafts

        );


    if (!saved) {

        return false;

    }


    if (

        window.currentProduct &&

        String(

            window.currentProduct.id

        ) === String(id)

    ) {

        window.currentProduct = null;

    }


    renderDraftList();


    if (

        typeof renderProductList ===

        "function"

    ) {

        renderProductList();

    }


    console.log(

        "Draft Deleted:",

        id

    );


    return true;

}


/* =====================================================
   DELETE ALL PRODUCT DRAFTS
===================================================== */

function deleteAllProductDrafts() {

    const drafts =

        getProductDrafts();


    if (!drafts.length) {

        alert(

            "Không có Product Draft để xóa."

        );

        return false;

    }


    const confirmed = confirm(

        "Bạn có chắc muốn xóa TOÀN BỘ Product Draft?\n\n" +

        "Số lượng Draft: " +

        drafts.length +

        "\n\n" +

        "Thao tác này không thể hoàn tác."

    );


    if (!confirmed) {

        return false;

    }


    const saved =

        saveAllProductDrafts(

            []

        );


    if (!saved) {

        return false;

    }


    window.currentProduct = null;


    renderDraftList();


    if (

        typeof renderProductList ===

        "function"

    ) {

        renderProductList();

    }


    console.log(

        "========== ALL PRODUCT DRAFTS DELETED =========="

    );


    return true;

}


/* =====================================================
   CLEAR CURRENT PRODUCT DRAFT
===================================================== */

function clearCurrentProductDraft() {

    if (

        !window.currentProduct ||

        !window.currentProduct.id

    ) {

        console.warn(

            "Không có currentProduct để xóa Draft."

        );

        return false;

    }


    return deleteProductDraft(

        window.currentProduct.id

    );

}


/* =====================================================
   GET PRODUCT DRAFT BY ID
===================================================== */

function getProductDraftById(id) {

    if (

        id === null ||

        id === undefined

    ) {

        return null;

    }


    const drafts =

        getProductDrafts();


    return (

        drafts.find(

            function (item) {

                return (

                    String(item.id) ===

                    String(id)

                );

            }

        ) || null

    );

}


/* =====================================================
   CHECK PRODUCT DRAFT EXISTS
===================================================== */

function productDraftExists(id) {

    return !!getProductDraftById(

        id

    );

}


/* =====================================================
   FORMAT DATE
===================================================== */

function formatDraftDate(value) {

    if (!value) {

        return "";

    }


    try {

        const date =

            new Date(value);


        if (

            Number.isNaN(

                date.getTime()

            )

        ) {

            return String(value);

        }


        return date.toLocaleString(

            "vi-VN"

        );

    }

    catch (error) {

        return String(value);

    }

}


/* =====================================================
   AUTO RENDER
===================================================== */

document.addEventListener(

    "DOMContentLoaded",

    function () {

        renderDraftList();

    }

);


/* =====================================================
   DEBUG API

   Console:

   getProductDrafts()

   getProductDraftById("ID")

   productDraftExists("ID")

   deleteProductDraft("ID")

   deleteAllProductDrafts()

===================================================== */