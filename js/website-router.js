/* =====================================================
   WEBSITE ROUTER
===================================================== */

/* =====================================================
   PAGE MAP
===================================================== */

const WEBSITE_PAGES = {

    products: renderWebsiteProducts,

    categories: renderWebsiteCategories,

    brands: renderWebsiteBrands

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