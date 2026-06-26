let brandIntervals = [];

function renderBrandSlider(id){

    const el = document.getElementById(id);
    if(!el) return;

    const items = JSON.parse(el.dataset.items || "[]");
    let index = Number(el.dataset.index || 0);

    const total = items.length;
    if(total === 0) return;

    let html = "";

    for(let i = 0; i < Math.min(3, total); i++){

        const p = items[(index + i) % total];
        const product = getTranslatedProduct(p) || p;

        html += `
        <div class="product-card">

            <img src="images/${p.category}/${p.folder}/main.jpg">

            <div class="product-info">

                <h3>${product.name}</h3>

                <div class="product-buttons">

                    <a class="detail-btn" href="chitiet.html?id=${p.id}">
                        ${t("detailBtn")}
                    </a>

                    <button class="quote-btn" onclick="showQuote(${p.id})">
                        ${t("quoteBtn")}
                    </button>

                </div>

            </div>

        </div>`;
    }

    el.innerHTML = html;
}

function moveBrandSlider(id, dir){

    const el = document.getElementById(id);
    if(!el) return;

    const items = JSON.parse(el.dataset.items || "[]");

    let index = Number(el.dataset.index || 0);

    index += 3 * dir;

    if(index >= items.length) index = 0;
    if(index < 0) index = Math.max(items.length - 3, 0);

    el.dataset.index = index;

    renderBrandSlider(id);
}

function startBrandSliders(){

    document.querySelectorAll(".brand-track").forEach(el => {

        const items = JSON.parse(el.dataset.items || "[]");

        if(items.length === 0) return;

        renderBrandSlider(el.id);

        if(items.length <= 3) return;

        const timer = setInterval(() => {
            moveBrandSlider(el.id, 1);
        }, 7000);

        brandIntervals.push(timer);
    });
}