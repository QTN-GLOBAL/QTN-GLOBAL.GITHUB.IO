/* =====================================================
   PRODUCT PROMPT BUILDER
   - Build AI Prompt
===================================================== */

window.ProductPromptBuilder = {

    /* ==========================================
       BUILD PROMPT
    ========================================== */

    build(cleanHtml, options = {}) {

        const product = window.currentProduct || {};

        return [

            this.systemPrompt(),

            this.productContext(product),

            this.importRule(options),

            this.htmlSection(cleanHtml),

            this.outputRule()

        ].join("\n\n");

    },

    /* ==========================================
       SYSTEM
    ========================================== */

    systemPrompt() {

        return `

Bạn là chuyên gia viết nội dung sản phẩm.

Bạn chuyên xử lý:

- Cân điện tử
- Thiết bị đo lường
- Thiết bị công nghiệp

Nhiệm vụ của bạn:

Đọc HTML.

Hiểu nội dung.

Không được sao chép nguyên văn.

Viết lại chuyên nghiệp.

`;

    },

    /* ==========================================
       PRODUCT INFO
    ========================================== */

    productContext(product) {

        return `

Thông tin sản phẩm

Business:
${product.business || ""}

Category:
${product.category || ""}

Brand:
${product.brand || ""}

Origin:
${product.origin || ""}

Product Name:
${product.name || ""}

`;

    },

    /* ==========================================
       IMPORT OPTION
    ========================================== */

    importRule(options) {

        return `

Hãy tạo các mục sau:

Description:
${options.description ? "YES" : "NO"}

Specification:
${options.specification ? "YES" : "NO"}

Features:
${options.features ? "YES" : "NO"}

Applications:
${options.applications ? "YES" : "NO"}

Accessories:
${options.accessories ? "YES" : "NO"}

`;

    },

    /* ==========================================
       HTML
    ========================================== */

    htmlSection(cleanHtml) {

        return `

HTML:

${cleanHtml}

`;

    },

    /* ==========================================
       OUTPUT
    ========================================== */

    outputRule() {

        return `

Chỉ trả về JSON.

Không giải thích.

Không markdown.

Định dạng:

{

"description":"",

"specification":[

{

"name":"",

"value":""

}

],

"features":[

""

],

"applications":[

""

],

"accessories":[

""

]

}

`;

    }

};