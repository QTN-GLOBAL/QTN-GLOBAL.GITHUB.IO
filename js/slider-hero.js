let heroIndex = 0;
let heroSlides = [];
let heroTimer = null;

function initHeroSlider(){
if (
        window.APP_MODE &&
        window.APP_MODE.mode !== "home"
    ) {
        return;
    }

    const track = document.getElementById("slider-track");
    const dots = document.getElementById("slider-dots");

    if(!track || !dots) return;

    heroSlides = getProducts()
        .filter(p => p.brand?.toLowerCase().includes("excell"))
        .map(p => `images/${p.category}/${p.folder}/main.jpg`);

    track.innerHTML = "";
    dots.innerHTML = "";

    heroSlides.forEach((src, i) => {

        const img = document.createElement("img");
        img.src = src;
        if(i === 0) img.classList.add("active");

        track.appendChild(img);

        const dot = document.createElement("div");
        dot.className = "slider-dot";
        if(i === 0) dot.classList.add("active");

        dot.onclick = () => showHeroSlide(i);

        dots.appendChild(dot);
    });

    function showHeroSlide(i){

        heroIndex = i;

        const images = track.querySelectorAll("img");
        const dotsList = dots.querySelectorAll(".slider-dot");

        images.forEach(img => img.classList.remove("active"));
        dotsList.forEach(d => d.classList.remove("active"));

        images[i].classList.add("active");
        dotsList[i].classList.add("active");
    }

    heroTimer = setInterval(() => {

        heroIndex++;

        if(heroIndex >= heroSlides.length){
            heroIndex = 0;
        }

        showHeroSlide(heroIndex);

    }, 5000);
}