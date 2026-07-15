/* =====================================================
   SAVE PRODUCT DRAFT
===================================================== */

function saveProductDraft() {

    if (!window.currentProduct) return;

    // Không lưu nếu chưa có ID
    if (!currentProduct.id) return;

    // Tìm Draft đã tồn tại
    const index = window.productDrafts.findIndex(item =>

        String(item.id) === String(currentProduct.id)

    );

    // Clone dữ liệu tránh tham chiếu
    const draft = JSON.parse(

        JSON.stringify(currentProduct)

    );

    if (index >= 0) {

        window.productDrafts[index] = draft;

    } else {

        window.productDrafts.push(draft);

    }

    console.log(

        "Draft Saved:",

        window.productDrafts

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

    if (!window.productDrafts.length) {

        container.innerHTML =
            "<div>Chưa có Draft</div>";

        return;

    }

    window.productDrafts.forEach(product => {

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

    const draft = window.productDrafts.find(item =>

        String(item.id) === String(id)

    );

    if (!draft) return;

    // Clone dữ liệu
    window.currentProduct = JSON.parse(

        JSON.stringify(draft)

    );

    renderProductBasic();

}