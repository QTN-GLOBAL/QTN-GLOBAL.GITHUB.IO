/* =====================================================
   PRODUCT FORM
===================================================== */

function renderProductBasicForm(){

    const body =
        document.getElementById("productModalBody");

    if(!body) return;

    body.innerHTML = `

        <div class="product-form">

            <h3>Basic Information</h3>

            <div class="form-group">

                <label>Business</label>

                <select id="productBusiness">

                </select>

            </div>

            <div class="form-group">

                <label>Category</label>

                <select id="productCategory">

                </select>

            </div>

            <div class="form-group">

                <label>Brand</label>

                <select id="productBrand">

                </select>

            </div>

            <div class="form-group">

                <label>Folder</label>

                <input
                    id="productFolder"
                    type="text">

            </div>

            <div class="form-group">

                <label>Product ID</label>

                <input
                    id="productId"
                    type="number">

            </div>

        </div>

    `;

}