/*****************************************************************
 * QTN GLOBAL CMS
 * Module : Product Parser
 * File   : parser/product-parser.js
 * Version: 1.2.0
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




        // ANALYZE NAME

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

            .replace(/<script[\s\S]*?<\/script>/gi,"")

            .replace(/<style[\s\S]*?<\/style>/gi,"")

            .replace(/<[^>]+>/g," ")

            .replace(/&nbsp;/g," ")

            .replace(/&amp;/g,"&")

            .replace(/\s+/g," ")

            .trim();


    };






    //==========================================================
    // GET NAME
    //==========================================================


    ProductParser.getName = function(html){


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
    // ANALYZE PRODUCT NAME
    //==========================================================


    ProductParser.analyzeName = function(name){



        const result = {


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

        const brands = [


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


        };





        // CATEGORY


        if(

            text.includes("cân bàn") ||

            text.includes("100kg") ||

            text.includes("150kg") ||

            text.includes("300kg") ||

            text.includes("platform")

        ){


            result.category =

                "can-ban";


        }


        else if(

            text.includes("đếm") ||

            text.includes("counting")

        ){


            result.category =

                "can-dem";


        }


        else if(

            text.includes("treo") ||

            text.includes("crane")

        ){


            result.category =

                "can-treo";


        }


        else if(

            text.includes("chống nước") ||

            text.includes("inox") ||

            text.includes("thủy sản") ||

            text.includes("waterproof")

        ){


            result.category =

                "can-chong-nuoc";


        }


        else if(

            text.includes("phân tích") ||

            text.includes("analytical")

        ){


            result.category =

                "can-phan-tich";


        }



        return result;


    };
    //==========================================================
    // ORIGIN
    //==========================================================


    ProductParser.getOrigin = function(html){


        if(!html)

            return "";



        const text =

            html.toLowerCase();




        const patterns = [


            {
                keys:[
                    "made in taiwan",
                    "taiwan",
                    "đài loan"
                ],
                value:"Đài Loan"
            },


            {
                keys:[
                    "made in japan",
                    "japan",
                    "nhật bản"
                ],
                value:"Nhật Bản"
            },


            {
                keys:[
                    "made in korea",
                    "korea",
                    "hàn quốc"
                ],
                value:"Hàn Quốc"
            },


            {
                keys:[
                    "made in china",
                    "china",
                    "trung quốc"
                ],
                value:"Trung Quốc"
            },


            {
                keys:[
                    "made in usa",
                    "usa",
                    "united states",
                    "mỹ"
                ],
                value:"Mỹ"
            },


            {
                keys:[
                    "switzerland",
                    "swiss",
                    "thụy sĩ"
                ],
                value:"Thụy Sĩ"
            }


        ];



        for(

            let item of patterns

        ){


            for(

                let key of item.keys

            ){


                if(

                    text.includes(key)

                ){

                    return item.value;

                }


            }


        }



        return "";


    };







    //==========================================================
    // DESCRIPTION
    //==========================================================


    ProductParser.getDescription = function(html){


        if(!html)

            return "";



        let match =


            html.match(

                /<meta[^>]+name=["']description["'][^>]+content=["'](.*?)["']/is

            );



        if(match){


            return ProductParser.cleanText(

                match[1]

            );


        }



        match =


            html.match(

                /<p[^>]*>(.*?)<\/p>/is

            );



        if(match){


            return ProductParser.cleanText(

                match[1]

            );


        }



        return "";


    };







    //==========================================================
    // SPECIFICATION TABLE
    //==========================================================


    ProductParser.getSpecification = function(html){


        const rows = [];



        if(!html)

            return rows;





        // Lấy tất cả bảng HTML


        const tables =

            html.match(

                /<table[\s\S]*?<\/table>/gi

            );



        if(!tables)

            return rows;






        tables.forEach(function(table){



            const trList =

                table.match(

                    /<tr[\s\S]*?<\/tr>/gi

                );



            if(!trList)

                return;




            trList.forEach(function(tr){



                const cols =

                    tr.match(

                        /<(td|th)[^>]*>([\s\S]*?)<\/\1>/gi

                    );



                if(!cols || cols.length < 2)

                    return;




                let values = [];



                cols.forEach(function(col){



                    values.push(

                        ProductParser.cleanText(

                            col

                        )

                    );



                });





                if(

                    values[0] &&

                    values[1]

                ){


                    rows.push([

                        values[0],

                        values[1]

                    ]);


                }



            });



        });






        return rows;


    };
    //==========================================================
    // IMAGES
    //==========================================================


    ProductParser.getImages = function(html){


        const images = [];



        if(!html)

            return images;





        const matches =

            html.match(

                /<img[^>]+src=["']([^"']+)["']/gi

            );



        if(!matches)

            return images;






        matches.forEach(function(img){



            const srcMatch =

                img.match(

                    /src=["']([^"']+)["']/

                );



            if(!srcMatch)

                return;



            let src =

                srcMatch[1];



            src = src.trim();





            // loại bỏ ảnh không phải sản phẩm


            if(

                src.includes("logo") ||

                src.includes("icon") ||

                src.includes("banner") ||

                src.includes("loading") ||

                src.includes("svg")

            ){

                return;

            }






            if(

                /\.(jpg|jpeg|png|webp)/i.test(src)

            ){


                if(

                    !images.includes(src)

                ){

                    images.push(src);

                }


            }



        });






        return images.slice(0,10);


    };







    //==========================================================
    // PDF
    //==========================================================


    ProductParser.getPdf = function(html){


        if(!html)

            return "";



        const match =


            html.match(

                /href=["']([^"']+\.pdf)["']/i

            );



        return match

            ? match[1]

            : "";


    };







    //==========================================================
    // VIDEO
    //==========================================================


    ProductParser.getVideo = function(html){


        if(!html)

            return "";



        const match =


            html.match(

                /(https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]+)/i

            );



        return match

            ? match[1]

            : "";


    };







    //==========================================================
    // EXPORT
    //==========================================================


    window.ProductParser =

        ProductParser;



})(window);


/*****************************************************************
===== END OF FILE : product-parser.js =====
*****************************************************************/