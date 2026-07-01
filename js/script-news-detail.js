/* =========================
   NEWS DETAIL
========================= */

const newsId = Number(
    new URLSearchParams(
        location.search
    ).get("id")
);

const news =
    newsData.find(
        n => n.id === newsId
    );

/* =========================
   RENDER
========================= */

if(news){

    document.title =
        news.title +
        " | QTN GLOBAL";

    const container =
        document.getElementById(
            "newsContent"
        );

    if(container){

        container.innerHTML = `

            <article class="news-detail">

                <h1>
                    ${news.title}
                </h1>

                <div class="news-detail-date">

                    ${new Date(
                        news.date
                    ).toLocaleDateString("vi-VN")}

                </div>

                <div id="newsGallery"
                     class="news-gallery">
                </div>

                <div class="news-detail-content">

                    ${news.content}

                </div>

                <div id="newsVideo">
                </div>

            </article>

        `;

        renderNewsGallery();

        renderYoutube();
    }
}

/* =========================
   GALLERY
========================= */

function renderNewsGallery(){

    if(
        !news ||
        !news.images ||
        news.images.length === 0
    ){
        return;
    }

    const gallery =
        document.getElementById(
            "newsGallery"
        );

    if(!gallery) return;

    gallery.innerHTML =
        news.images.map(img => `

            <img src="${img}"
                 alt="${news.title}">

        `).join("");
}

/* =========================
   YOUTUBE
========================= */

function renderYoutube(){

    if(
        !news ||
        !news.youtube
    ){
        return;
    }

    const videoBox =
        document.getElementById(
            "newsVideo"
        );

    if(!videoBox) return;

    videoBox.innerHTML = `

        <a class="youtube-btn"
           href="${news.youtube}"
           target="_blank">

            ▶ Xem video liên quan

        </a>

    `;
}