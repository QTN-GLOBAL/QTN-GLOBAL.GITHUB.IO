/* ==========================================
   PRODUCT PARSER SERVICE
   VERSION 2

   MỤC TIÊU:
   - Không dùng OpenAI
   - Không tốn API
   - Lấy dữ liệu thật từ HTML
   - Lọc nội dung sản phẩm
   - Tách Description
   - Tách Specification
   - Tách Features
   - Tách Applications
   - Tách Accessories
   - Lấy Images
========================================== */

import * as cheerio from "cheerio";


/* ==========================================
   MAIN PARSER
========================================== */

export function parseProductFromHtml(

    html = "",

    options = {}

) {

    console.log("");

    console.log(
        "========== FREE PRODUCT PARSER V2 =========="
    );


    /* ==========================================
       CHECK HTML
    ========================================== */

    if (!html) {

        console.log(
            "HTML EMPTY"
        );

        return createEmptyProduct();

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

    const product =

        createEmptyProduct();


    /* ==========================================
       HELPER:
       CLEAN TEXT
    ========================================== */

    function cleanText(

        text

    ) {

        return String(

            text || ""

        )

            .replace(/\u00a0/g, " ")

            .replace(/\s+/g, " ")

            .trim();

    }


    /* ==========================================
       HELPER:
       REMOVE DUPLICATES
    ========================================== */

    function uniqueArray(

        array

    ) {

        return [

            ...new Set(

                array

                    .map(

                        item =>

                            cleanText(item)

                    )

                    .filter(Boolean)

            )

        ];

    }


    /* ==========================================
       HELPER:
       FIND FIRST TEXT
    ========================================== */

    function findFirstText(

        selectors = []

    ) {

        for (

            const selector of selectors

        ) {

            const element =

                $(selector)

                    .first();


            if (

                element.length

            ) {

                const text =

                    cleanText(

                        element.text()

                    );


                if (

                    text

                ) {

                    return text;

                }

            }

        }


        return "";

    }


    /* ==========================================
       STEP 1
       PRODUCT NAME
    ========================================== */

    product.name =

        findFirstText([

            "h1.product-title",

            "h1.product-name",

            ".product-detail h1",

            ".product-info h1",

            ".product-content h1",

            "h1"

        ]);


    console.log("");

    console.log(

        "PRODUCT NAME:",

        product.name

    );


    /* ==========================================
       STEP 2
       BRAND
    ========================================== */

    product.brand =

        findFirstText([

            ".product-brand",

            ".brand-name",

            ".brand",

            "[class*='brand']"

        ]);


    /* ==========================================
       STEP 3
       ORIGIN
    ========================================== */

    product.origin =

        findFirstText([

            ".product-origin",

            ".origin",

            "[class*='origin']"

        ]);


    /* ==========================================
       STEP 4
       DESCRIPTION
    ========================================== */

    if (

        options.description !== false

    ) {

        const descriptionSelectors = [

            ".product-description",

            ".product-detail-description",

            ".product-intro",

            ".product-summary",

            ".product-short-description",

            ".product-detail .description",

            ".product-info .description",

            ".entry-content .description"

        ];


        for (

            const selector of

            descriptionSelectors

        ) {

            const element =

                $(selector)

                    .first();


            if (

                !element.length

            ) {

                continue;

            }


            const text =

                cleanText(

                    element.text()

                );


            if (

                text.length >= 30 &&

                text.length <= 5000

            ) {

                product.description =

                    text;

                break;

            }

        }


        /* ======================================
           FALLBACK DESCRIPTION

           Nếu không tìm được selector
           cụ thể thì lấy đoạn văn đầu tiên
           trong khu vực product.
        ====================================== */

        if (

            !product.description

        ) {

            const productContainers = [

                ".product-detail",

                ".product-content",

                ".product-info",

                "main",

                "article"

            ];


            for (

                const selector of

                productContainers

            ) {

                const container =

                    $(selector)

                        .first();


                if (

                    !container.length

                ) {

                    continue;

                }


                let paragraphs = [];


                container

                    .find("p")

                    .each(

                        function () {

                            const text =

                                cleanText(

                                    $(this)

                                        .text()

                                );


                            if (

                                text.length >= 30 &&

                                text.length <= 1000

                            ) {

                                paragraphs.push(

                                    text

                                );

                            }

                        }

                    );


                paragraphs =

                    uniqueArray(

                        paragraphs

                    );


                if (

                    paragraphs.length

                ) {

                    product.description =

                        paragraphs

                            .slice(

                                0,

                                5

                            )

                            .join(" ");


                    break;

                }

            }

        }

    }


    console.log("");

    console.log(

        "DESCRIPTION:",

        product.description

    );


    console.log(

        "DESCRIPTION LENGTH:",

        product.description.length

    );


    /* ==========================================
       STEP 5
       SPECIFICATION
    ========================================== */

    if (

        options.specification !== false

    ) {

        $("table").each(

            function () {

                const table =

                    $(this);


                const rows =

                    table.find("tr");


                if (

                    !rows.length

                ) {

                    return;

                }


                rows.each(

                    function () {

                        const cells =

                            $(this)

                                .find(

                                    "th, td"

                                );


                        if (

                            cells.length < 2

                        ) {

                            return;

                        }


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


                        /* ======================
                           FILTER
                        ====================== */

                        if (

                            !name ||

                            !value

                        ) {

                            return;

                        }


                        if (

                            name.length > 150

                        ) {

                            return;

                        }


                        if (

                            value.length > 1000

                        ) {

                            return;

                        }


                        /* ======================
                           LOẠI BỎ MENU / LINK
                        ====================== */

                        const lowerName =

                            name.toLowerCase();


                        const invalidNames = [

                            "menu",

                            "home",

                            "search",

                            "login",

                            "email",

                            "facebook",

                            "youtube",

                            "instagram"

                        ];


                        if (

                            invalidNames.includes(

                                lowerName

                            )

                        ) {

                            return;

                        }


                        product.specification

                            .push({

                                name,

                                value

                            });

                    }

                );

            }

        );


        /* ======================================
           REMOVE DUPLICATE SPECIFICATION
        ====================================== */

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

    }


    console.log("");

    console.log(

        "SPECIFICATION COUNT:",

        product.specification.length

    );


    /* ==========================================
       STEP 6
       FIND LIST BY HEADING
    ========================================== */

    function findListByHeading(

        keywords = []

    ) {

        const result = [];


        $("h1, h2, h3, h4, h5, h6")

            .each(

                function () {

                    const heading =

                        cleanText(

                            $(this)

                                .text()

                        );


                    const lowerHeading =

                        heading

                            .toLowerCase();


                    const matched =

                        keywords.some(

                            keyword =>

                                lowerHeading

                                    .includes(

                                        keyword

                                    )

                        );


                    if (

                        !matched

                    ) {

                        return;

                    }


                    /* ======================
                       TÌM LIST GẦN HEADING
                    ====================== */

                    let container =

                        $(this)

                            .next();


                    if (

                        !container.length

                    ) {

                        container =

                            $(this)

                                .parent();

                    }


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

                                    text.length <= 500

                                ) {

                                    result.push(

                                        text

                                    );

                                }

                            }

                        );

                }

            );


        return uniqueArray(

            result

        );

    }


    /* ==========================================
       STEP 7
       FEATURES
    ========================================== */

    if (

        options.features !== false

    ) {

        product.features =

            findListByHeading([

                "feature",

                "features",

                "tính năng",

                "đặc điểm",

                "ưu điểm"

            ]);

    }


    /* ==========================================
       STEP 8
       APPLICATIONS
    ========================================== */

    if (

        options.applications !== false

    ) {

        product.applications =

            findListByHeading([

                "application",

                "applications",

                "ứng dụng"

            ]);

    }


    /* ==========================================
       STEP 9
       ACCESSORIES
    ========================================== */

    if (

        options.accessories !== false

    ) {

        product.accessories =

            findListByHeading([

                "accessory",

                "accessories",

                "phụ kiện"

            ]);

    }


    /* ==========================================
       STEP 10
       IMAGES
    ========================================== */

    if (

        options.images !== false

    ) {

        $("img")

            .each(

                function () {

                    const src =

                        $(this)

                            .attr("src") ||

                        $(this)

                            .attr("data-src") ||

                        $(this)

                            .attr(

                                "data-original"

                            );


                    if (

                        !src

                    ) {

                        return;

                    }


                    if (

                        src.startsWith(

                            "data:"

                        )

                    ) {

                        return;

                    }


                    if (

                        !product.images

                            .includes(

                                src

                            )

                    ) {

                        product.images

                            .push(

                                src

                            );

                    }

                }

            );

    }


    /* ==========================================
       FINAL RESULT
    ========================================== */

    console.log("");

    console.log(

        "========== PARSER V2 RESULT =========="

    );


    console.log(

        "NAME:",

        product.name

    );


    console.log(

        "BRAND:",

        product.brand

    );


    console.log(

        "ORIGIN:",

        product.origin

    );


    console.log(

        "DESCRIPTION LENGTH:",

        product.description.length

    );


    console.log(

        "SPECIFICATION:",

        product.specification.length

    );


    console.log(

        "FEATURES:",

        product.features.length

    );


    console.log(

        "APPLICATIONS:",

        product.applications.length

    );


    console.log(

        "ACCESSORIES:",

        product.accessories.length

    );


    console.log(

        "IMAGES:",

        product.images.length

    );


    console.log(

        "======================================="

    );


    return product;

}


/* ==========================================
   EMPTY PRODUCT
========================================== */

function createEmptyProduct() {

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