/* =========================
   GET NEWS ID
========================= */

const newsId =
    Number(
        new URLSearchParams(
            location.search
        ).get("id")
    );

/* =========================
   GET NEWS
========================= */

const rawNews =
    newsData.find(
        n => n.id === newsId
    );

if(!rawNews){
    location.href = "news.html";
}

/* =========================
   I18N NEWS
========================= */

function getCurrentNews(){

    const lang =
        localStorage.getItem("language") || "vi";

    if(
        typeof newsTranslations !== "undefined" &&
        newsTranslations[lang] &&
        newsTranslations[lang][rawNews.id]
    ){

        return {
            ...rawNews,
            ...newsTranslations[lang][rawNews.id]
        };
    }

    return rawNews;
}

/* =========================
   NEWS SLIDER
========================= */

let currentNewsImage = 0;

window.changeNewsImage = function(index){

    const news =
        getCurrentNews();

    currentNewsImage = index;

    const mainImage =
        document.getElementById(
            "newsMainImage"
        );

    if(mainImage){
        mainImage.src =
            news.images[index];
    }

    document
        .querySelectorAll(
            ".news-thumb-list img"
        )
        .forEach(img =>
            img.classList.remove("active")
        );

    const active =
        document.querySelector(
            `.news-thumb-list img[data-index="${index}"]`
        );

    if(active){
        active.classList.add("active");
    }
};

function startNewsSlider(){

    const news =
        getCurrentNews();

    if(
        !news.images ||
        news.images.length <= 1
    ){
        return;
    }

    setInterval(()=>{

        currentNewsImage++;

        if(
            currentNewsImage >=
            news.images.length
        ){
            currentNewsImage = 0;
        }

        changeNewsImage(
            currentNewsImage
        );

    },3000);
}

/* =========================
   RENDER
========================= */

function renderNewsDetail(){

    const news =
        getCurrentNews();

    document.title =
        news.title + " | QTN GLOBAL";

    document.getElementById(
        "newsTitle"
    ).innerText =
        news.title;

    document.getElementById(
        "newsDate"
    ).innerText =
        new Date(
            news.date
        ).toLocaleDateString();

    let html = "";

    /* =========================
       GALLERY SLIDER
    ========================= */

    if(
        news.images &&
        news.images.length > 0
    ){

        html += `

        <div class="news-slider">

            <img id="newsMainImage"
                 class="news-main-image"
                 src="${news.images[0]}"
                 alt="${news.title}">

            <div class="news-thumb-list">

                ${news.images.map((img,index)=>`

                    <img src="${img}"
                         data-index="${index}"
                         onclick="changeNewsImage(${index})"
                         class="${
                            index === 0
                            ? "active"
                            : ""
                         }">

                `).join("")}

            </div>

        </div>

        `;
    }

    /* =========================
       CONTENT
    ========================= */

    html += news.content;

    /* =========================
       YOUTUBE
    ========================= */

    if(
        news.youtube &&
        news.youtube.trim() !== ""
    ){

        html += `

        <div class="news-video">

            <a href="${news.youtube}"
               target="_blank"
               class="youtube-btn">

                ▶ Xem video trên YouTube

            </a>

        </div>

        `;
    }

    document.getElementById(
        "newsContent"
    ).innerHTML = html;
}

/* =========================
   INIT
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderNewsDetail();

        setTimeout(
            startNewsSlider,
            300
        );

    }
);