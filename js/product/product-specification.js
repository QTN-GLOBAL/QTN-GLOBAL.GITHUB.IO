/* ==========================================
   PRODUCT SPECIFICATION
   STEP 4 / 6

   PURPOSE:

   - Hiển thị dữ liệu sản phẩm từ Step 3
   - Nhận dữ liệu từ FREE PARSER
   - Cho phép chỉnh sửa Product Name
   - Cho phép chỉnh sửa Description
   - Cho phép chỉnh sửa Technical Specification
   - Không sử dụng Features
   - Không sử dụng Applications
   - Không sử dụng Accessories

   DATA FLOW:

   STEP 3
      ↓
   FREE PARSER
      ↓
   currentProduct.product.specification
      ↓
   STEP 4
      ↓
   EDIT
      ↓
   currentProduct.product.specs
      ↓
   STEP 5
      ↓
   FINAL PRODUCT

   IMPORTANT:

   products.js hiện tại sử dụng:

   specs: [

       "HTML / TEXT"

   ]

   FREE PARSER trả về:

   specification: [

       {
           name: "...",
           value: "..."
       }

   ]

   Vì vậy Step 4 sẽ hỗ trợ cả hai dạng.
========================================== */


/* ==========================================
   RENDER STEP 4
========================================== */

function renderProductSpecification() {

    const body =
        document.getElementById(
            "productModalBody"
        );

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


    /* ======================================
       PREPARE DATA
    ====================================== */

    prepareSpecificationData();


    /* ======================================
       RENDER
    ====================================== */

    renderSpecificationContent();

}


/* ==========================================
   PREPARE SPECIFICATION DATA

   Mục đích:

   - Nhận dữ liệu từ Free Parser
   - Hỗ trợ specification
   - Hỗ trợ specs
   - Không tạo dữ liệu giả
========================================== */

function prepareSpecificationData() {

    if (!window.currentProduct) {

        return;

    }


    if (!window.currentProduct.product) {

        window.currentProduct.product = {};

    }


    const product =
        window.currentProduct.product;


    /* ======================================
       NẾU ĐÃ CÓ SPECIFICATION
       → GIỮ NGUYÊN
    ====================================== */

    if (

        Array.isArray(

            product.specification

        )

    ) {

        return;

    }


    /* ======================================
       NẾU CHỈ CÓ SPECS
       → CHUYỂN SANG EDITOR

       Chỉ áp dụng cho dữ liệu dạng
       string / HTML.
    ====================================== */

    if (

        Array.isArray(

            product.specs

        )

    ) {

        product.specification =

            product.specs.map(

                item => {

                    return {

                        name: "",

                        value:

                            item === null ||

                            item === undefined

                                ? ""

                                : String(item)

                    };

                }

            );


        return;

    }


    /* ======================================
       KHÔNG CÓ DỮ LIỆU
       → TẠO MẢNG RỖNG

       Không tạo dữ liệu giả.
    ====================================== */

    product.specification = [];

}


/* ==========================================
   RENDER CONTENT
========================================== */

function renderSpecificationContent() {

    const box =
        document.getElementById(
            "specificationContent"
        );

    if (!box) return;


    const product =
        window.currentProduct?.product;


    if (!product) {

        box.innerHTML = `

        <div class="import-status">

            Không có dữ liệu sản phẩm.

        </div>

        `;

        return;

    }


    box.innerHTML = `

        ${renderProductBasicEditor(product)}

        ${renderDescriptionEditor(product)}

        ${renderSpecificationEditor(product)}

    `;

}


/* ==========================================
   PRODUCT BASIC EDITOR

   Chỉ cho phép chỉnh sửa:

   - Product Name

   Không chỉnh sửa:

   - business
   - category
   - brand
   - origin
   - folder

   Các dữ liệu này được quản lý từ Step 1.
========================================== */

