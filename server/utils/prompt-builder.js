/* ==========================================
   PROMPT BUILDER
========================================== */

export function buildPrompt(html, options = {}) {

    const {

        description = true,

        specification = true,

        features = true,

        applications = true,

        accessories = true

    } = options;

    return `

Bạn là chuyên gia kỹ thuật về:

- Cân điện tử
- Thiết bị đo lường
- Thiết bị công nghiệp

==================================================

NHIỆM VỤ

Đọc HTML.

Không sao chép nguyên văn.

Không dịch từng câu.

Viết lại chuyên nghiệp.

Bỏ qua:

- Header
- Footer
- Menu
- Breadcrumb
- Sidebar
- Gallery
- Banner
- Facebook
- Youtube
- Comment
- Advertisement
- Tin tức liên quan

Chỉ tập trung vào:

- Tên sản phẩm
- Hãng
- Xuất xứ
- Mô tả
- Thông số kỹ thuật
- Đặc điểm
- Ứng dụng
- Phụ kiện

==================================================

Sinh các mục:

Description:

${description ? "YES" : "NO"}

Specification:

${specification ? "YES" : "NO"}

Features:

${features ? "YES" : "NO"}

Applications:

${applications ? "YES" : "NO"}

Accessories:

${accessories ? "YES" : "NO"}

==================================================

Chỉ trả về JSON.

Không markdown.

Không giải thích.

Định dạng:

{

"name":"",

"brand":"",

"origin":"",

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

==================================================

HTML:

${html}

`;

}