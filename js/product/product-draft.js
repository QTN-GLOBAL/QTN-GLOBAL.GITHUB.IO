/* =====================================================
   SAVE PRODUCT DRAFT
===================================================== */

function saveProductDraft() {

    if (!window.currentProduct) return;

    if (!currentProduct.id) return;

    let drafts = JSON.parse(

        localStorage.getItem("productDrafts") || "[]"

    );

    const draft = JSON.parse(

        JSON.stringify(currentProduct)

    );

    const index = drafts.findIndex(item =>

        String(item.id) === String(draft.id)

    );

    if (index >= 0) {

        drafts[index] = draft;

    } else {

        drafts.push(draft);

    }

    localStorage.setItem(

        "productDrafts",

        JSON.stringify(drafts)

    );

    console.log(

        "Draft Saved",

        drafts

    );

}
/* =====================================================
   RENDER DRAFT LIST
===================================================== */

function renderDraftList() {

    const container =
        document.getElementById("draftProductList");

    if (!container) return;

    container.innerHTML = "";

    // Đọc Draft từ localStorage
    const drafts = JSON.parse(

        localStorage.getItem("productDrafts") || "[]"

    );

    if (!drafts.length) {

        container.innerHTML =
            "<div>Chưa có Draft</div>";

        return;

    }

    drafts.forEach(product => {

        container.innerHTML += `

            <button
                type="button"
                class="draft-item"
                onclick="loadProductDraft('${product.id}')">

                ${product.id}

            </button>

        `;

    });

}
/* =====================================================
   LOAD PRODUCT DRAFT
===================================================== */

function loadProductDraft(id) {

    const drafts = JSON.parse(

        localStorage.getItem("productDrafts") || "[]"

    );

    const draft = drafts.find(item =>

        String(item.id) === String(id)

    );

    if (!draft) return;

    // Clone dữ liệu
    window.currentProduct = JSON.parse(

        JSON.stringify(draft)

    );

    renderProductBasic();

}