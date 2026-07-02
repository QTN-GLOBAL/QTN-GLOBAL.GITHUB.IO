/* =========================
   BRAND SLIDER - FINAL FIX (NO MISSING ITEM)
========================= */

let brandIntervals = [];

const VISIBLE = 5;

/* =========================
   INIT
========================= */
function initBrandSliders() {

    const mode =
        window.APP_MODE ?
        window.APP_MODE.mode :
        "home";

    // chỉ khóa ở product grid
    if (
        mode === "search-grid" ||
        mode === "category-grid" ||
        mode === "brand-grid"
    ) {
        return;
    }

    brandIntervals.forEach(clearInterval);
    brandIntervals = [];

    document.querySelectorAll(".brand-track").forEach(track => {

        let items = [];

        try {
            items = JSON.parse(track.dataset.items || "[]");
        } catch (e) {
            items = [];
        }

        if (!Array.isArray(items) || items.length === 0) return;

        // reset index
        track.dataset.index = "0";

        renderBrand(track.id);

        if (items.length <= VISIBLE) return;

        const timer = setInterval(() => {
            moveBrand(track.id, 1);
        }, 6000);

        brandIntervals.push(timer);
    });
}

/* =========================
   RENDER
========================= */
function renderBrand(id) {

    const el = document.getElementById(id);
    if (!el) return;

    let items = [];

    try {
        items = JSON.parse(el.dataset.items || "[]");
    } catch (e) {
        items = [];
    }

    const total = items.length;
    if (total === 0) return;

    let index = Number(el.dataset.index || 0);

    // FIX INDEX SAFE
    if (index >= total) index = 0;
    if (index < 0) index = 0;

    let html = "";

    for (let i = 0; i < Math.min(VISIBLE, total); i++) {

        const realIndex = (index + i) % total;
        const p = items[realIndex];

        if (!p) continue;

        const product = getTranslatedProduct(p) || p;

        html += `
        <div class="product-card">

            <div class="brand-overlay">
                ${formatBrandName(p.brand || "")}
            </div>

            <img src="images/${p.category}/${p.folder}/main.jpg">

            <div class="product-info">

                <h3>${product.name}</h3>

                <div class="product-buttons">

                    <a class="detail-btn"
   href="${(p.brand || '').trim().toUpperCase() === 'AMWAY'
        ? 'amway.html'
        : 'chitiet.html'}?id=${p.id}">
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
}

/* =========================
   MOVE (WRAP SAFE)
========================= */
function moveBrand(id, dir) {

    const el = document.getElementById(id);
    if (!el) return;

    let items = [];

    try {
        items = JSON.parse(el.dataset.items || "[]");
    } catch (e) {
        items = [];
    }

    const total = items.length;
    if (total === 0) return;

    let index = Number(el.dataset.index || 0);

    index = index + dir;

    // WRAP FULL CIRCLE (KHÔNG MẤT ITEM)
    if (index >= total) index = 0;
    if (index < 0) index = total - 1;

    el.dataset.index = index;

    renderBrand(id);
}

/* =========================
   FORMAT
========================= */
function formatBrandName(name) {
    return (name || "")
        .toLowerCase()
        .split(" ")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
}