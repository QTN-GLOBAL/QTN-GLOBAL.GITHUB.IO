/* =========================
   NEWS SYSTEM
========================= */

let currentNews = [...newsData];

/* =========================
   FORMAT DATE
========================= */

function formatNewsDate(dateStr){

    const d = new Date(dateStr);

    return d.toLocaleDateString("vi-VN");
}

/* =========================
   RENDER NEWS
========================= */

function renderNews(list){

    const grid =
        document.querySelector(".news-grid");

    if(!grid) return;

    if(list.length === 0){

        grid.innerHTML = `
            <div class="no-news">
                Không có bài viết nào
            </div>
        `;

        return;
    }

    grid.innerHTML = list.map(news => `

        <article class="news-card">

            <img src="${news.image}"
                 alt="${news.title}">

            <div class="news-body">

                <span class="news-date">
                    ${formatNewsDate(news.date)}
                </span>

                <h3>
                    ${news.title}
                </h3>

                <p>
                    ${news.summary}
                </p>

                <a href="news-detail.html?id=${news.id}">
                    Xem chi tiết →
                </a>

            </div>

        </article>

    `).join("");
}

/* =========================
   CATEGORY FILTER
========================= */

function filterNews(category){

    document
        .querySelectorAll(".news-categories li")
        .forEach(li =>
            li.classList.remove("active")
        );

    const active =
        document.querySelector(
            `[data-category="${category}"]`
        );

    if(active){
        active.classList.add("active");
    }

    if(category === "all"){

        currentNews =
            [...newsData];

    }else{

        currentNews =
            newsData.filter(
                n => n.category === category
            );
    }

    renderNews(currentNews);
}

/* =========================
   SEARCH
========================= */

function searchNews(keyword){

    keyword =
        keyword
            .toLowerCase()
            .trim();

    const result =
        newsData.filter(news => {

            const text =
                (
                    news.title +
                    " " +
                    news.summary
                )
                .toLowerCase();

            return text.includes(keyword);

        });

    renderNews(result);
}

/* =========================
   SORT
========================= */

function sortNews(type){

    let sorted =
        [...currentNews];

    if(type === "old"){

        sorted.sort((a,b)=>
            new Date(a.date) -
            new Date(b.date)
        );

    }else{

        sorted.sort((a,b)=>
            new Date(b.date) -
            new Date(a.date)
        );

    }

    renderNews(sorted);
}

/* =========================
   FEATURED NEWS
========================= */

function renderFeaturedNews(){

    const box =
        document.querySelector(
            ".featured-news"
        );

    if(!box) return;

    const featured =
        [...newsData]
        .sort((a,b)=>
            new Date(b.date) -
            new Date(a.date)
        )
        .slice(0,3);

    box.innerHTML =
        featured.map(news => `

        <div class="featured-item"
             onclick="
             location.href=
             'news-detail.html?id=${news.id}'
             ">

            <img src="${news.image}">

            <div>

                <h4>
                    ${news.title}
                </h4>

                <span>
                    ${formatNewsDate(news.date)}
                </span>

            </div>

        </div>

    `).join("");
}

/* =========================
   INIT
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderNews(newsData);

        renderFeaturedNews();

        /* SEARCH */

        const searchInput =
            document.querySelector(
                ".news-toolbar input"
            );

        if(searchInput){

            searchInput.addEventListener(
                "input",
                e => {

                    searchNews(
                        e.target.value
                    );

                }
            );
        }

        /* SORT */

        const sortSelect =
            document.querySelector(
                ".news-toolbar select"
            );

        if(sortSelect){

            sortSelect.addEventListener(
                "change",
                e => {

                    const value =
                        e.target.value;

                    if(
                        value.includes("Cũ")
                    ){
                        sortNews("old");
                    }else{
                        sortNews("new");
                    }

                }
            );
        }

        /* CATEGORY */

        document
            .querySelectorAll(
                ".news-categories li"
            )
            .forEach(li => {

                li.addEventListener(
                    "click",
                    () => {

                        filterNews(
                            li.dataset.category
                        );

                    }
                );

            });

    }
);