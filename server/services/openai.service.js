/* ==========================================
   OPENAI SERVICE
========================================== */

import OpenAI from "openai";

import dotenv from "dotenv";

dotenv.config();

/* ==========================================
   OPENAI CLIENT
========================================== */

const client = new OpenAI({

    apiKey: process.env.OPENAI_API_KEY

});

/* ==========================================
   PARSE PRODUCT WITH AI
========================================== */

export async function parseProductWithAI(html, options = {}) {

    console.log("");

    console.log("========== OPENAI ==========");

    console.log("Sending HTML to OpenAI...");

    console.log("============================");

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

    const completion = await client.chat.completions.create({

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

    const text =

        completion.choices[0].message.content;

    console.log("");

    console.log("========== AI RESULT ==========");

    console.log(text);

    console.log("===============================");

    try {

        return JSON.parse(text);

    }

    catch {

        return {

            raw: text

        };

    }

}