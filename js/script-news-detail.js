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
   YOUTUBE THUMBNAIL
========================= */

function getYoutubeThumbnail(url){

    if(!url) return "";

    let videoId = "";

    if(url.includes("youtu.be/")){

        videoId = url.split("youtu.be/")[1].split("?")[0];

    }else if(url.includes("watch?v=")){

        videoId = url.split("watch?v=")[1].split("&")[0];

    }

    if(!videoId) return "";

    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
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

    const hasImages =
    news.images &&
    news.images.length > 0;

const hasYoutube =
    news.youtube &&
    news.youtube.trim() !== "";

if(hasImages || hasYoutube){

    html += `
    <div class="news-slider">
    `;

    if(hasImages){

        html += `
            <img id="newsMainImage"
                 class="news-main-image"
                 src="${news.images[0]}"
                 alt="${news.title}">
        `;

    }else{

        html += `
            <a href="${news.youtube}"
               target="_blank">

                <img class="news-main-image"
                     src="${getYoutubeThumbnail(news.youtube)}"
                     alt="${news.title}">

            </a>
        `;
    }

    html += `
        <div class="news-thumb-list">
    `;

    if(hasImages){

        html += news.images.map((img,index)=>`

            <img src="${img}"
                 data-index="${index}"
                 onclick="changeNewsImage(${index})"
                 class="${index===0?"active":""}">

        `).join("");

    }

    if(hasYoutube){

        html += `
            <a href="${news.youtube}"
   target="_blank"
   class="news-video-cover">

    <img
        class="news-main-image"
        src="${getYoutubeThumbnail(news.youtube)}"
        alt="${news.title}">

    <span class="news-play-btn">
    <span class="play-icon"></span>
</span>

</a>
        `;
    }

    html += `
        </div>
    </div>
    `;
}
/* =========================
   CONTENT
========================= */

const paragraphs = news.content.split("</p>");

if (paragraphs.length >= 2 && news.images.length > 1) {

    html += paragraphs[0] + "</p>";

    html += `
        <img
            src="${news.images[1]}"
            class="news-content-image"
            alt="${news.title}">
    `;

    html += paragraphs.slice(1).join("</p>");

} else {

    html += news.content;

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