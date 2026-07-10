/* =====================================================
   BRAND EDITOR
===================================================== */

let currentBrand = null;

/* =====================================================
   OPEN
===================================================== */

function openBrandEditor(brandName){

    currentBrand = Object.values(BRAND_CONFIG).find(item =>

        item.name === brandName

    );

    if(!currentBrand){

        return;

    }

    renderBrandEditor();

}

/* =====================================================
   CLOSE
===================================================== */

function closeBrandEditor(){

    const container =
        document.getElementById("brandEditorContainer");

    if(container){

        container.innerHTML = "";

    }

}

/* =====================================================
   RENDER
===================================================== */

function renderBrandEditor(){

    const container =
        document.getElementById("brandEditorContainer");

    if(!container) return;

    container.innerHTML = renderEditorLayout({

        title:"🏷 Brand Editor",

        description:"Quản lý thông tin thương hiệu.",

        body:`

            <div class="brand-form">

                <div class="form-group">

                    <label>

                        Brand Name

                    </label>

                    <input
                        id="brandName"
                        type="text"
                        value="${currentBrand.name}">

                </div>

                <div class="form-group">

                    <label>

                        Origin

                    </label>

                    <input
                        id="brandOrigin"
                        type="text"
                        value="${currentBrand.origin || ""}">

                </div>
<div class="form-group">

    <label>

        Status

    </label>

    <label class="switch-item">

        <input
            id="brandActive"
            type="checkbox"
            ${currentBrand.active ? "checked" : ""}>

        <span>

            Active

        </span>

    </label>

</div>

                <div class="form-group">

    <label>

        Categories

    </label>

    ${renderCheckboxGroup({

        items: getCategories(

            currentBrand.business
                ? currentBrand.business[0]
                : "measure"

        ),

        selected: currentBrand.categories,

        idField: "id",

        labelField: "name",

        name: "brandCategories"

    })}

</div>

                <div class="form-group">

                    <label>

                        Products

                    </label>

                    <div>

                        ${
                            (window.products || []).filter(item =>

                                item.brand &&
                                item.brand.toLowerCase() ===
                                currentBrand.name.toLowerCase()

                            ).length
                        } Products

                    </div>

                </div>

            </div>

        `,

        footer:`

            <button
                class="secondary-btn"
                onclick="closeBrandEditor()">

                Cancel

            </button>

            <button
                class="primary-btn"
                onclick="saveBrand()">

                Save

            </button>

        `,

        onClose:"closeBrandEditor()"

    });

}
/* =====================================================
   SAVE
===================================================== */

function saveBrand(){

    currentBrand.name =
        document.getElementById("brandName").value;

    currentBrand.origin =
        document.getElementById("brandOrigin").value;
currentBrand.active =
    document.getElementById("brandActive").checked;
   currentBrand.categories =
    getCheckboxGroupValues("brandCategories");

    renderBrandList();

    closeBrandEditor();

}