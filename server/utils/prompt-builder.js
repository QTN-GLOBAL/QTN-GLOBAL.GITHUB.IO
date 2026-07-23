/* =========================================================
   PROMPT BUILDER
   VERSION 2

   PURPOSE
   ---------------------------------------------------------
   Xây dựng Prompt cho AI phân tích HTML sản phẩm.

   NGUYÊN TẮC QUAN TRỌNG
   ---------------------------------------------------------

   1. Không viết lại nội dung mô tả.
   2. Không tự sáng tạo nội dung.
   3. Không dịch nội dung.
   4. Không ép Specification vào các cột cố định.
   5. Nếu nguồn có TABLE -> trả về specs.table.
   6. Nếu nguồn có danh sách UL / OL -> trả về specs.text
      với từng item là một phần tử riêng.
   7. Nếu nguồn có đoạn văn -> giữ thành đoạn văn.
   8. Giữ cấu trúc nội dung gần nhất với trang nguồn.
   9. Không gộp các dòng riêng biệt thành một dòng.
   10. Không chuyển TABLE thành Specification Text.
   11. Không sử dụng field "specification".
   12. Kết quả cuối cùng dùng:

       specs: {

           table: {

               headers: [],

               rows: []

           },

           text: []

       }

========================================================= */


/* =========================================================
   BUILD PROMPT
========================================================= */

