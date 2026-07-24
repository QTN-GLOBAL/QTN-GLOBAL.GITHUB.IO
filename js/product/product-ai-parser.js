/* =====================================================
   PRODUCT AI PARSER
   -----------------------------------------------------
   FILE:
   product-ai-parser.js

   VERSION:
   2

   PURPOSE:
   - AI Parser trung gian
   - Hiện tại CHƯA kết nối OpenAI thật
   - Dùng Mock AI để test luồng hệ thống
   - Chuẩn bị sẵn cấu trúc để kết nối OpenAI sau này

   DATA STRUCTURE:

   {
       success: true,

       name: "",

       description: "",

       specs: {

           table: {

               headers: [],

               rows: []

           },

           text: []

       },

       features: [],

       applications: [],

       accessories: [],

       images: []

   }

   IMPORTANT:
   - Không tự tạo các cột Specification cố định
   - Không dùng field "specification" mới
   - Không kết nối OpenAI thật ở Version này
===================================================== */


window.ProductAIParser = {


    /* =================================================
       PARSE
       -------------------------------------------------
       Hàm chính để gọi AI Parser
    ================================================= */

    async parse(prompt) {


        /* =============================================
           VALIDATE PROMPT
        ============================================= */

        if (

            prompt === null ||

            prompt === undefined ||

            String(prompt).trim() === ""

        ) {

            throw new Error(

                "Prompt is empty."

            );

        }


        console.log(

            "================================="

        );

        console.log(

            "PRODUCT AI PARSER"

        );

        console.log(

            "================================="

        );


        console.log(

            "AI Parsing..."

        );


        console.log(

            "Prompt:",

            prompt

        );


        /* =============================================
           VERSION 2

           HIỆN TẠI DÙNG MOCK AI

           SAU NÀY CÓ THỂ THAY BẰNG:

           return await this.openAI(prompt);

        ============================================= */

        return await this.mock(

            prompt

        );

    },


    /* =================================================
       MOCK AI
       -------------------------------------------------
       Dùng để test hệ thống khi chưa kết nối OpenAI
    ================================================= */

    async mock(prompt) {


        console.log(

            "================================="

        );

        console.log(

            "MOCK AI PARSER"

        );

        console.log(

            "================================="

        );


        console.log(

            "Received Prompt:",

            prompt

        );


        /* =============================================
           MOCK RESULT

           Không ép Specification thành
           Capacity / Division / Size...

           Nếu cần bảng thì trả bảng.

           Nếu cần text/list thì trả specs.text.
        ============================================= */

        const result = {


            success: true,


            /* =========================================
               PRODUCT NAME
            ========================================== */

            name:

                "AI Imported Product",


            /* =========================================
               DESCRIPTION
            ========================================== */

            description:

                "AI Description",


            /* =========================================
               SPECIFICATIONS
            ========================================== */

            specs: {


                table: {


                    headers: [],


                    rows: []

                },


                text: [

                    "Capacity: 30kg",

                    "Division: 5g"

                ]

            },


            /* =========================================
               FEATURES
            ========================================== */

            features: [

                "AI Feature 1",

                "AI Feature 2"

            ],


            /* =========================================
               APPLICATIONS
            ========================================== */

            applications: [

                "AI Application"

            ],


            /* =========================================
               ACCESSORIES
            ========================================== */

            accessories: [

                "Adapter",

                "Manual"

            ],


            /* =========================================
               IMAGES
            ========================================== */

            images: []

        };


        console.log(

            "MOCK AI RESULT:",

            result

        );


        return result;

    },


    /* =================================================
       OPENAI
       -------------------------------------------------
       FUTURE

       Chưa kết nối OpenAI thật.

       Sau này luồng sẽ là:

       Frontend
           ↓
       Backend
           ↓
       OpenAI API
           ↓
       Structured JSON
           ↓
       Product Import Engine
           ↓
       Step 3
           ↓
       Step 4
    ================================================= */

    async openAI(prompt) {


        console.warn(

            "ProductAIParser.openAI() chưa được kết nối."

        );


        throw new Error(

            "OpenAI chưa kết nối."

        );

    },


    /* =================================================
       GEMINI
       -------------------------------------------------
       FUTURE

       Chưa kết nối Gemini.
    ================================================= */

    async gemini(prompt) {


        console.warn(

            "ProductAIParser.gemini() chưa được kết nối."

        );


        throw new Error(

            "Gemini chưa kết nối."

        );

    }


};