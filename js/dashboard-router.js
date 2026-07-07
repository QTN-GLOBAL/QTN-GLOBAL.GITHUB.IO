/* =====================================================
   QTN GLOBAL CONTROL CENTER
   DASHBOARD ROUTER
===================================================== */

/* =====================================================
   PAGE MAP
===================================================== */

const DASHBOARD_PAGES = {

    home: renderHome,

    website: renderWebsite,

    seo: renderSEO,

    qvzo: renderQVZO,

    media: renderMedia,

    settings: renderSettings

};

/* =====================================================
   OPEN PAGE
===================================================== */

function openPage(page){

    const render = DASHBOARD_PAGES[page];

    if(render){

        render();

    }

}

/* =====================================================
   DEFAULT PAGE
===================================================== */

document.addEventListener("DOMContentLoaded",()=>{

    openPage("home");

});