function renderProductBasicEditor(product) {

    return `

    <div class="ai-block">

        <h4>

            Product Information

        </h4>


        <div class="form-group">

            <label>

                Product Name

            </label>


            <input

                type="text"

                id="productName"

                class="form-control"

                value="${escapeSpecificationHTML(

                    product.name || ""

                )}"

            >

        </div>


        <div class="product-meta-info">

            <div>

                <strong>Business:</strong>

                ${escapeSpecificationHTML(

                    product.business || ""

                )}

            </div>


            <div>

                <strong>Category:</strong>

                ${escapeSpecificationHTML(

                    product.category || ""

                )}

            </div>


            <div>

                <strong>Brand:</strong>

                ${escapeSpecificationHTML(

                    product.brand || ""

                )}

            </div>


            <div>

                <strong>Origin:</strong>

                ${escapeSpecificationHTML(

                    product.origin || ""

                )}

            </div>

        </div>

    </div>

    `;

}


/* ==========================================
   DESCRIPTION EDITOR
========================================== */

function renderDescriptionEditor(product) {

    return `

    <div class="ai-block">

        <h4>

            Product Description

        </h4>


        <textarea

            id="productDescription"

            class="form-control"

            style="
                width:100%;
                min-height:180px;
                resize:vertical;
            "

        >${escapeSpecificationHTML(

            product.description || ""

        )}</textarea>

    </div>

    `;

}


/* ==========================================
   SPECIFICATION EDITOR
========================================== */

function renderSpecificationEditor(product) {

    const specifications =

        Array.isArray(

            product.specification

        )

            ? product.specification

            : [];


    let rows = "";


    specifications.forEach(

        (item, index) => {


            /* ==============================
               OBJECT FORMAT

               {
                   name: "...",
                   value: "..."
               }
            ============================== */

            if (

                item &&

                typeof item === "object" &&

                !Array.isArray(item)

            ) {

                rows += `

                <tr>

                    <td>

                        <input

                            type="text"

                            class="spec-name"

                            data-index="${index}"

                            value="${escapeSpecificationHTML(

                                item.name || ""

                            )}"

                        >

                    </td>


                    <td>

                        <textarea

                            class="spec-value"

                            data-index="${index}"

                            style="
                                width:100%;
                                min-height:60px;
                                resize:vertical;
                            "

                        >${escapeSpecificationHTML(

                            item.value || ""

                        )}</textarea>

                    </td>


                    <td>

                        <button

                            type="button"

                            onclick="removeSpecification(${index})"

                        >

                            ❌

                        </button>

                    </td>

                </tr>

                `;

                return;

            }


            /* ==============================
               STRING / HTML FORMAT

               Dùng cho dữ liệu tương thích
               với products.js
            ============================== */

            rows += `

            <tr>

                <td>

                    <input

                        type="text"

                        class="spec-name"

                        data-index="${index}"

                        value=""

                        placeholder="Tên thông số"

                    >

                </td>


                <td>

                    <textarea

                        class="spec-value"

                        data-index="${index}"

                        style="
                            width:100%;
                            min-height:80px;
                            resize:vertical;
                        "

                    >${escapeSpecificationHTML(

                        item === null ||

                        item === undefined

                            ? ""

                            : String(item)

                    )}</textarea>

                </td>


                <td>

                    <button

                        type="button"

                        onclick="removeSpecification(${index})"

                    >

                        ❌

                    </button>

                </td>

            </tr>

            `;

        }

    );


    return `

    <div class="ai-block">

        <h4>

            Technical Specification

        </h4>


        <p class="specification-help">

            Dữ liệu được lấy từ Website và Free Parser.

            Bạn có thể kiểm tra và chỉnh sửa trước khi

            chuyển sang bước Preview.

        </p>


        <table

            class="spec-table"

            style="width:100%;"

        >

            <thead>

                <tr>

                    <th>

                        Name

                    </th>


                    <th>

                        Value

                    </th>


                    <th>

                    </th>

                </tr>

            </thead>


            <tbody>

                ${rows}

            </tbody>

        </table>


        <br>


        <button

            type="button"

            onclick="addSpecification()"

        >

            + Add Specification

        </button>

    </div>

    `;

}


