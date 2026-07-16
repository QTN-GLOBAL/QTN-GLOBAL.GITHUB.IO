/* =====================================================
   HERO SLIDER
===================================================== */

let heroIndex = 0;
let heroSlides = [];
let heroTimer = null;

/* =====================================================
   HEADER INFO DATA
===================================================== */

const HEADER_INFO = [

{
    title: "QTN GLOBAL",

    items: [

        "✔ Chính xác trong từng giá trị",

        "✔ Thiết bị đo lường chất lượng cao",

        "✔ Đại lý chính hãng Excell - Ohaus - Jadever",

        "✔ Giải pháp cân điện tử cho doanh nghiệp",

        "✔ Hỗ trợ kỹ thuật toàn quốc"

    ]
},

{
    title: "THIẾT BỊ ĐO LƯỜNG",

    items: [

        "✔ Cân điện tử",

        "✔ Đầu cân điện tử",

        "✔ Cảm biến lực",

        "✔ Quả cân chuẩn",

        "✔ Thiết bị phòng thí nghiệm"

    ]
},

{
    title: "QTN GLOBAL",

    items: [

        "✔ Uy tín",

        "✔ Chuyên nghiệp",

        "✔ Chính hãng",

        "✔ Giá cạnh tranh",

        "✔ Bảo hành toàn quốc"

    ]
}

];

let headerInfoIndex = 0;
let headerInfoTimer = null;

/* =====================================================
   HERO SLIDER
===================================================== */

function initHeroSlider(){

    if(heroTimer){

        clearInterval(heroTimer);

    }

    if(

        window.APP_MODE &&
        window.APP_MODE.mode !== "home"

    ){

        return;

    }

    const track = document.getElementById("slider-track");
    const dots  = document.getElementById("slider-dots");

    if(!track || !dots) return;

    heroSlides = getProducts()

        .filter(p =>

            (p.brand || "").toLowerCase().includes("excell")

        )

        .map(p =>

            `images/${p.category}/${p.folder}/main.jpg`

        );

    if(heroSlides.length === 0){

        return;

    }

    heroIndex = 0;

    track.innerHTML = "";
    dots.innerHTML = "";

    heroSlides.forEach((src,index)=>{

        const img = document.createElement("img");

        img.src = src;

        if(index===0){

            img.classList.add("active");

        }

        track.appendChild(img);

        const dot = document.createElement("div");

        dot.className = "slider-dot";

        if(index===0){

            dot.classList.add("active");

        }

        dot.onclick = ()=>{

            showHeroSlide(index);

        };

        dots.appendChild(dot);

    });

    function showHeroSlide(index){

        heroIndex = index;

        track.querySelectorAll("img").forEach(img=>{

            img.classList.remove("active");

        });

        dots.querySelectorAll(".slider-dot").forEach(dot=>{

            dot.classList.remove("active");

        });

        track.querySelectorAll("img")[heroIndex].classList.add("active");

        dots.querySelectorAll(".slider-dot")[heroIndex].classList.add("active");

    }

    heroTimer = setInterval(()=>{

        heroIndex++;

        if(heroIndex>=heroSlides.length){

            heroIndex=0;

        }

        showHeroSlide(heroIndex);

    },5000);

    initHeaderInfo();

}

/* =====================================================
   HEADER INFO
===================================================== */

function initHeaderInfo(){

    const title = document.getElementById("headerTitle");
    const list  = document.getElementById("headerList");

    if(!title || !list){

        return;

    }

    if(headerInfoTimer){

        clearInterval(headerInfoTimer);

    }

    function render(){

        const data = HEADER_INFO[headerInfoIndex];

        title.style.opacity = 0;

        list.innerHTML = "";

        setTimeout(()=>{

            title.textContent = data.title;

            title.style.opacity = 1;

            data.items.forEach((text,index)=>{

                const li = document.createElement("li");

                li.textContent = text;

                list.appendChild(li);

                setTimeout(()=>{

                    li.classList.add("show");

                },index*450);

            });

        },250);

        headerInfoIndex++;

        if(headerInfoIndex>=HEADER_INFO.length){

            headerInfoIndex=0;

        }

    }

    render();

    headerInfoTimer = setInterval(render,7000);

}