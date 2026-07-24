/* =====================================================
   PRODUCT IMPORT ENGINE
   -----------------------------------------------------
   FILE:
   product-import-engine.js

   VERSION:
   4

   PURPOSE:
   - Nhận Source URL từ Step 3
   - Gọi Backend Import API
   - Nhận dữ liệu sản phẩm từ Backend
   - Không gọi OpenAI trực tiếp từ Frontend
   - Không xử lý AI trực tiếp tại đây
   - Giữ nguyên dữ liệu Backend trả về
   - Chuẩn bị sẵn cho AI Parser trong tương lai

   DATA FLOW:

   Step 3
      ↓
   ProductImportEngine.import(source)
      ↓
   Backend /api/import
      ↓
   Free Parser / Backend Parser
      ↓
   [Future] AI Parser
      ↓
   Structured Product Data
      ↓
   Step 3
      ↓
   Step 4

   IMPORTANT:

   Frontend KHÔNG chứa OpenAI API Key.

   OpenAI sau này sẽ được kết nối ở Backend.

===================================================== */


window.ProductImportEngine = {


    /* =================================================
       IMPORT
       -------------------------------------------------
       Hàm chính để import sản phẩm từ Source URL
    ================================================= */

    async import(source) {


        /* =============================================
           START LOG
        ============================================= */

        console.log(

            "================================="

        );

        console.log(

            "PRODUCT IMPORT ENGINE"

        );

        console.log(

            "VERSION 4"

        );

        console.log(

            "================================="

        );


        /* =============================================
           VALIDATE SOURCE
        ============================================= */

        if (

            !source ||

            typeof source !== "object"

        ) {

            return {

                success: false,

                error:

                    "Source không hợp lệ."

            };

        }


        /* =============================================
           VALIDATE URL
        ============================================= */

        const url =

            typeof source.url === "string"

                ? source.url.trim()

                : "";


        if (!url) {

            return {

                success: false,

                error:

                    "Source URL không được để trống."

            };

        }


        /* =============================================
           SOURCE OPTIONS
        ============================================= */

        const options =

            source.options &&

            typeof source.options === "object"

                ? source.options

                : {


                    description: true,

                    specs: true,

                    images: true

                };


        /* =============================================
           LOG SOURCE
        ============================================= */

        console.log(

            "SOURCE:",

            {

                url,

                options

            }

        );


        /* =============================================
           BACKEND API
        ============================================= */

        const API_URL =

            "http://localhost:3000/api/import";


        try {


            /* =========================================
               REQUEST BACKEND
            ========================================== */

            console.log(

                "Calling Backend:",

                API_URL

            );


            const response =

                await fetch(

                    API_URL,

                    {

                        method:

                            "POST",


                        headers: {

                            "Content-Type":

                                "application/json"

                        },


                        body:

                            JSON.stringify({

                                url,

                                options

                            })

                    }

                );


            /* =========================================
               CHECK HTTP RESPONSE
            ========================================== */

            if (!response.ok) {

                throw new Error(

                    `Backend HTTP Error: ${response.status}`

                );

            }


            /* =========================================
               PARSE JSON
            ========================================== */

            let result;


            try {

                result =

                    await response.json();

            }

            catch (jsonError) {

                throw new Error(

                    "Backend trả về dữ liệu không phải JSON."

                );

            }


            /* =========================================
               LOG BACKEND RESULT
            ========================================== */

            console.log(

                "========== BACKEND RESULT =========="

            );

            console.log(

                result

            );

            console.log(

                "===================================="

            );


            /* =========================================
               CHECK BACKEND RESULT
            ========================================== */

            if (

                !result ||

                result.success !== true

            ) {

                return {

                    success: false,


                    error:

                        result?.error ||


                        result?.message ||


                        "Backend Import thất bại.",


                    message:

                        result?.message ||


                        result?.error ||


                        "Backend Import thất bại.",


                    backend:

                        result

                };

            }


            /* =========================================
               BACKEND SUCCESS
            ========================================== */

            console.log(

                "================================="

            );

            console.log(

                "BACKEND IMPORT SUCCESS"

            );

            console.log(

                "================================="

            );


            /* =========================================
               LOG BASIC DATA
            ========================================== */

            console.log(

                "Title:",

                result.title

            );


            console.log(

                "Product:",

                result.product

            );


            /* =========================================
               RETURN RAW BACKEND RESULT
               
               Không tự biến đổi dữ liệu ở đây.

               Việc normalize được thực hiện ở:

               Step 3

               extractImportedProduct()
               normalizeImportedProduct()
               mergeImportedProduct()

            ========================================== */

            return result;

        }


        catch (error) {


            /* =========================================
               LOG ERROR
            ========================================== */

            console.error(

                "PRODUCT IMPORT ENGINE ERROR:",

                error

            );


            /* =========================================
               RETURN STANDARD ERROR
            ========================================== */

            return {

                success: false,


                error:

                    error?.message ||


                    String(error) ||


                    "Không thể kết nối Backend.",


                message:

                    error?.message ||


                    String(error) ||


                    "Không thể kết nối Backend."

            };

        }

    }

};