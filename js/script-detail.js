/* =====================================================
   QTN GLOBAL
   PRODUCT DETAIL SCRIPT
   VERSION 1.0

   PART 1:
   LOAD PRODUCT
   HIỂN THỊ:
   - Tên sản phẩm
   - Hãng
   - Xuất xứ
   - Mô tả
===================================================== */



// =====================================================
// 1. LẤY ID SẢN PHẨM TỪ URL
// Ví dụ:
// chitiet.html?id=10
// =====================================================


const detailId =
Number(
    new URLSearchParams(location.search).get("id")
);



// =====================================================
// 2. TÌM SẢN PHẨM TRONG products.js
// =====================================================


const rawProduct =
products.find(p => p.id === detailId);



const product =
rawProduct
?
(getTranslatedProduct(rawProduct) || rawProduct)
:
null;



// lưu sản phẩm hiện tại
window.currentProduct = product;



// =====================================================
// 3. HIỂN THỊ THÔNG TIN SẢN PHẨM
// =====================================================


if(product){



    // TÊN

    const name =
    document.getElementById("productName");


    if(name){

        name.innerText =
        product.name;

    }




    // HÃNG

    const brand =
    document.getElementById("productBrand");


    if(brand){

        brand.innerText =
        product.brand || "";

    }




    // XUẤT XỨ

    const origin =
    document.getElementById("productOrigin");


    if(origin){

        origin.innerText =
        product.origin || "";

    }




    // MÔ TẢ

    const desc =
    document.getElementById("productDesc");


    if(desc){

        desc.innerText =
        product.description || "";

    }



}
