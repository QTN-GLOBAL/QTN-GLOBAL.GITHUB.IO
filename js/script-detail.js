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
/* =====================================================
   PART 2:
   PRODUCT IMAGE SLIDER

   Chức năng:
   - Ảnh chính
   - Thumbnail
   - Click đổi ảnh
===================================================== */



if(product){



    // =================================================
    // TẠO DANH SÁCH ẢNH
    // =================================================


    const imageList = [];


    for(let i = 1; i <= 5; i++){


        imageList.push(

            `images/${product.category}/${product.folder}/${i}.jpg`

        );


    }





    // =================================================
    // HIỂN THỊ ẢNH CHÍNH
    // =================================================


    const mainImage =
    document.getElementById("mainImage");



    if(mainImage){


        mainImage.src =
        imageList[0];


    }






    // =================================================
    // TẠO THUMBNAIL
    // =================================================


    const thumbList =
    document.getElementById("thumbList");



    if(thumbList){



        let html = "";



        imageList.forEach((img,index)=>{



            html += `

            <img 
                src="${img}"
                data-index="${index}"
                onclick="changeDetailImage(${index})"
                onerror="this.style.display='none'"
            >

            `;


        });



        thumbList.innerHTML =
        html;


    }





    // =================================================
    // ĐỔI ẢNH KHI CLICK
    // =================================================


    window.changeDetailImage =
    function(index){



        if(mainImage){


            mainImage.src =
            imageList[index];


        }



        document
        .querySelectorAll("#thumbList img")
        .forEach(img=>{


            img.classList.remove("active");


        });




        const active =
        document.querySelector(
            '#thumbList img[data-index="' + index + '"]'
        );



        if(active){


            active.classList.add("active");


        }


    };






    // =================================================
    // ACTIVE ẢNH ĐẦU TIÊN
    // =================================================


    setTimeout(()=>{


        const first =
        document.querySelector("#thumbList img");



        if(first){


            first.classList.add("active");


        }



    },100);



}