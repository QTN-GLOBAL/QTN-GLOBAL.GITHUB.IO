/* =====================================================
   PRODUCT DRAFT SYSTEM
   QTN GLOBAL CMS

   PURPOSE
   -----------------------------------------------------
   - Lưu Product Draft vào localStorage
   - Load Draft để tiếp tục chỉnh sửa
   - Xóa từng Draft
   - Xóa toàn bộ Draft
   - Quản lý currentProduct
   - Không can thiệp vào product.description
   - Không can thiệp vào product.specs

   STORAGE KEY
   -----------------------------------------------------
   productDrafts

   DATA FLOW

   currentProduct
        ↓
   saveProductDraft()
        ↓
   localStorage
        ↓
   productDrafts
        ↓
   loadProductDraft()
        ↓
   currentProduct

===================================================== */


/* =====================================================
   STORAGE KEY
===================================================== */

const PRODUCT_DRAFT_STORAGE_KEY =

    "productDrafts";


/* =====================================================
   GET ALL DRAFTS
===================================================== */

function getProductDrafts() {

    try {

        const raw =

            localStorage.getItem(

                PRODUCT_DRAFT_STORAGE_KEY

            );


        if (!raw) {

            return [];

        }


        const drafts =

            JSON.parse(raw);


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

            "Không thể lưu Product Drafts:",

            error

        );


        alert(

            "Không thể lưu Product Draft. " +

            "Có thể bộ nhớ trình duyệt đã đầy."

        );


        return false;

    }

}


/* =====================================================
   SAVE PRODUCT DRAFT
===================================================== */

function saveProductDraft() {

    /* =========================================
       CHECK CURRENT PRODUCT
    ========================================== */

    if (!window.currentProduct) {

        console.warn(

            "Không có currentProduct để lưu."

        );


        return false;

    }


    /* =========================================
       CHECK ID
    ========================================== */

    if (!window.currentProduct.id) {

        console.warn(

            "Product chưa có ID."

        );


        return false;

    }


    /* =========================================
       GET DRAFTS
    ========================================== */

    const drafts =

        getProductDrafts();


    /* =========================================
       CLONE CURRENT PRODUCT

       Không lưu trực tiếp object gốc.
    ========================================== */

    let draft;


    try {

        draft =

            JSON.parse(

                JSON.stringify(

                    window.currentProduct

                )

            );

    }

    catch (error) {

        console.error(

            "Không thể clone currentProduct:",

            error

        );


        return false;

    }


    /* =========================================
       META
    ========================================== */

    if (!draft.createdAt) {

        draft.createdAt =

            new Date().toISOString();

    }


    draft.updatedAt =

        new Date().toISOString();


    draft.status =

        "draft";


    /* =========================================
       FIND EXISTING DRAFT
    ========================================== */

    const index =

        drafts.findIndex(

            item =>

                String(item.id) ===

                String(draft.id)

        );


    /* =========================================
       UPDATE EXISTING
    ========================================== */

    if (index >= 0) {

        drafts[index] =

            draft;

    }


    /* =========================================
       CREATE NEW
    ========================================== */

    else {

        drafts.push(

            draft

        );

    }


    /* =========================================
       SAVE
    ========================================== */

    const saved =

        saveAllProductDrafts(

            drafts

        );


    if (!saved) {

        return false;

    }


    /* =========================================
       LOG
    ========================================== */

    console.log("");

    console.log(

        "========== DRAFT SAVED =========="

    );

    console.log(

        draft

    );

    console.log(

        "================================="

    );


    /* =========================================
       REFRESH DRAFT LIST
    ========================================== */

    renderDraftList();


    /* =========================================
       REFRESH PRODUCT LIST
    ========================================== */

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


    /* =========================================
       CLEAR
    ========================================== */

    container.innerHTML = "";


    /* =========================================
       GET DRAFTS
    ========================================== */

    const drafts =

        getProductDrafts();


    /* =========================================
       EMPTY
    ========================================== */

    if (!drafts.length) {

        container.innerHTML = `

            <div class="empty-draft">

                Chưa có Draft

            </div>

        `;


        return;

    }


    /* =========================================
       RENDER DRAFTS
    ========================================== */

    drafts.forEach(

        product => {

            const name =

                product.product?.name ||

                product.name ||

                "Unnamed Product";


            const id =

                product.id ||

                "";


            const updatedAt =

                product.updatedAt ||

                "";


            container.innerHTML += `

                <div

                    class="draft-item"

                    data-id="${escapeDraftHTML(id)}"

                >


                    <div

                        class="draft-product-name"

                    >

                        ${escapeDraftHTML(name)}

                    </div>


                    <div

                        class="draft-product-id"

                    >

                        ID:

                        ${escapeDraftHTML(id)}

                    </div>


                    ${
                        updatedAt

                            ? `

                            <div

                                class="draft-product-date"

                            >

                                Updated:

                                ${escapeDraftHTML(

                                    formatDraftDate(

                                        updatedAt

                                    )

                                )}

                            </div>

                            `

                            : ""

                    }


                    <div

                        class="draft-actions"

                    >


                        <button

                            type="button"

                            onclick="loadProductDraft(

                                '${escapeDraftAttribute(id)}'

                            )"

                        >

                            Edit

                        </button>


                        <button

                            type="button"

                            onclick="deleteProductDraft(

                                '${escapeDraftAttribute(id)}'

                            )"

                        >

                            Delete

                        </button>


                    </div>


                </div>

            `;

        }

    );

}


