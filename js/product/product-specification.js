/* ==========================================
   PRODUCT SPECIFICATION
   STEP 4 / 6
========================================== */

function renderProductSpecification() {

    const body =
        document.getElementById("productModalBody");

    if (!body) return;

    body.innerHTML = `

    <div class="product-specification">

        <h3 class="product-step-title">

            Step 4 / 6 - Product Specification

        </h3>

        <div id="specificationContent"></div>

        <div class="step-buttons">

            <button
                type="button"
                onclick="backToContentImport()">

                ← Back

            </button>

            <button
                type="button"
                onclick="nextProductPreview()">

                Next →

            </button>

        </div>

    </div>

    `;

    renderSpecificationContent();

}

/* ==========================================
   CONTENT
========================================== */

function renderSpecificationContent() {

    const box =
        document.getElementById("specificationContent");

    if (!box) return;

    const product =
        window.currentProduct?.product;

    if (!product) {

        box.innerHTML = `

        <div class="import-status">

            Không có dữ liệu AI.

        </div>

        `;

        return;

    }

   box.innerHTML = `

    ${renderDescriptionEditor(product)}

    ${renderSpecificationEditor(product)}

    ${renderEditableList({

        title:"Features",

        key:"features",

        button:"+ Add Feature"

    })}

    ${renderEditableList({

        title:"Applications",

        key:"applications",

        button:"+ Add Application"

    })}

    ${renderEditableList({

        title:"Accessories",

        key:"accessories",

        button:"+ Add Accessory"

    })}

`;

}
/* ==========================================
   DESCRIPTION EDITOR
========================================== */

function renderDescriptionEditor(product){

    return `

    <div class="ai-block">

        <h4>Description</h4>

        <textarea

            id="productDescription"

            class="form-control"

            style="width:100%;
                   min-height:180px;
                   resize:vertical;">

${product.description || ""}

        </textarea>

    </div>

    `;

}
/* ==========================================
   SPECIFICATION EDITOR
========================================== */

function renderSpecificationEditor(product){

    let rows = "";

    (product.specification || []).forEach((item,index)=>{

        rows += `

<tr>

    <td>

        <input

            class="spec-name"

            data-index="${index}"

            value="${item.name || ""}">

    </td>

    <td>

        <input

            class="spec-value"

            data-index="${index}"

            value="${item.value || ""}">

    </td>

    <td>

        <button

            type="button"

            onclick="removeSpecification(${index})">

            ❌

        </button>

    </td>

</tr>

`;

    });

    return `

<div class="ai-block">

    <h4>

        Technical Specification

    </h4>

    <table

        class="spec-table"

        style="width:100%;">

        <thead>

            <tr>

                <th>Name</th>

                <th>Value</th>

                <th></th>

            </tr>

        </thead>

        <tbody>

            ${rows}

        </tbody>

    </table>

    <br>

    <button

        type="button"

        onclick="addSpecification()">

        + Add Specification

    </button>

</div>

`;

}

/* ==========================================
   ADD SPECIFICATION
========================================== */

function addSpecification() {

    if (!currentProduct.product.specification) {

        currentProduct.product.specification = [];

    }

    currentProduct.product.specification.push({

        name: "",

        value: ""

    });

    renderSpecificationContent();

}

/* ==========================================
   REMOVE SPECIFICATION
========================================== */

function removeSpecification(index) {

    currentProduct.product.specification.splice(index,1);

    renderSpecificationContent();

}

/* ==========================================
   SAVE
========================================== */

function saveSpecificationStep() {

    if (!window.currentProduct) return;

    if (!window.currentProduct.product) return;

    const description =
        document.getElementById("productDescription");

    if (description) {

        currentProduct.product.description =
            description.value.trim();

    }

    document
        .querySelectorAll(".spec-name")
        .forEach(input=>{

            const i = input.dataset.index;

            currentProduct.product.specification[i].name =
                input.value;

        });

    document
        .querySelectorAll(".spec-value")
        .forEach(input=>{

            const i = input.dataset.index;

            currentProduct.product.specification[i].value =
                input.value;

        });
document
.querySelectorAll(".list-editor")
.forEach(input=>{

    const key=input.dataset.key;

    const index=input.dataset.index;

    currentProduct.product[key][index]=

        input.value.trim();

});

}

