/* =====================================================
   PRODUCT DRAFT SYSTEM
   QTN GLOBAL CMS
===================================================== */


/* =====================================================
   SAVE PRODUCT DRAFT
===================================================== */

function saveProductDraft() {

    /* ==========================
       CHECK CURRENT PRODUCT
    ========================== */

    if (!window.currentProduct) {

        console.warn(
            "Không có currentProduct để lưu."
        );

        return false;

    }


    if (!window.currentProduct.id) {

        console.warn(
            "Product chưa có ID."
        );

        return false;

    }


    /* ==========================
       GET DRAFTS
    ========================== */

    let drafts = JSON.parse(

        localStorage.getItem(
            "productDrafts"
        ) || "[]"

    );


    /* ==========================
       CLONE PRODUCT
    ========================== */

    const draft = JSON.parse(

        JSON.stringify(

            window.currentProduct

        )

    );


    /* ==========================
       META
    ========================== */

    if (
        !draft.createdAt
    ) {

        draft.createdAt =

            new Date().toISOString();

    }


    draft.updatedAt =

        new Date().toISOString();


    draft.status =

        "draft";


    /* ==========================
       FIND EXISTING DRAFT
    ========================== */

    const index =

        drafts.findIndex(

            item =>

                String(item.id) ===

                String(draft.id)

        );


    /* ==========================
       UPDATE
    ========================== */

    if (index >= 0) {

        drafts[index] = draft;

    }


    /* ==========================
       CREATE
    ========================== */

    else {

        drafts.push(draft);

    }


    /* ==========================
       SAVE LOCAL STORAGE
    ========================== */

    localStorage.setItem(

        "productDrafts",

        JSON.stringify(drafts)

    );


    /* ==========================
       LOG
    ========================== */

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


    /* ==========================
       REFRESH DRAFT LIST
    ========================== */

    if (

        typeof renderDraftList ===

        "function"

    ) {

        renderDraftList();

    }


    /* ==========================
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


    if (!container) return;


    /* ==========================
       CLEAR
    ========================== */

    container.innerHTML = "";


    /* ==========================
       GET DRAFTS
    ========================== */

    const drafts = JSON.parse(

        localStorage.getItem(

            "productDrafts"

        ) || "[]"

    );


    /* ==========================
       EMPTY
    ========================== */

    if (!drafts.length) {

        container.innerHTML = `

            <div class="empty-draft">

                Chưa có Draft

            </div>

        `;

        return;

    }


    /* ==========================
       RENDER
    ========================== */

    drafts.forEach(product => {

        const name =

            product.product?.name ||

            product.name ||

            "Unnamed Product";


        container.innerHTML += `

            <div

                class="draft-item"

                data-id="${product.id}">


                <div

                    class="draft-product-name">

                    ${escapeDraftHTML(

                        name

                    )}

                </div>


                <div

                    class="draft-product-id">

                    ID:

                    ${escapeDraftHTML(

                        product.id

                    )}

                </div>


                <button

                    type="button"

                    onclick="loadProductDraft('${product.id}')">

                    Edit

                </button>


            </div>

        `;

    });

}


/* =====================================================
   LOAD PRODUCT DRAFT
===================================================== */

function loadProductDraft(id) {

    /* ==========================
       GET DRAFTS
    ========================== */

    const drafts = JSON.parse(

        localStorage.getItem(

            "productDrafts"

        ) || "[]"

    );


    /* ==========================
       FIND DRAFT
    ========================== */

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

        return;

    }


    /* ==========================
       CLONE DATA
    ========================== */

    window.currentProduct =

        JSON.parse(

            JSON.stringify(

                draft

            )

        );


    /* ==========================
       DEBUG
    ========================== */

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


    /* ==========================
       OPEN PRODUCT FORM
    ========================== */

    if (

        typeof renderProductBasic ===

        "function"

    ) {

        renderProductBasic();

    }

}


/* =====================================================
   DELETE PRODUCT DRAFT
===================================================== */

function deleteProductDraft(id) {

    if (

        !confirm(

            "Bạn có chắc muốn xóa Draft này?"

        )

    ) {

        return;

    }


    let drafts = JSON.parse(

        localStorage.getItem(

            "productDrafts"

        ) || "[]"

    );


    drafts = drafts.filter(

        item =>

            String(item.id) !==

            String(id)

    );


    localStorage.setItem(

        "productDrafts",

        JSON.stringify(

            drafts

        )

    );


    /* ==========================
       REFRESH
    ========================== */

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

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeDraftHTML(value) {

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
   AUTO RENDER
===================================================== */

document.addEventListener(

    "DOMContentLoaded",

    function () {

        renderDraftList();

    }

);