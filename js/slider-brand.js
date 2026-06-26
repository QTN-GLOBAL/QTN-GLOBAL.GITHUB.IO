/* =========================
   BRAND SLIDER MODULE (CLEAN)
   - FIX FULL ITEM LOSS
   - SAFE LOOP
   - NO HERO CONFLICT
========================= */

let brandIntervals = [];

/* =========================
   RENDER SLIDER
========================= */
function renderBrandSlider(id) {

    const el = document.getElementById(id);
    if (!el) return;

    const items = JSON.parse(el.dataset.items || "[]");

    let index = Number(el.dataset.index || 0);
    const total = items.length;

    if (total === 0) return;

    const visible = 3;

    // đảm bảo index luôn hợp lệ
    if (index > total - visible) {
        index = Math.max(total - visible, 0);
    }

    let html = "";

    for (let i = 0; i < visible; i++) {

        const realIndex = (index + i) % total;
        const p = items[realIndex];

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

        </div>
        `;
    }

    el.innerHTML = html;
    el.dataset.index = index;
}

/* =========================
   MOVE SLIDER
========================= */
function moveBrandSlider(id, dir) {

    const el = document.getElementById(id);
    if (!el) return;

    const items = JSON.parse(el.dataset.items || "[]");
    const total = items.length;

    let index = Number(el.dataset.index || 0);

    const visible = 3;

    index += visible * dir;

    // LOOP an toàn (không bị mất item cuối)
    if (index > total - visible) {
        index = 0;
    }

    if (index < 0) {
        index = Math.max(total - visible, 0);
    }

    el.dataset.index = index;

    renderBrandSlider(id);
}

/* =========================
   AUTO START SLIDER
========================= */
function startBrandSliders() {

    // clear interval cũ (TRÁNH CHẠY CHỒNG)
    brandIntervals.forEach(clearInterval);
    brandIntervals = [];

    document.querySelectorAll(".brand-track").forEach(el => {

        const items = JSON.parse(el.dataset.items || "[]");

        if (!items.length) return;

        // render lần đầu
        renderBrandSlider(el.id);

        // nếu <= 3 thì không auto chạy
        if (items.length <= 3) return;

        const timer = setInterval(() => {
            moveBrandSlider(el.id, 1);
        }, 7000);

        brandIntervals.push(timer);
    });
}

/* =========================
   RESET (OPTIONAL SAFE CALL)
========================= */
function stopBrandSliders() {
    brandIntervals.forEach(clearInterval);
    brandIntervals = [];
}