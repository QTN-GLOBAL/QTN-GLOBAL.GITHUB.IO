/*****************************************************************
 * QTN GLOBAL CMS
 * Module : Product Parser
 * File   : parser/product-parser.js
 * Version: 1.0.0
 *****************************************************************/

(function (window) {

    "use strict";

    const ProductParser = {};

    //==========================================================
    // Parse Product
    //==========================================================

  ProductParser.parse=function(html,options={}){


const product={


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
rows:[]
}

},


media:{

images:[]

}


};



product.basic.name =
ProductParser.getName(html);


product.basic.model =
ProductParser.getModel(
product.basic.name
);


product.basic.brand =
ProductParser.getBrand(html);


product.basic.origin =
ProductParser.getOrigin(html);


product.basic.category =
ProductParser.getCategory(html);


product.basic.description =
ProductParser.getDescription(html);



product.technical.table.rows =
ProductParser.getSpecification(html);



product.media.images =
ProductParser.getImages(html);



return product;


};
    //==========================================================
    // BASIC
    //==========================================================

   ProductParser.getName = function (html) {

    if (!html)
        return "";

    // Ưu tiên thẻ H1
    let match = html.match(/<h1[^>]*>(.*?)<\/h1>/is);

    if (match) {

        return ProductParser.cleanText(match[1]);

    }

    // Nếu không có H1 thì lấy title
    match = html.match(/<title[^>]*>(.*?)<\/title>/is);

    if (match) {

        let title = ProductParser.cleanText(match[1]);

        title = title.split("|")[0];

        title = title.split("-")[0];

        return title.trim();

    }

    return "";

};
ProductParser.cleanText = function (text) {

    return String(text || "")

        .replace(/<[^>]+>/g, " ")

        .replace(/&nbsp;/g, " ")

        .replace(/&amp;/g, "&")

        .replace(/\s+/g, " ")

        .trim();

};
    ProductParser.getModel = function (name) {

        return "";

    };

    ProductParser.getBrand = function (html) {

        return "";

    };

    ProductParser.getOrigin = function (html) {

        return "";

    };

    ProductParser.getCategory = function (html) {

        return "";

    };

    ProductParser.getDescription = function (html) {

        return "";

    };

    //==========================================================
    // SPECIFICATION
    //==========================================================

    ProductParser.getSpecification = function (html) {

        return [];

    };

    ProductParser.getFeatures = function (html) {

        return [];

    };

    ProductParser.getApplications = function (html) {

        return [];

    };

    ProductParser.getAccessories = function (html) {

        return [];

    };

    //==========================================================
    // MEDIA
    //==========================================================

    ProductParser.getImages = function (html) {

        return [];

    };

    ProductParser.getPdf = function (html) {

        return "";

    };

    ProductParser.getVideo = function (html) {

        return "";

    };

    //==========================================================
    // EXPORT
    //==========================================================

    window.ProductParser = ProductParser;

})(window);