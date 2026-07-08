/* =====================================================
   PRODUCT MANAGER
===================================================== */

function bindProductEvents() {

    const addBtn = document.querySelector(".btn-primary");

    if (!addBtn) return;

    addBtn.addEventListener("click", openProductModal);

}

function showAddProductForm() {

    const container =
        document.getElementById("productFormContainer");

    if (!container) return;

    container.innerHTML = `

        <div class="product-form-card">

            <div class="product-form-header">

                <h3>Add New Product</h3>

                <button
                    class="btn-cancel"
                    onclick="hideAddProductForm()">

                    Cancel

                </button>

            </div>

            <div class="product-form-body">

                Form sẽ được xây ở bước tiếp theo...

            </div>

        </div>

    `;

}

function hideAddProductForm() {

    const container =
        document.getElementById("productFormContainer");

    if (!container) return;

    container.innerHTML = "";

}