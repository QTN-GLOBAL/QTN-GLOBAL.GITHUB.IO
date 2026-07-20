/* =====================================================
   PRODUCT AI PARSER
   - AI Parser
   - Version 1
===================================================== */

window.ProductAIParser = {

    /* ==========================================
       PARSE
    ========================================== */

    async parse(prompt) {

        if (!prompt) {

            throw "Prompt is empty.";

        }

        console.log("AI Parsing...");

        /*
            Version 1

            Sau này sẽ gọi OpenAI

        */

        return await this.mock(prompt);

    },

    /* ==========================================
       MOCK AI
    ========================================== */

    async mock(prompt) {

        console.log(prompt);

        return {

            success: true,

            description:

                "AI Description",

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

                "AI Feature 1",

                "AI Feature 2"

            ],

            applications: [

                "AI Application"

            ],

            accessories: [

                "Adapter",

                "Manual"

            ]

        };

    },

    /* ==========================================
       OPENAI
       (Future)
    ========================================== */

    async openAI(prompt) {

        throw "OpenAI chưa kết nối.";

    },

    /* ==========================================
       GEMINI
       (Future)
    ========================================== */

    async gemini(prompt) {

        throw "Gemini chưa kết nối.";

    }

};