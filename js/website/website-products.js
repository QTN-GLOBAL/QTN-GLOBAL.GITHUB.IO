/* =====================================================
   WEBSITE PRODUCTS
===================================================== */

function renderWebsiteProducts(){

    const workspace =
        document.getElementById("websiteWorkspace");

    if(!workspace) return;

    workspace.innerHTML = `
    

        <!-- =========================================
             PRODUCTS HEADER
        ========================================== -->

        <div class="products-header">

            <h2>📦 Products</h2>

            <button class="btn-primary">

                + Add Product

            </button>

        </div>

        <!-- =========================================
             PRODUCTS TOOLBAR
        ========================================== -->

        <div class="products-toolbar">

            <input
                type="text"
                placeholder="Search products...">

            <select>

                <option>All Categories</option>

            </select>

            <select>

                <option>All Brands</option>

            </select>

        </div>
        <!-- =========================================
             PRODUCT FORM
        ========================================== -->

        <div id="productFormContainer"></div>


        <!-- =========================================
             PRODUCTS TABLE
        ========================================== -->

        <table class="products-table">

            <thead>

                <tr>

                    <th>ID</th>

                    <th>Image</th>

                    <th>Product</th>

                    <th>Brand</th>

                    <th>Category</th>

                    <th>Status</th>

                    <th>Action</th>

                </tr>

            </thead>

            <tbody>

                <tr>

                    <td colspan="7">

                        Chưa có dữ liệu sản phẩm.

                    </td>

                </tr>

            </tbody>

        </table>

    `;
bindProductEvents();
}