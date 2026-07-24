/*****************************************************************
 * QTN GLOBAL CMS
 * Module : Step 5 - SEO
 * File   : step5-seo.js
 * Version: 1.0.0
 *****************************************************************/

(function (window) {

    "use strict";

    const Step5 = {};

    //==========================================================
    // Render
    //==========================================================

    Step5.render = function () {

        document.dispatchEvent(

            new CustomEvent("step5:render",{

                detail:window.draftProduct.seo

            })

        );

    };

    //==========================================================
    // Generate
    //==========================================================

    Step5.generate = function(){

        const draft=window.draftProduct;

        if(!draft.seo.title){

            draft.seo.title=draft.basic.name;

        }

        if(!draft.seo.description){

            draft.seo.description=draft.basic.description;

        }

        if(!draft.seo.slug){

            draft.seo.slug=draft.basic.slug;

        }

        if(!draft.seo.ogTitle){

            draft.seo.ogTitle=draft.seo.title;

        }

        if(!draft.seo.ogDescription){

            draft.seo.ogDescription=draft.seo.description;

        }

        if(!draft.seo.ogImage){

            const main=draft.media.images.find(i=>i.isMain);

            if(main){

                draft.seo.ogImage=main.file || main.name;

            }

        }

    };

    //==========================================================
    // Save
    //==========================================================

    Step5.save=function(data){

        Object.assign(window.draftProduct.seo,data);

        document.dispatchEvent(

            new CustomEvent("product:seoChanged",{

                detail:window.draftProduct

            })

        );

    };

    //==========================================================
    // Wizard
    //==========================================================

    document.addEventListener("wizard:change",function(e){

        if(e.detail.step===5){

            Step5.generate();

            Step5.render();

        }

    });

    //==========================================================
    // Export
    //==========================================================

    window.Step5=Step5;

})(window);