/* =====================================================
   WEBSITE MODULE
===================================================== */

function renderWebsite() {

    const content = document.getElementById("dashboardContent");

    if (!content) return;

    content.innerHTML = `
    openWebsitePage("products");

        <!-- =========================================
             HEADER
        ========================================== -->

        <div class="website-header">

            <h1>🌐 Website</h1>

            <p>

                Quản lý toàn bộ Website QTN GLOBAL.

            </p>

        </div>

        <!-- =========================================
             WEBSITE TABS
        ========================================== -->

        <div class="website-tabs">

            <div
    class="website-tab active"
    onclick="openWebsitePage('products')">

    Products

</div>

            <div class="website-tab">

                Categories

            </div>

            <div class="website-tab">

                Brands

            </div>

            <div class="website-tab">

                News

            </div>

            <div class="website-tab">

                Languages

            </div>

            <div class="website-tab">

                Banner

            </div>

            <div class="website-tab">

                Business

            </div>

            <div class="website-tab">

                SEO

            </div>

        </div>

        <!-- =========================================
             CONTENT
        ========================================== -->

        <div class="website-content">

            <h2>Products</h2>

            <p>

                Đây sẽ là nơi hiển thị nội dung quản lý Products.

            </p>

        </div>

    `;

}