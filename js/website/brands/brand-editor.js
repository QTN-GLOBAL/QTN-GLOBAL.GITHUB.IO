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

            <div class="brand-editor-info">

                <p>

                    <strong>Brand:</strong>

                    ${currentBrand.name}

                </p>

                <p>

                    <strong>Origin:</strong>

                    ${currentBrand.origin}

                </p>

            </div>

        `,

        footer:`

            <button
                class="primary-btn">

                Save

            </button>

        `,

        onClose:"closeBrandEditor()"

    });

}