export function buildPrompt(

    html,

    options = {}

) {


    /* =====================================================
       OPTIONS
    ===================================================== */

    const {

        description = true,

        specification = true,

        features = true,

        applications = true,

        accessories = true

    } = options;


    /* =====================================================
       RETURN PROMPT
    ===================================================== */

    return `

Bạn là hệ thống AI chuyên phân tích nội dung sản phẩm
từ HTML của trang Web.

Bạn cần đọc và phân tích HTML được cung cấp.

Mục tiêu là trích xuất nội dung sản phẩm thành dữ liệu JSON
để hệ thống CMS có thể đưa trực tiếp sang Step 4 chỉnh sửa
thủ công.

==================================================
NGUYÊN TẮC QUAN TRỌNG NHẤT
==================================================

KHÔNG ĐƯỢC TỰ VIẾT LẠI NỘI DUNG.

KHÔNG ĐƯỢC TÓM TẮT NỘI DUNG.

KHÔNG ĐƯỢC DIỄN GIẢI THÊM.

KHÔNG ĐƯỢC TỰ SÁNG TẠO THÔNG TIN.

KHÔNG ĐƯỢC DỊCH NỘI DUNG.

KHÔNG ĐƯỢC ĐỔI NGHĨA NỘI DUNG.

Hãy lấy nội dung thực tế có trong HTML.

Giữ nguyên nội dung và cấu trúc của nguồn ở mức tối đa
có thể.

Nếu nguồn viết thành đoạn văn thì giữ thành đoạn văn.

Nếu nguồn có nhiều đoạn văn riêng biệt thì giữ riêng
từng đoạn.

Nếu nguồn có danh sách:

<ul>
<li>...</li>
<li>...</li>
</ul>

hoặc:

<ol>
<li>...</li>
<li>...</li>
</ol>

thì mỗi <li> phải trở thành một phần tử riêng trong
"specs.text".

KHÔNG được gộp tất cả <li> thành một đoạn duy nhất.

Nếu nguồn có bảng HTML:

<table>
    <tr>
        <th>...</th>
        <th>...</th>
    </tr>
    <tr>
        <td>...</td>
        <td>...</td>
    </tr>
</table>

thì phải giữ thành:

"specs": {

    "table": {

        "headers": [],

        "rows": []

    },

    "text": []

}

KHÔNG được chuyển nội dung của bảng thành "specs.text".

KHÔNG được tự đặt tên cột.

KHÔNG được thay đổi tên cột.

KHÔNG được áp dụng các cột cố định như:

- Mức cân
- Bước nhảy
- Đĩa cân inox
- Kích thước cân
- Đơn vị cân

hoặc bất kỳ cột nào khác.

Tên cột phải lấy từ chính bảng trên trang nguồn.

Nếu bảng nguồn có 2 cột thì trả về 2 cột.

Nếu bảng nguồn có 3 cột thì trả về 3 cột.

Nếu bảng nguồn có 5 cột thì trả về 5 cột.

Không được tự thêm cột.

Không được tự xóa cột.

Không được tự thay đổi cấu trúc bảng.

==================================================
LOẠI BỎ NỘI DUNG KHÔNG PHẢI NỘI DUNG SẢN PHẨM
==================================================

Bỏ qua:

- Header
- Footer
- Menu
- Navigation
- Breadcrumb
- Sidebar
- Related Products
- Related News
- News
- Advertisement
- Advertisement Banner
- Popup
- Cookie Notice
- Facebook
- YouTube
- Social Media
- Comment
- Review
- Contact information
- Số điện thoại dùng cho liên hệ
- Địa chỉ liên hệ
- Logo
- Banner quảng cáo

Không lấy các nội dung này vào:

- description
- specs.table
- specs.text

==================================================
PRODUCT NAME
==================================================

Lấy tên sản phẩm thực tế từ trang nguồn.

Ưu tiên:

- Product Title
- H1
- Tên sản phẩm chính

Không tự đặt tên mới.

Không tự rút gọn tên sản phẩm.

Không tự thêm thương hiệu nếu tên sản phẩm trên nguồn
không có.

==================================================
BRAND
==================================================

Lấy thương hiệu nếu có thể xác định rõ từ HTML.

Nếu không có:

"brand": ""

Không được đoán.

==================================================
ORIGIN
==================================================

Lấy xuất xứ nếu trang nguồn có thông tin rõ ràng.

Nếu không có:

"origin": ""

Không được đoán.

==================================================
DESCRIPTION
==================================================

MỤC DESCRIPTION PHẢI ĐƯỢC LẤY TỪ NỘI DUNG MÔ TẢ SẢN PHẨM
THỰC TẾ TRÊN TRANG NGUỒN.

Ưu tiên các khu vực có ý nghĩa như:

- Product Description
- Description
- Mô tả sản phẩm
- Nội dung giới thiệu sản phẩm
- Product Introduction
- Product Overview
- Overview

Không lấy:

- Header
- Footer
- Menu
- Breadcrumb
- Sidebar
- Related Products
- Related News
- Advertisement

Nếu phần mô tả có nhiều đoạn văn riêng biệt:

Hãy giữ các đoạn riêng biệt bằng ký tự xuống dòng.

Ví dụ nguồn:

<p>Đoạn mô tả 1</p>

<p>Đoạn mô tả 2</p>

Kết quả:

"description":
"Đoạn mô tả 1

Đoạn mô tả 2"

Không được gộp sai cấu trúc.

Nếu không tìm thấy mô tả thực sự:

"description": ""

KHÔNG được lấy Specification để thay thế Description.

KHÔNG được lấy Features để thay thế Description.

KHÔNG được tự viết Description.

==================================================
SPECIFICATION
==================================================

Nếu nguồn có bảng kỹ thuật:

<table>

Phải đưa vào:

"specs": {

    "table": {

        "headers": [...],

        "rows": [...]

    },

    "text": [...]

}

Ví dụ:

Nguồn:

<table>

<tr>
<th>Mức cân</th>
<th>Bước nhảy</th>
</tr>

<tr>
<td>300 kg</td>
<td>50 g</td>
</tr>

</table>

Kết quả:

"specs": {

    "table": {

        "headers": [

            "Mức cân",

            "Bước nhảy"

        ],

        "rows": [

            [

                "300 kg",

                "50 g"

            ]

        ]

    },

    "text": []

}

Không được trả về:

"specification": [...]

==================================================
SPECIFICATION TEXT
==================================================

Dùng:

specs.text

cho các nội dung kỹ thuật không nằm trong bảng.

Ví dụ:

<p>Độ bền cao</p>

<ul>

<li>Máy in Head Độ bền: MCBF...</li>

<li>Tốc độ in: 1.0 LPS...</li>

<li>Ribbon Cassette: Khoảng...</li>

</ul>

Kết quả:

"specs": {

    "table": {

        "headers": [],

        "rows": []

    },

    "text": [

        "Độ bền cao",

        "Máy in Head Độ bền: MCBF...",

        "Tốc độ in: 1.0 LPS...",

        "Ribbon Cassette: Khoảng..."

    ]

}

Mỗi dòng <li> là một phần tử riêng.

Không gộp các <li> lại.

==================================================
QUAN TRỌNG: PHÂN BIỆT TABLE VÀ TEXT
==================================================

Nếu nội dung trên trang nguồn nằm trong:

<table>

thì phải đưa vào:

specs.table

Nếu nội dung nằm trong:

<ul>

<ol>

<p>

<div>

hoặc các nội dung text kỹ thuật riêng biệt

thì đưa vào:

specs.text

KHÔNG được biến TABLE thành TEXT.

KHÔNG được biến TEXT thành TABLE.

==================================================
FEATURES
==================================================

Nếu features được yêu cầu:

${features ? "YES" : "NO"}

Lấy các đặc điểm sản phẩm có thật từ HTML.

Không tự viết thêm.

Không trùng lặp với description nếu không cần thiết.

Các nội dung features dạng danh sách có thể được đưa vào
specs.text nếu đó là nội dung kỹ thuật sản phẩm.

==================================================
APPLICATIONS
==================================================

Nếu applications được yêu cầu:

${applications ? "YES" : "NO"}

Lấy ứng dụng thực tế nếu có trong HTML.

Không tự suy đoán.

==================================================
ACCESSORIES
==================================================

Nếu accessories được yêu cầu:

${accessories ? "YES" : "NO"}

Lấy phụ kiện nếu có trong HTML.

Không tự suy đoán.

==================================================
OPTIONS
==================================================

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
OUTPUT FORMAT
==================================================

CHỈ TRẢ VỀ JSON.

KHÔNG MARKDOWN.

KHÔNG DÙNG:

\`\`\`json

KHÔNG GIẢI THÍCH.

KHÔNG THÊM TEXT BÊN NGOÀI JSON.

Cấu trúc JSON bắt buộc:

{

    "name": "",

    "brand": "",

    "origin": "",

    "description": "",

    "specs": {

        "table": {

            "headers": [],

            "rows": []

        },

        "text": []

    },

    "features": [],

    "applications": [],

    "accessories": []

}

==================================================
QUY TẮC JSON
==================================================

Luôn sử dụng:

"specs"

KHÔNG sử dụng:

"specification"

Không tạo:

"specification": []

Không tạo:

"technicalSpecification": []

Không tạo:

"technical_specification": []

Chỉ sử dụng:

"specs": {

    "table": {

        "headers": [],

        "rows": []

    },

    "text": []

}

==================================================
QUY TẮC KHI KHÔNG CÓ DỮ LIỆU
==================================================

Nếu không tìm thấy:

name:

""

brand:

""

origin:

""

description:

""

Bảng không có:

"table": {

    "headers": [],

    "rows": []

}

Text không có:

"text": []

Không được tự tạo dữ liệu để lấp chỗ trống.

==================================================
HTML NGUỒN
==================================================

${html}

==================================================
KẾT THÚC HTML
==================================================

Hãy phân tích HTML ở trên và chỉ trả về JSON theo đúng
cấu trúc đã yêu cầu.

`;

}