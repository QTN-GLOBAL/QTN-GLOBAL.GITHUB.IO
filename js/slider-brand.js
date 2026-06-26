
/* =========================
   BRAND SLIDER MODULE (FINAL FIX)
   MATCH YOUR script-home.js
========================= */

let brandIntervals = [];

const VISIBLE = 3;

/* =========================
   MAIN INIT
========================= */
function initBrandSliders() {

    // clear old intervals
    brandIntervals.forEach(clearInterval);
    brandIntervals = [];

    document.querySelectorAll(".brand-track").forEach(track => {

        const items = JSON.parse(track.dataset.items || "[]");

        if (!items.length) return;

        renderBrand(track.id);

        if (items.length <= VISIBLE) return;

        const timer = setInterval(() => {
            moveBrand(track.id, 1);
        }, 7000);

        brandIntervals.push(timer);
    });
}

/* =========================
   RENDER SLIDER
========================= */
function renderBrand(id) {

    const el = document.getElementById(id);
    if (!el) return;

    const items = JSON.parse(el.dataset.items || "[]");

    let index = Number(el.dataset.index || 0);
    const total = items.length;

    if (total === 0) return;

    if (index > total - VISIBLE) {
        index = Math.max(total - VISIBLE, 0);
    }

    let html = "";

    for (let i = 0; i < Math.min(VISIBLE, total); i++) {

        const realIndex = (index + i) % total;
        const p = items[realIndex];

        const product = getTranslatedProduct(p) || p;

        html += `
        <div class="product-card">

            <div class="brand-overlay">
                ${formatBrandName(p.brand)}
            </div>

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

        </div>
        `;
    }

    el.innerHTML = html;
    el.dataset.index = index;
}

/* =========================
   MOVE SLIDER
========================= */
function moveBrand(id, dir) {

    const el = document.getElementById(id);
    if (!el) return;

    const items = JSON.parse(el.dataset.items || "[]");

    const total = items.length;

    let index = Number(el.dataset.index || 0);

    index += VISIBLE * dir;

    if (index > total - VISIBLE) {
        index = 0;
    }

    if (index < 0) {
        index = Math.max(total - VISIBLE, 0);
    }

    el.dataset.index = index;

    renderBrand(id);
}

/* =========================
   FORMAT BRAND NAME
========================= */
function formatBrandName(name) {

    return (name || "")
        .toLowerCase()
        .split(" ")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
}