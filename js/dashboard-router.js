/* =====================================================
   QTN GLOBAL CONTROL CENTER
   DASHBOARD ROUTER
===================================================== */

/* =====================================================
   PAGE MAP
===================================================== */

const DASHBOARD_PAGES = {

    dashboard: renderDashboard,

    website: renderWebsite

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

    openPage("dashboard");

});