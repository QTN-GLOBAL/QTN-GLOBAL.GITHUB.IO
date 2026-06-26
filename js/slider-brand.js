/* =========================
   BRAND SLIDER MODULE (FINAL FIX - STABLE PRODUCTION)
   - circular infinite
   - no missing items
   - safe index handling
========================= */

let brandIntervals = [];

const VISIBLE = 3;

/* =========================
   INIT
========================= */
function initBrandSliders() {

    // clear old intervals
    brandIntervals.forEach(clearInterval);
    brandIntervals = [];

    document.querySelectorAll(".brand-track").forEach(track => {

        const items = JSON.parse(track.dataset.items || "[]");

        if (!items.length) return;

        // init index
        if (!track.dataset.index) {
            track.dataset.index = 0;
        }

        renderBrand(track.id);

        if (items.length <= VISIBLE) return;

        const timer = setInterval(() => {
            moveBrand(track.id, 1);
        }, 7000);

        brandIntervals.push(timer);
    });
}

/* =========================
   RENDER
========================= */
function renderBrand(id) {

    const el = document.getElementById(id);
    if (!el) return;

    const items = JSON.parse(el.dataset.items || "[]");
    const total = items.length;

    if (!total) return;

    let index = Number(el.dataset.index || 0);

    // normalize index
    if (index < 0) index = 0;
    if (index >= total) index = 0;

    let html = "";

    // always show VISIBLE items in circular mode
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

        </div>`;
    }

    el.innerHTML = html;
    el.dataset.index = index;
}

/* =========================
   MOVE (CIRCULAR FIX)
========================= */
function moveBrand(id, dir) {

    const el = document.getElementById(id);
    if (!el) return;

    const items = JSON.parse(el.dataset.items || "[]");
    const total = items.length;

    if (!total) return;

    let index = Number(el.dataset.index || 0);

    index += VISIBLE * dir;

    // circular logic (SAFE)
    if (index < 0) {
        index = total - VISIBLE;
        if (index < 0) index = 0;
    }

    if (index >= total) {
        index = 0;
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