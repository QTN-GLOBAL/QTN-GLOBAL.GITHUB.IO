/* =====================================================
   PRODUCT DRAFT
   SAVE / LOAD DRAFT
===================================================== */

function saveProductDraft() {

    if (!window.currentProduct) return;

    const drafts = JSON.parse(

        localStorage.getItem("productDrafts") || "[]"

    );

    const index = drafts.findIndex(

        item => String(item.id) === String(currentProduct.id)

    );

    const draft = {

        id: currentProduct.id,

        step: 1,

        updatedAt: new Date().toISOString(),

        data: JSON.parse(JSON.stringify(currentProduct))

    };

    if (index >= 0) {

        drafts[index] = draft;

    } else {

        drafts.push(draft);

    }

    localStorage.setItem(

        "productDrafts",

        JSON.stringify(drafts)

    );

    console.log("Draft Saved:", draft);

}