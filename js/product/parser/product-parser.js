/*****************************************************************
 * QTN GLOBAL CMS
 * Module : Product Parser
 * File   : parser/product-parser.js
 * Version: 1.1.0
 *****************************************************************/

(function (window) {

    "use strict";


    const ProductParser = {};


    //==========================================================
    // MAIN PARSER
    //==========================================================

    ProductParser.parse = function(html, options = {}) {


        const product = {


            basic:{


                name:"",
                model:"",
                brand:"",
                origin:"",
                category:"",
                description:"",
                folder:"",
                slug:""


            },


            system:{


                business:"measure"


            },


            technical:{


                table:{


                    headers:[

                        "Thông số",
                        "Giá trị"

                    ],


                    rows:[]


                }


            },


            media:{


                images:[]


            }


        };



        // NAME

        product.basic.name =
            ProductParser.getName(html);



        // AUTO ANALYZE NAME

        const info =
            ProductParser.analyzeName(
                product.basic.name
            );



        product.basic.brand =
            info.brand;



        product.basic.model =
            info.model;



        product.basic.category =
            info.category;



        product.basic.origin =
            ProductParser.getOrigin(html);



        product.basic.description =
            ProductParser.getDescription(html);



        product.technical.table.rows =
            ProductParser.getSpecification(html);



        product.media.images =
            ProductParser.getImages(html);



        return product;


    };





    //==========================================================
    // CLEAN TEXT
    //==========================================================


    ProductParser.cleanText = function(text){


        return String(text || "")


        .replace(/<[^>]+>/g," ")


        .replace(/&nbsp;/g," ")


        .replace(/&amp;/g,"&")


        .replace(/\s+/g," ")


        .trim();


    };





    //==========================================================
    // NAME
    //==========================================================


    ProductParser.getName=function(html){


        if(!html)
            return "";



        let match =
            html.match(
                /<h1[^>]*>(.*?)<\/h1>/is
            );



        if(match){


            return ProductParser.cleanText(
                match[1]
            );


        }



        match =
            html.match(
                /<title[^>]*>(.*?)<\/title>/is
            );



        if(match){


            let title =
                ProductParser.cleanText(
                    match[1]
                );



            return title
                .split("|")[0]
                .split("-")[0]
                .trim();


        }



        return "";


    };





    //==========================================================
    // AUTO ANALYZE PRODUCT NAME
    //==========================================================


    ProductParser.analyzeName=function(name){



        const result={


            brand:"",
            model:"",
            category:"",
            origin:""


        };



        if(!name)
            return result;




        const text =
            name.toLowerCase();





        // BRAND


        const brands=[


            "Ohaus",
            "Jadever",
            "Vibra",
            "Excell",
            "CAS",
            "AND",
            "Mettler Toledo"


        ];



        brands.forEach(function(brand){


            if(
                text.includes(
                    brand.toLowerCase()
                )
            ){

                result.brand = brand;

            }


        });






        // MODEL


        const model =
            name.match(
                /\b[A-Z]{1,5}[-]?[A-Z0-9]*\d+[A-Z0-9-]*\b/
            );



        if(model){

            result.model =
                model[0];

        }







        // CATEGORY



        if(
            text.includes("cân bàn")
            ||
            text.includes("100kg")
            ||
            text.includes("150kg")
            ||
            text.includes("300kg")
        ){

            result.category="can-ban";

        }



        else if(
            text.includes("đếm")
            ||
            text.includes("counting")
        ){

            result.category="can-dem";

        }



        else if(
            text.includes("treo")
            ||
            text.includes("crane")
        ){

            result.category="can-treo";

        }



        else if(
            text.includes("chống nước")
            ||
            text.includes("thủy sản")
            ||
            text.includes("inox")
        ){

            result.category="can-chong-nuoc";

        }



        else if(
            text.includes("phân tích")
            ||
            text.includes("analysis")
        ){

            result.category="can-phan-tich";

        }



        return result;


    };






    //==========================================================
    // OTHER BASIC
    //==========================================================


    ProductParser.getOrigin=function(html){


        const text =
            ProductParser.cleanText(html)
            .toLowerCase();



        if(text.includes("nhật"))
            return "Nhật Bản";


        if(text.includes("đài loan"))
            return "Đài Loan";


        if(text.includes("mỹ"))
            return "Mỹ";


        if(text.includes("trung quốc"))
            return "Trung Quốc";



        return "";


    };





    ProductParser.getDescription=function(html){


        return "";


    };






    //==========================================================
    // SPECIFICATION
    //==========================================================


    ProductParser.getSpecification=function(html){


        return [];


    };







    //==========================================================
    // MEDIA
    //==========================================================


    ProductParser.getImages=function(html){


        return [];


    };





    ProductParser.getPdf=function(){

        return "";

    };



    ProductParser.getVideo=function(){

        return "";

    };





    // EXPORT


    window.ProductParser =
        ProductParser;



})(window);