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

                    <div class="product-modal-header-actions">

                        <!-- FULLSCREEN -->

                        <button
                            type="button"
                            class="product-modal-fullscreen"
                            onclick="toggleProductModalFullscreen()"
                            title="Phóng to / Thu nhỏ">

                            ⛶

                        </button>


                        <!-- CLOSE -->

                        <button
                            type="button"
                            class="product-modal-close"
                            onclick="closeProductModal()"
                            title="Đóng">

                            ×

                        </button>

                    </div>

                </div>


                <!-- PRODUCT MODAL BODY -->

                <div
                    id="productModalBody"
                    class="product-modal-body">

                    Đang khởi tạo Product Engine...

                </div>

            </div>

        </div>

    `);

}


/* =====================================================
   OPEN
===================================================== */

function openProductModal() {

    createProductModal();

    const modal =
        document.getElementById("productModal");

    if (!modal) return;

    /*
        Khi mở Product Modal,
        luôn bắt đầu ở chế độ bình thường.
    */

    const card =
        modal.querySelector(".product-modal-card");

    if (card) {

        card.classList.remove(
            "product-modal-fullscreen-active"
        );

    }

    renderProductBasicForm();

    modal.classList.add("show");

}


/* =====================================================
   TOGGLE FULLSCREEN
===================================================== */

function toggleProductModalFullscreen() {

    const modal =
        document.getElementById("productModal");

    if (!modal) return;

    const card =
        modal.querySelector(".product-modal-card");

    if (!card) return;

    card.classList.toggle(
        "product-modal-fullscreen-active"
    );

    /*
        Đổi icon để người dùng biết
        đang ở chế độ nào.
    */

    const button =
        modal.querySelector(
            ".product-modal-fullscreen"
        );

    if (!button) return;

    const isFullscreen =
        card.classList.contains(
            "product-modal-fullscreen-active"
        );

    if (isFullscreen) {

        button.innerHTML = "⛶";

        button.title =
            "Thu nhỏ Product Modal";

    } else {

        button.innerHTML = "⛶";

        button.title =
            "Phóng to Product Modal";

    }

}


/* =====================================================
   CLOSE
===================================================== */

function closeProductModal() {

    const modal =
        document.getElementById("productModal");

    if (!modal) return;

    modal.classList.remove("show");

}