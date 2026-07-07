/* =====================================================
   WEBSITE MODULE
===================================================== */

function renderWebsite() {

    const content = document.getElementById("dashboardContent");

    if (!content) return;

    content.innerHTML = `

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

       <div class="website-tab"
     data-page="products"
     onclick="openWebsitePage('products')">

    Products

</div>

<div class="website-tab"
     data-page="categories"
     onclick="openWebsitePage('categories')">

    Categories

</div>

<div class="website-tab"
     data-page="brands"
     onclick="openWebsitePage('brands')">

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

        <div id="websiteWorkspace">

        </div>

    `;

    // Mở tab Products mặc định
    openWebsitePage("products");

}