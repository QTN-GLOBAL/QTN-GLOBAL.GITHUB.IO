/* =====================================================
   PRODUCT MODAL
===================================================== */

function createProductModal() {

    if (document.getElementById("productModal")) return;

    document.body.insertAdjacentHTML("beforeend", `

        <div id="productModal" class="product-modal">

            <div class="product-modal-card">

                <div class="product-modal-header">

                    <h2>📦 Add Product</h2>

                    <button
                        class="product-modal-close"
                        onclick="closeProductModal()">

                        ×

                    </button>

                </div>

                <div
                    id="productModalBody"
                    class="product-modal-body">

                    Đang khởi tạo Product Engine...

                </div>

                <div class="product-modal-footer">

                    <button
                        onclick="closeProductModal()">

                        Cancel

                    </button>

                    <button>

                        Next →

                    </button>

                </div>

            </div>

        </div>

    `);

}

/* =====================================================
   OPEN
===================================================== */

function openProductModal(){

    createProductModal();

renderProductBasicForm();

document
    .getElementById("productModal")
    .classList
    .add("show");

}

/* =====================================================
   CLOSE
===================================================== */

function closeProductModal(){

    document
        .getElementById("productModal")
        .classList
        .remove("show");

}