/*****************************************************************
 * QTN GLOBAL CMS
 * Module : Step 1 - Basic Information
 * File   : step1-basic.js
 * PART 1 / 3
 *****************************************************************/

(function (window) {

    "use strict";

    const Step1 = {};

    //==========================================================
    // Elements
    //==========================================================

    Step1.elements = {};

    //==========================================================
    // Init
    //==========================================================

    Step1.init = function () {

        Step1.elements = {

            name: document.querySelector("#productName"),

            model: document.querySelector("#productModel"),

            brand: document.querySelector("#productBrand"),

            category: document.querySelector("#productCategory"),

            origin: document.querySelector("#productOrigin"),

            business: document.querySelector("#productBusiness"),

            description: document.querySelector("#productDescription"),

            folder: document.querySelector("#productFolder"),

            slug: document.querySelector("#productSlug")

        };

        Step1.bind();

    };

    //==========================================================
    // Bind Event
    //==========================================================

    Step1.bind = function () {

        Object.values(Step1.elements).forEach(function (el) {

            if (!el) return;

            el.removeEventListener("input", Step1.save);
            el.removeEventListener("change", Step1.save);

            el.addEventListener("input", Step1.save);

            el.addEventListener("change", Step1.save);

        });

    };

    //==========================================================
    // Template
    //==========================================================

    Step1.template = function () {

        return `
<div class="wizard-step">

    <h2>Thông tin cơ bản</h2>

    <div class="form-grid">

        <div class="form-group">
            <label>Tên sản phẩm</label>
            <input id="productName" type="text">
        </div>

        <div class="form-group">
            <label>Model</label>
            <input id="productModel" type="text">
        </div>

        <div class="form-group">
            <label>Hãng</label>
            <input id="productBrand" type="text">
        </div>

        <div class="form-group">
            <label>Danh mục</label>
            <input id="productCategory" type="text">
        </div>

        <div class="form-group">
            <label>Xuất xứ</label>
            <input id="productOrigin" type="text">
        </div>

        <div class="form-group">
            <label>Business</label>
            <input id="productBusiness" type="text">
        </div>

        <div class="form-group">
            <label>Folder</label>
            <input id="productFolder" type="text">
        </div>

        <div class="form-group">
            <label>Slug</label>
            <input id="productSlug" type="text">
        </div>

    </div>

    <div class="form-group">

        <label>Mô tả</label>

        <textarea
            id="productDescription"
            rows="6"></textarea>

    </div>

</div>
`;

    };
    //==========================================================
    // Render
    //==========================================================

    Step1.render = function (container) {

        if (container) {

            container.innerHTML = Step1.template();

            Step1.init();

        }

        const d = ProductSession.get();

        if (!d || !d.basic)
            return;

        const set = function (el, value) {

            if (el)
                el.value = value || "";

        };

        set(Step1.elements.name, d.basic.name);

        set(Step1.elements.model, d.basic.model);

        set(Step1.elements.brand, d.basic.brand);

        set(Step1.elements.category, d.basic.category);

        set(Step1.elements.origin, d.basic.origin);

        set(
            Step1.elements.business,
            d.system.business
        );

        set(
            Step1.elements.description,
            d.basic.description
        );

        set(
            Step1.elements.folder,
            d.basic.folder
        );

        set(
            Step1.elements.slug,
            d.basic.slug
        );

    };

    //==========================================================
    // Save
    //==========================================================

    Step1.save = function () {

        const d = ProductSession.get();

        d.basic.name =
            Step1.elements.name?.value || "";

        d.basic.model =
            Step1.elements.model?.value || "";

        d.basic.brand =
            Step1.elements.brand?.value || "";

        d.basic.category =
            Step1.elements.category?.value || "";

        d.basic.origin =
            Step1.elements.origin?.value || "";

        d.system.business =
            Step1.elements.business?.value || "";

        d.basic.description =
            Step1.elements.description?.value || "";

        d.basic.folder =
            Step1.elements.folder?.value || "";

        d.basic.slug =
            Step1.elements.slug?.value || "";

        ProductSession.touch();

        document.dispatchEvent(

            new CustomEvent(

                "product:basicChanged",

                {

                    detail: d

                }

            )

        );

    };
    //==========================================================
    // Events
    //==========================================================

    document.addEventListener(

        "product:imported",

        function () {

            Step1.render();

        }

    );

    document.addEventListener(

        "wizard:change",

        function (e) {

            if (

                e.detail &&

                Number(e.detail.step) === 1

            ) {

                Step1.render();

            }

        }

    );

    //==========================================================
    // Ready
    //==========================================================

    document.addEventListener(

        "DOMContentLoaded",

        function () {

            Step1.init();

            Step1.render();

        }

    );

    //==========================================================
    // Export
    //==========================================================

    window.Step1 = Step1;

})(window);

/*****************************************************************
 * END OF FILE
 *****************************************************************/