/* =====================================================
   LOAD PRODUCT DRAFT
===================================================== */

function loadProductDraft(id) {

    /* =========================================
       VALIDATE ID
    ========================================== */

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


    /* =========================================
       GET DRAFTS
    ========================================== */

    const drafts =

        getProductDrafts();


    /* =========================================
       FIND DRAFT
    ========================================== */

    const draft =

        drafts.find(

            item =>

                String(item.id) ===

                String(id)

        );


    if (!draft) {

        alert(

            "Không tìm thấy Product Draft."

        );


        return false;

    }


    /* =========================================
       CLONE DATA
    ========================================== */

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


    /* =========================================
       DEBUG
    ========================================== */

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


    /* =========================================
       OPEN PRODUCT FORM
    ========================================== */

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

    /* =========================================
       VALIDATE ID
    ========================================== */

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


    /* =========================================
       GET DRAFTS
    ========================================== */

    const drafts =

        getProductDrafts();


    /* =========================================
       FIND DRAFT
    ========================================== */

    const draft =

        drafts.find(

            item =>

                String(item.id) ===

                String(id)

        );


    if (!draft) {

        alert(

            "Không tìm thấy Product Draft."

        );


        return false;

    }


    /* =========================================
       PRODUCT NAME
    ========================================== */

    const name =

        draft.product?.name ||

        draft.name ||

        "Unnamed Product";


    /* =========================================
       CONFIRM
    ========================================== */

    const confirmed =

        confirm(

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


    /* =========================================
       REMOVE
    ========================================== */

    const newDrafts =

        drafts.filter(

            item =>

                String(item.id) !==

                String(id)

        );


    /* =========================================
       SAVE
    ========================================== */

    const saved =

        saveAllProductDrafts(

            newDrafts

        );


    if (!saved) {

        return false;

    }


    /* =========================================
       IF CURRENT PRODUCT IS SAME DRAFT

       Chỉ xóa currentProduct nếu
       ID trùng với Draft vừa xóa.
    ========================================== */

    if (

        window.currentProduct &&

        String(

            window.currentProduct.id

        ) === String(id)

    ) {

        window.currentProduct =

            null;

    }


    /* =========================================
       REFRESH DRAFT LIST
    ========================================== */

    renderDraftList();


    /* =========================================
       REFRESH PRODUCT LIST
    ========================================== */

    if (

        typeof renderProductList ===

        "function"

    ) {

        renderProductList();

    }


    /* =========================================
       LOG
    ========================================== */

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


    /* =========================================
       CHECK EMPTY
    ========================================== */

    if (!drafts.length) {

        alert(

            "Không có Product Draft để xóa."

        );


        return false;

    }


    /* =========================================
       CONFIRM
    ========================================== */

    const confirmed =

        confirm(

            "Bạn có chắc muốn xóa TOÀN BỘ Product Draft?\n\n" +

            "Số lượng Draft: " +

            drafts.length +

            "\n\n" +

            "Thao tác này không thể hoàn tác."

        );


    if (!confirmed) {

        return false;

    }


    /* =========================================
       CLEAR DRAFT STORAGE ONLY

       KHÔNG XÓA:

       - products
       - settings
       - CMS data khác
       - localStorage khác
    ========================================== */

    const saved =

        saveAllProductDrafts(

            []

        );


    if (!saved) {

        return false;

    }


    /* =========================================
       CLEAR CURRENT PRODUCT

       Chỉ currentProduct hiện tại.
    ========================================== */

    window.currentProduct =

        null;


    /* =========================================
       REFRESH
    ========================================== */

    renderDraftList();


    if (

        typeof renderProductList ===

        "function"

    ) {

        renderProductList();

    }


    /* =========================================
       LOG
    ========================================== */

    console.log(

        "========== ALL PRODUCT DRAFTS DELETED =========="

    );


    return true;

}


/* =====================================================
   CLEAR CURRENT PRODUCT DRAFT
===================================================== */

function clearCurrentProductDraft() {

    /* =========================================
       CHECK CURRENT PRODUCT
    ========================================== */

    if (

        !window.currentProduct ||

        !window.currentProduct.id

    ) {

        console.warn(

            "Không có currentProduct để xóa Draft."

        );


        return false;

    }


    const id =

        window.currentProduct.id;


    return deleteProductDraft(

        id

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

            item =>

                String(item.id) ===

                String(id)

        ) ||

        null

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

function formatDraftDate(

    value

) {

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
   ESCAPE HTML
===================================================== */

function escapeDraftHTML(

    value

) {

    if (

        value === null ||

        value === undefined

    ) {

        return "";

    }


    return String(value)

        .replace(

            /&/g,

            "&amp;"

        )

        .replace(

            /</g,

            "&lt;"

        )

        .replace(

            />/g,

            "&gt;"

        )

        .replace(

            /"/g,

            "&quot;"

        )

        .replace(

            /'/g,

            "&#039;"

        );

}


/* =====================================================
   ESCAPE ATTRIBUTE
===================================================== */

function escapeDraftAttribute(

    value

) {

    if (

        value === null ||

        value === undefined

    ) {

        return "";

    }


    return String(value)

        .replace(

            /\\/g,

            "\\\\"

        )

        .replace(

            /'/g,

            "\\'"

        );

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

   Có thể dùng Console:

   getProductDrafts()

   getProductDraftById("ID")

   productDraftExists("ID")

   deleteProductDraft("ID")

   deleteAllProductDrafts()

===================================================== */