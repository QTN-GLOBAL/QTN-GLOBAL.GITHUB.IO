/* ==========================================
   PRODUCT PARSER SERVICE
   VERSION 1

   NHIỆM VỤ:
   - Đọc HTML đã được clean
   - Không dùng OpenAI
   - Không tốn API
   - Lấy dữ liệu sản phẩm trực tiếp từ HTML
========================================== */

import * as cheerio from "cheerio";


/* ==========================================
   PARSE PRODUCT FROM HTML
========================================== */

export function parseProductFromHtml(

    html = "",

    options = {}

) {

    console.log("");

    console.log(
        "========== FREE PRODUCT PARSER =========="
    );


    /* ==========================================
       CHECK HTML
    ========================================== */

    if (!html) {

        console.log(
            "HTML EMPTY"
        );

        return {

            name: "",

            brand: "",

            origin: "",

            description: "",

            specification: [],

            features: [],

            applications: [],

            accessories: [],

            images: []

        };

    }


    /* ==========================================
       LOAD HTML
    ========================================== */

    const $ = cheerio.load(

        html,

        {

            decodeEntities: true

        }

    );


    /* ==========================================
       RESULT
    ========================================== */

    const product = {

        name: "",

        brand: "",

        origin: "",

        description: "",

        specification: [],

        features: [],

        applications: [],

        accessories: [],

        images: []

    };


    /* ==========================================
       HELPER
    ========================================== */

    function cleanText(text) {

        return String(text || "")

            .replace(/\s+/g, " ")

            .trim();

    }


    /* ==========================================
       FIND FIRST TEXT
    ========================================== */

    function findFirstText(

        selectors = []

    ) {

        for (

            const selector of selectors

        ) {

            const element = $(selector)

                .first();


            if (

                element.length

            ) {

                const text = cleanText(

                    element.text()

                );


                if (text) {

                    return text;

                }

            }

        }


        return "";

    }


    /* ==========================================
       PRODUCT NAME
    ========================================== */

    product.name =

        findFirstText([

            "h1",

            ".product-title",

            ".product-name",

            ".entry-title",

            ".title"

        ]);


    console.log(

        "PRODUCT NAME:",

        product.name

    );


    /* ==========================================
       BRAND
    ========================================== */

    product.brand =

        findFirstText([

            ".product-brand",

            ".brand",

            "[class*='brand']"

        ]);


    /* ==========================================
       ORIGIN
    ========================================== */

    product.origin =

        findFirstText([

            ".product-origin",

            ".origin",

            "[class*='origin']"

        ]);


    /* ==========================================
       DESCRIPTION
    ========================================== */

    const descriptionSelectors = [

        ".product-description",

        ".product-detail-description",

        ".product-content",

        ".product-contents",

        ".entry-content",

        ".description"

    ];


    for (

        const selector of

        descriptionSelectors

    ) {

        const element =

            $(selector).first();


        if (

            element.length

        ) {

            const text = cleanText(

                element.text()

            );


            if (

                text.length > 30

            ) {

                product.description =

                    text;

                break;

            }

        }

    }


    console.log(

        "DESCRIPTION LENGTH:",

        product.description.length

    );


    /* ==========================================
       SPECIFICATION
       TABLE
    ========================================== */

    $("table").each(

        function () {

            const rows = $(this)

                .find("tr");


            rows.each(

                function () {

                    const cells = $(this)

                        .find("th, td");


                    if (

                        cells.length >= 2

                    ) {

                        const name =

                            cleanText(

                                $(cells[0])

                                    .text()

                            );


                        const value =

                            cleanText(

                                $(cells[1])

                                    .text()

                            );


                        if (

                            name &&

                            value &&

                            name.length < 150 &&

                            value.length < 500

                        ) {

                            product.specification

                                .push({

                                    name,

                                    value

                                });

                        }

                    }

                }

            );

        }

    );


    /* ==========================================
       REMOVE DUPLICATE SPECIFICATION
    ========================================== */

    product.specification =

        product.specification.filter(

            (

                item,

                index,

                array

            ) =>

                index ===

                array.findIndex(

                    other =>

                        other.name ===

                            item.name &&

                        other.value ===

                            item.value

                )

        );


    console.log(

        "SPECIFICATION COUNT:",

        product.specification.length

    );


    /* ==========================================
       FIND LIST BY HEADING
    ========================================== */

    function findListByHeading(

        keywords = []

    ) {

        let result = [];


        $("h1, h2, h3, h4, h5, strong, b")

            .each(

                function () {

                    const heading =

                        cleanText(

                            $(this).text()

                        ).toLowerCase();


                    const matched =

                        keywords.some(

                            keyword =>

                                heading.includes(

                                    keyword

                                )

                        );


                    if (!matched) {

                        return;

                    }


                    const container =

                        $(this)

                            .parent();


                    container

                        .find("li")

                        .each(

                            function () {

                                const text =

                                    cleanText(

                                        $(this)

                                            .text()

                                    );


                                if (

                                    text &&

                                    !result.includes(

                                        text

                                    )

                                ) {

                                    result.push(

                                        text

                                    );

                                }

                            }

                        );

                }

            );


        return result;

    }


    /* ==========================================
       FEATURES
    ========================================== */

    product.features =

        findListByHeading([

            "feature",

            "tính năng",

            "đặc điểm",

            "ưu điểm",

            "features"

        ]);


    /* ==========================================
       APPLICATIONS
    ========================================== */

    product.applications =

        findListByHeading([

            "application",

            "ứng dụng",

            "applications"

        ]);


    /* ==========================================
       ACCESSORIES
    ========================================== */

    product.accessories =

        findListByHeading([

            "accessor",

            "phụ kiện",

            "accessories"

        ]);


    /* ==========================================
       IMAGES
    ========================================== */

    $("img").each(

        function () {

            const src =

                $(this).attr("src") ||

                $(this).attr("data-src") ||

                $(this).attr(

                    "data-original"

                );


            if (

                src &&

                !product.images.includes(

                    src

                )

            ) {

                product.images.push(

                    src

                );

            }

        }

    );


    /* ==========================================
       OPTIONS
    ========================================== */

    if (

        options.description === false

    ) {

        product.description = "";

    }


    if (

        options.specification === false

    ) {

        product.specification = [];

    }


    if (

        options.features === false

    ) {

        product.features = [];

    }


    if (

        options.applications === false

    ) {

        product.applications = [];

    }


    if (

        options.accessories === false

    ) {

        product.accessories = [];

    }


    if (

        options.images === false

    ) {

        product.images = [];

    }


    /* ==========================================
       FINAL RESULT
    ========================================== */

    console.log("");

    console.log(

        "========== PARSER RESULT =========="

    );

    console.log(

        product

    );

    console.log(

        "===================================="

    );


    return product;

}