/* ==========================================
   MOCK AI SERVICE
========================================== */

export async function parseProduct(prompt) {

    console.log("");

    console.log("========== MOCK AI ==========");

    console.log("Prompt Length:", prompt.length);

    console.log("=============================");

    /* giả lập AI xử lý */

    await new Promise(resolve =>

        setTimeout(resolve, 800)

    );

    return {

        name: "AI Product",

        brand: "Unknown",

        origin: "Unknown",

        description:

            "Đây là mô tả sản phẩm được sinh bởi Mock AI.",

        specification: [

            {

                name: "Capacity",

                value: "30kg"

            },

            {

                name: "Division",

                value: "5g"

            }

        ],

        features: [

            "Feature 1",

            "Feature 2",

            "Feature 3"

        ],

        applications: [

            "Factory",

            "Warehouse"

        ],

        accessories: [

            "Adapter",

            "Manual"

        ]

    };

}