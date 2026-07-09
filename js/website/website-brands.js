/* =====================================================
   WEBSITE
   BRANDS
===================================================== */

function renderWebsiteBrands() {

    const workspace =
        document.getElementById("websiteWorkspace");

    if (!workspace) return;

    workspace.innerHTML = `

        <div class="website-page">

            <div class="page-header">

                <h2>

                    Brand Manager

                </h2>

                <button
                    class="primary-btn"
                    id="addBrandBtn">

                    + Add Brand

                </button>

            </div>

            <div
                class="brand-list"
                id="brandList">

            </div>

        </div>

    `;

    renderBrandList();

}

/* =====================================================
   BRAND LIST
===================================================== */

function renderBrandList() {

    const container =
        document.getElementById("brandList");

    if (!container) return;

    container.innerHTML = "";

    Object.values(BRAND_CONFIG).forEach(brand => {

        container.innerHTML += `

            <div class="brand-card">

                <div class="brand-name">

                    ${brand.name}

                </div>

                <div class="brand-info">

                    ${brand.origin || ""}

                </div>

            </div>

        `;

    });

}