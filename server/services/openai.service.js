/* =====================================================
   OPENAI SERVICE
   QTN GLOBAL SERVER CORE

   Chức năng:
   - Kết nối OpenAI API
   - AI Product
   - AI SEO
   - AI Content
   - QVZO AI Engine
===================================================== */


const OpenAI = require("openai");



class OpenAIService {


    constructor(){


        this.client = new OpenAI({

            apiKey:
            process.env.OPENAI_API_KEY

        });


    }





    /*
    =====================================================
    CHAT CORE
    =====================================================
    */


    async chat(
        message,
        system = "Bạn là AI Assistant của QTN GLOBAL."
    ){


        try{


            const response =
            await this.client.chat.completions.create({

                model:
                "gpt-5-mini",


                messages:[

                    {
                        role:"system",
                        content:system
                    },


                    {
                        role:"user",
                        content:message
                    }

                ]

            });



            return response
                .choices[0]
                .message
                .content;



        }

        catch(error){


            console.error(
                "OPENAI SERVICE ERROR:",
                error
            );


            throw error;

        }


    }





    /*
    =====================================================
    PRODUCT AI
    =====================================================
    */


    async generateProductDescription(product){


        const prompt = `

Viết mô tả sản phẩm chuẩn SEO cho QTN GLOBAL.

Tên sản phẩm:
${product.name}

Thương hiệu:
${product.brand}

Xuất xứ:
${product.origin}

Thông số:
${JSON.stringify(product.specs)}

Yêu cầu:
- Chuyên nghiệp
- Dễ hiểu
- Tập trung lợi ích khách hàng
- Phù hợp website B2B


`;



        return this.chat(

            prompt,

            "Bạn là chuyên gia marketing thiết bị công nghiệp."

        );


    }





    /*
    =====================================================
    SEO AI
    =====================================================
    */


    async generateSEO(keyword){


        return this.chat(

`
Tạo bộ SEO cho từ khóa:

${keyword}

Bao gồm:
- SEO Title
- Meta Description
- Keywords
- Nội dung giới thiệu
`,

"Bạn là chuyên gia SEO website."

        );


    }



}



module.exports =
new OpenAIService();