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
       GALLERY
    ========================= */

    if(
        news.images &&
        news.images.length > 0
    ){

        html += `

        <div class="news-gallery">

            ${news.images.map(img => `

                <img src="${img}"
                     alt="${news.title}">

            `).join("")}

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

    }
);