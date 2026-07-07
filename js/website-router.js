/* =====================================================
   WEBSITE ROUTER
===================================================== */

/* =====================================================
   PAGE MAP
===================================================== */

const WEBSITE_PAGES = {

    products: renderWebsiteProducts,

    categories: renderWebsiteCategories,

    brands: renderWebsiteBrands,

    news: renderWebsiteNews,

    languages: renderWebsiteLanguages,

    banner: renderWebsiteBanner,

    business: renderWebsiteBusiness,

    seo: renderWebsiteSEO

};
/* =====================================================
   OPEN PAGE
===================================================== */

function openWebsitePage(page){

    const render = WEBSITE_PAGES[page];

    if(render){

        render();

    }

}