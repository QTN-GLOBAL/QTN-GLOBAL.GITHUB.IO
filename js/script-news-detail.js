const newsId =
    Number(
        new URLSearchParams(
            location.search
        ).get("id")
    );

const rawNews =
    newsData.find(
        n => n.id === newsId
    );

const news =
    rawNews
        ? getTranslatedNews(rawNews)
        : null;

if(news){

    document.getElementById(
        "newsTitle"
    ).innerHTML =
        news.title;

    document.getElementById(
        "newsDate"
    ).innerHTML =
        news.date;

    document.getElementById(
        "newsContent"
    ).innerHTML =
        news.content;
}