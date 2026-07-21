/* ==========================================
   OPENAI SERVICE
========================================== */

import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({

    apiKey:
        process.env.OPENAI_API_KEY

});
/* ==========================================
   OPENAI CLIENT
========================================== */

const apiKey = process.env.OPENAI_API_KEY || "";

const client = apiKey

    ? new OpenAI({

        apiKey

    })

    : null;
/* ==========================================
   PARSE PRODUCT WITH AI
========================================== */

export async function parseProductWithAI(html, options = {}) {

    /* ==========================================
       CHECK OPENAI CLIENT
    ========================================== */

    if (!client) {

        console.log("");

        console.log(
            "========== OPENAI NOT CONFIGURED =========="
        );

        console.log(
            "OPENAI_API_KEY chưa được cấu hình."
        );

        console.log(
            "Sử dụng Mock AI tạm thời."
        );

        console.log(
            "==========================================="
        );


        /* ==========================================
           MOCK AI RESULT
        ========================================== */

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


    /* ==========================================
       OPENAI START
    ========================================== */

    console.log("");

    console.log(
        "========== OPENAI =========="
    );

    console.log(
        "Sending HTML to OpenAI..."
    );

    console.log(
        "============================"
    );


    /* ==========================================
       BUILD PROMPT
    ========================================== */

    const prompt = `

Bạn là AI chuyên phân tích trang sản phẩm.

Đọc HTML dưới đây.

Chỉ trả về JSON.

Không giải thích.

Không markdown.

JSON gồm:

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

HTML:

${html}

`;


    /* ==========================================
       SEND TO OPENAI
    ========================================== */

    const completion =

        await client.chat.completions.create({

            model: "gpt-5.5",

            messages: [

                {

                    role: "system",

                    content:

                        "You extract product information into JSON."

                },

                {

                    role: "user",

                    content: prompt

                }

            ],

            temperature: 0

        });


    /* ==========================================
       GET AI RESPONSE
    ========================================== */

    const text =

        completion
            .choices[0]
            .message
            .content;


    console.log("");

    console.log(
        "========== AI RESULT =========="
    );

    console.log(text);

    console.log(
        "==============================="
    );


    /* ==========================================
       PARSE JSON
    ========================================== */

    try {

        return JSON.parse(text);

    }

    catch (error) {

        console.error(
            "AI JSON PARSE ERROR:",
            error
        );

        return {

            raw: text

        };

    }

}