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
   ACTIVE TAB
===================================================== */

function setWebsiteActiveTab(page){

    document
        .querySelectorAll(".website-tab")
        .forEach(tab => {

            tab.classList.remove("active");

        });

    const activeTab =
        document.querySelector(
            '.website-tab[data-page="' + page + '"]'
        );

    if(activeTab){

        activeTab.classList.add("active");

    }

}
/* =====================================================
   OPEN PAGE
===================================================== */

function openWebsitePage(page){

    setWebsiteActiveTab(page);

    const render = WEBSITE_PAGES[page];

    if(render){

        render();

    }

}