/* ==========================================
   ADD SPECIFICATION
========================================== */

function addSpecification() {

    if (!window.currentProduct) {

        return;

    }


    if (!window.currentProduct.product) {

        window.currentProduct.product = {};

    }


    if (

        !Array.isArray(

            window.currentProduct.product.specification

        )

    ) {

        window.currentProduct.product.specification = [];

    }


    window.currentProduct.product.specification.push({

        name: "",

        value: ""

    });


    renderSpecificationContent();

}


/* ==========================================
   REMOVE SPECIFICATION
========================================== */

function removeSpecification(index) {

    if (

        !window.currentProduct ||

        !window.currentProduct.product ||

        !Array.isArray(

            window.currentProduct.product.specification

        )

    ) {

        return;

    }


    window.currentProduct.product.specification.splice(

        index,

        1

    );


    renderSpecificationContent();


    scheduleSpecificationSave();

}


/* ==========================================
   SAVE STEP 4
========================================== */

function saveSpecificationStep() {

    if (!window.currentProduct) {

        return;

    }


    if (!window.currentProduct.product) {

        return;

    }


    const product =

        window.currentProduct.product;


    /* ======================================
       SAVE PRODUCT NAME
    ====================================== */

    const nameInput =

        document.getElementById(

            "productName"

        );


    if (nameInput) {

        product.name =

            nameInput.value.trim();

    }


    /* ======================================
       SAVE DESCRIPTION
    ====================================== */

    const description =

        document.getElementById(

            "productDescription"

        );


    if (description) {

        product.description =

            description.value.trim();

    }


    /* ======================================
       SAVE SPECIFICATION
    ====================================== */

    const names =

        document.querySelectorAll(

            ".spec-name"

        );


    const values =

        document.querySelectorAll(

            ".spec-value"

        );


    const specifications = [];


    names.forEach(

        (nameInput, index) => {

            const valueInput =

                values[index];


            const name =

                nameInput.value.trim();


            const value =

                valueInput

                    ? valueInput.value.trim()

                    : "";


            /* ==============================
               GIỮ OBJECT FORMAT
            ============================== */

            specifications.push({

                name,

                value

            });

        }

    );


    product.specification =

        specifications;


    /* ======================================
       SYNC → products.js FORMAT

       products.js:

       specs: [

           "text",

           "HTML",

           "text"

       ]

       Object specification sẽ được
       chuyển thành text:

       "Name: Value"

       Nếu value là HTML table,
       giữ nguyên HTML.
    ====================================== */

    product.specs =

        specifications.map(

            item => {

                const name =

                    item.name || "";


                const value =

                    item.value || "";


                if (

                    name &&

                    value

                ) {

                    return (

                        name +

                        ": " +

                        value

                    );

                }


                return value || name;

            }

        );


    /* ======================================
       NORMALIZE
    ====================================== */

    normalizeSpecification();


    return product;

}


/* ==========================================
   BACK
========================================== */

function backToContentImport() {

    /* ======================================
       SAVE CURRENT DATA
    ====================================== */

    saveSpecificationStep();


    /* ======================================
       SAVE DRAFT
    ====================================== */

    if (

        typeof saveProductDraft ===

        "function"

    ) {

        saveProductDraft();

    }


    /* ======================================
       BACK STEP 3
    ====================================== */

    renderProductContentImport();

}


/* ==========================================
   NEXT → PRODUCT PREVIEW
========================================== */

function nextProductPreview() {

    /* ======================================
       SAVE STEP 4
    ====================================== */

    const product =

        saveSpecificationStep();


    /* ======================================
       VALIDATE
    ====================================== */

    if (

        !validateSpecification()

    ) {

        return;

    }


    /* ======================================
       SAVE DRAFT
    ====================================== */

    if (

        typeof saveProductDraft ===

        "function"

    ) {

        saveProductDraft();

    }


    /* ======================================
       DEBUG
    ====================================== */

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

        "PRODUCT SPECS:"

    );


    console.log(

        window.currentProduct?.product?.specs

    );


    console.log(

        "====================================="

    );


    /* ======================================
       GO TO STEP 5
    ====================================== */

    renderProductPreview();

}


