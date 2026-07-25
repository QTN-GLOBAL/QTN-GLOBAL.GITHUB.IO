/* ==========================================
   PRODUCT NORMALIZER
   QTN GLOBAL CMS
   VERSION 2.0
========================================== */


export function normalizeProduct(data = {}) {


    const specification =

        Array.isArray(data.specification)

            ? data.specification

            : [];



    const rows =

        specification.map(item => {


            if (

                typeof item === "object"

            ) {


                return [

                    item.name || "",

                    item.value || ""

                ];

            }



            return [

                "",

                String(item)

            ];


        });



    return {


        /* ==========================
           BASIC
        ========================== */


        name:

            data.name || "",



        model:

            data.model || "",



        brand:

            data.brand || "",



        origin:

            data.origin || "",



        category:

            data.category || "",




        folder:

            data.folder || "",




        slug:

            data.slug || "",




        /* ==========================
           DESCRIPTION
        ========================== */


        description:

            data.description || "",




        /* ==========================
           TECHNICAL
        ========================== */


        technical:{


            table:{


                headers:[

                    "Thông số",

                    "Giá trị"

                ],


                rows

            },


            specifications:

                specification,


            features:

                Array.isArray(data.features)

                    ? data.features

                    : [],



            applications:

                Array.isArray(data.applications)

                    ? data.applications

                    : [],



            accessories:

                Array.isArray(data.accessories)

                    ? data.accessories

                    : []

        },




        /* ==========================
           MEDIA
        ========================== */


        media:{


            images:


                Array.isArray(data.images)

                    ? data.images

                    : [],



            pdf:

                data.pdf || "",



            video:

                data.video || ""

        },




        /* ==========================
           AI INFO
        ========================== */


        ai:{


            imported:true,


            importedAt:

                new Date().toISOString()


        }


    };


}