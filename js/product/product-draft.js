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