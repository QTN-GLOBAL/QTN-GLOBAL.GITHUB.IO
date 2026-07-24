(function (window) {

    "use strict";

    const ProductWizardView = {};

    ProductWizardView.render = function(step){

        const container =
            document.getElementById("productWizardContainer");

        if(!container) return;

        switch(step){

            case 0:
                container.innerHTML = Step0.render();
                break;

            case 1:
                container.innerHTML = Step1.render();
                break;

            case 2:
                container.innerHTML = Step2.render();
                break;

            case 3:
                container.innerHTML = Step3.render();
                break;

            case 4:
                container.innerHTML = Step4.render();
                break;

            case 5:
                container.innerHTML = Step5.render();
                break;

            case 6:
                container.innerHTML = Step6.render();
                break;

        }

    };

    document.addEventListener("wizard:change",function(e){

        ProductWizardView.render(e.detail.step);

    });

    window.ProductWizardView = ProductWizardView;

})(window);