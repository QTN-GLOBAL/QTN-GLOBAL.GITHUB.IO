/* =====================================================
   WEBSITE MODULE
===================================================== */

function renderWebsite() {

   const content =
    document.getElementById("websiteWorkspace");
    if (!content) return;

    content.innerHTML = `

        <!-- =========================================
             WEBSITE HEADER
        ========================================== -->

        <div class="website-header">

            <h1>🌐 Website</h1>

            <p>

                Quản lý toàn bộ Website QTN GLOBAL.

            </p>

        </div>

        <!-- =========================================
             WEBSITE NAVIGATION
        ========================================== -->

        <div class="website-tabs">

            <div
                class="website-tab"
                data-page="products"
                onclick="openWebsitePage('products')">

                Products

            </div>

            <div
                class="website-tab"
                data-page="categories"
                onclick="openWebsitePage('categories')">

                Categories

            </div>

            <div
                class="website-tab"
                data-page="brands"
                onclick="openWebsitePage('brands')">

                Brands

            </div>

            <div
                class="website-tab">

                News

            </div>

            <div
                class="website-tab">

                Languages

            </div>

            <div
                class="website-tab">

                Banner

            </div>

            <div
                class="website-tab">

                Business

            </div>

            <div
                class="website-tab">

                SEO

            </div>

        </div>

        <!-- =========================================
             WEBSITE WORKSPACE
        ========================================== -->

        <div id="websiteWorkspace">

        </div>

    `;

    openWebsitePage("products");

}