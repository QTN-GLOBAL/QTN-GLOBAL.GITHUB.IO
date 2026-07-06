document.addEventListener("DOMContentLoaded", () => {

    const toggle = document.getElementById("menuToggle");

    const close = document.getElementById("menuClose");

    const nav = document.getElementById("navContent");

    const overlay = document.getElementById("menuOverlay");

    function openMenu(){

        nav.classList.add("show");

        overlay.classList.add("show");
        toggle.classList.add("hide");

        document.body.style.overflow="hidden";

    }

    function closeMenu(){

        nav.classList.remove("show");

        overlay.classList.remove("show");
        toggle.classList.remove("hide");

        document.body.style.overflow="";

    }

    toggle.addEventListener("click", openMenu);

    close.addEventListener("click", closeMenu);

    overlay.addEventListener("click", closeMenu);

    nav.querySelectorAll("a").forEach(link=>{

        link.addEventListener("click", closeMenu);

    });

});