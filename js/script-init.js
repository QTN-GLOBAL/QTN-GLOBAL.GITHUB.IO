document.addEventListener("DOMContentLoaded", () => {

    renderProducts(getProducts());
    updateCartCount();

    if (typeof initExcellSlider === "function") {
        initExcellSlider();
    }

    const openCart = sessionStorage.getItem("openCart");

    if (openCart === "1") {
        sessionStorage.removeItem("openCart");
        if (typeof openCart === "function") openCart();
    }
});