/* ==========================================
   BACK
========================================== */

function backToContentImport() {

    renderProductContentImport();

}

/* ==========================================
   NEXT → PRODUCT PREVIEW
========================================== */

function nextProductPreview() {

    /* ==========================
       SAVE STEP 4 DATA
    ========================== */

    saveSpecificationStep();


    /* ==========================
       SAVE DRAFT
    ========================== */

    if (typeof saveProductDraft === "function") {

        saveProductDraft();

    }


    /* ==========================
       DEBUG
    ========================== */

    console.log("");

    console.log(

        "========== STEP 4 → STEP 5 =========="

    );

    console.log(

        "PRODUCT DATA:"

    );

    console.log(

        window.currentProduct?.product

    );

    console.log(

        "====================================="

    );


    /* ==========================
       GO TO STEP 5
    ========================== */

    renderProductPreview();

}
/* ==========================================
   FEATURES / APPLICATIONS / ACCESSORIES
========================================== */

function renderEditableList(config){

    const product = currentProduct.product;

    if(!product[config.key]){

        product[config.key]=[];

    }

    let rows="";

    product[config.key].forEach((item,index)=>{

        rows += `

<tr>

    <td style="width:100%;">

        <input

            class="list-editor"

            data-key="${config.key}"

            data-index="${index}"

            value="${item}">

    </td>

    <td style="width:60px;">

        <button

            type="button"

            onclick="removeListItem('${config.key}',${index})">

            ❌

        </button>

    </td>

</tr>

`;

    });

    return `

<div class="ai-block">

    <h4>

        ${config.title}

    </h4>

    <table
        class="spec-table"
        style="width:100%;">

        <tbody>

            ${rows}

        </tbody>

    </table>

    <br>

    <button

        type="button"

        onclick="addListItem('${config.key}')">

        ${config.button}

    </button>

</div>

`;

}

/* ==========================================
   ADD LIST ITEM
========================================== */

function addListItem(key){

    if(!currentProduct.product[key]){

        currentProduct.product[key]=[];

    }

    currentProduct.product[key].push("");

    renderSpecificationContent();

}

/* ==========================================
   REMOVE LIST ITEM
========================================== */

function removeListItem(key,index){

    currentProduct.product[key].splice(index,1);

    renderSpecificationContent();

}
/* ==========================================
   AUTO SAVE
========================================== */

var specificationTimer = null;

function scheduleSpecificationSave(){

    clearTimeout(specificationTimer);

    specificationTimer = setTimeout(()=>{

        saveSpecificationStep();

        saveProductDraft();

    },500);

}
/* ==========================================
   AUTO BIND
========================================== */

document.addEventListener("input",(e)=>{

    if(

        e.target.classList.contains("spec-name") ||

        e.target.classList.contains("spec-value") ||

        e.target.classList.contains("list-editor") ||

        e.target.id==="productDescription"

    ){

        scheduleSpecificationSave();

    }

});
/* ==========================================
   NORMALIZE
========================================== */

function normalizeSpecification(){

    if(!currentProduct?.product?.specification) return;

    currentProduct.product.specification.forEach(item=>{

        if(item.name){

            item.name=item.name.trim();

        }

        if(item.value){

            item.value=item.value

                .replace(/\s+/g," ")

                .replace(/KG/g,"kg")

                .replace(/Kg/g,"kg")

                .replace(/G$/,"g")

                .trim();

        }

    });

}
/* ==========================================
   VALIDATE
========================================== */

function validateSpecification(){

    const specs=currentProduct.product.specification||[];

    for(let item of specs){

        if(

            !item.name ||

            !item.value

        ){

            alert(

                "Specification không được để trống."

            );

            return false;

        }

    }

    return true;

}