/* ==========================================
   AUTO SAVE
========================================== */

var specificationTimer = null;


function scheduleSpecificationSave() {

    clearTimeout(

        specificationTimer

    );


    specificationTimer =

        setTimeout(

            () => {


                saveSpecificationStep();


                if (

                    typeof saveProductDraft ===

                    "function"

                ) {

                    saveProductDraft();

                }


            },

            500

        );

}


/* ==========================================
   AUTO BIND INPUT

   Không dùng document.addEventListener
   nhiều lần.

   Dùng event delegation.
========================================== */

document.addEventListener(

    "input",

    function(event) {


        if (

            event.target.id ===

            "productName"

        ) {

            scheduleSpecificationSave();

            return;

        }


        if (

            event.target.id ===

            "productDescription"

        ) {

            scheduleSpecificationSave();

            return;

        }


        if (

            event.target.classList.contains(

                "spec-name"

            )

        ) {

            scheduleSpecificationSave();

            return;

        }


        if (

            event.target.classList.contains(

                "spec-value"

            )

        ) {

            scheduleSpecificationSave();

            return;

        }

    }

);


/* ==========================================
   NORMALIZE SPECIFICATION
========================================== */

function normalizeSpecification() {

    if (

        !window.currentProduct ||

        !window.currentProduct.product

    ) {

        return;

    }


    const product =

        window.currentProduct.product;


    if (

        !Array.isArray(

            product.specification

        )

    ) {

        return;

    }


    product.specification.forEach(

        item => {


            if (

                !item ||

                typeof item !== "object"

            ) {

                return;

            }


            if (item.name) {

                item.name =

                    item.name

                        .trim();

            }


            if (item.value) {

                item.value =

                    item.value

                        .trim();

            }

        }

    );


    /* ======================================
       UPDATE SPECS
    ====================================== */

    product.specs =

        product.specification.map(

            item => {

                const name =

                    item.name || "";


                const value =

                    item.value || "";


                if (

                    name &&

                    value

                ) {

                    return (

                        name +

                        ": " +

                        value

                    );

                }


                return value || name;

            }

        );

}


/* ==========================================
   VALIDATE
========================================== */

function validateSpecification() {

    if (

        !window.currentProduct ||

        !window.currentProduct.product

    ) {

        alert(

            "Không có dữ liệu sản phẩm."

        );

        return false;

    }


    const product =

        window.currentProduct.product;


    /* ======================================
       PRODUCT NAME
    ====================================== */

    if (

        !product.name ||

        !product.name.trim()

    ) {

        alert(

            "Product Name không được để trống."

        );

        return false;

    }


    /* ======================================
       SPECIFICATION
    ====================================== */

    const specifications =

        Array.isArray(

            product.specification

        )

            ? product.specification

            : [];


    for (

        const item of specifications

    ) {


        if (

            !item

        ) {

            continue;

        }


        if (

            !item.name &&

            !item.value

        ) {

            alert(

                "Specification không được để trống."

            );

            return false;

        }


        /*

           Nếu có Name thì phải có Value.

           Nếu chỉ có Value:

           Cho phép vì có thể là:

           - HTML table
           - đoạn mô tả kỹ thuật
           - text specification

        */


        if (

            item.name &&

            !item.value

        ) {

            alert(

                "Specification Value không được để trống."

            );

            return false;

        }

    }


    return true;

}


/* ==========================================
   ESCAPE HTML

   Dùng khi đưa dữ liệu parser vào HTML UI.

   Tránh phá giao diện nếu dữ liệu có:

   < > " '

   LƯU Ý:

   Khi dữ liệu là HTML table của products.js,
   textarea vẫn lưu nguyên HTML string.
========================================== */

function escapeSpecificationHTML(value) {

    const div =

        document.createElement(

            "div"

        );


    div.textContent =

        value === null ||

        value === undefined

            ? ""

            : String(value);


    return div.innerHTML;

}