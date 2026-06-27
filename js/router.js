/* =========================
   ROUTER CORE (DỨT ĐIỂM)
   - không sessionStorage rải rác
   - 1 nơi điều khiển toàn bộ UI
========================= */

function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
}

function initRouter() {

    const business = getParam("business");
    const category = getParam("category");
    const search = getParam("search");

    console.log("ROUTER:", { business, category, search });

    // ================= SEARCH =================
    if (search) {
        window.APP_MODE.mode = "search";

        const products = SearchSystem.filter(getProducts(), search);

        renderList(products, search);

        return;
    }

    // ================= BUSINESS =================
    if (business) {

    const all = getProducts();

    const products = all.filter(p =>
        (p.business || "").trim().toLowerCase() === business.trim().toLowerCase()
    );

    window.APP_MODE.mode = "business";

    if (!products.length) {
        document.getElementById("homeContainer").innerHTML = `
            <div class="empty-products">
                <h2>SẢN PHẨM ĐANG CẬP NHẬT</h2>
            </div>
        `;
        return;
    }

    // QUAN TRỌNG: CHỈ render HOME FILTERED, KHÔNG gọi init lung tung khác
    renderHomeByBrandFiltered(products);

    // đảm bảo slider chạy lại
    setTimeout(() => {
        initBrandSliders();
    }, 0);

    return;
}

    // ================= CATEGORY =================
    if (category) {
        window.APP_MODE.mode = "category";

        const products = getProducts().filter(
            p => normalize(p.category) === normalize(category)
        );

        renderList(products, category);

        return;
    }

    // ================= HOME =================
    window.APP_MODE.mode = "home";

    renderHomeByBrand();
    initHeroSlider();
    initBrandSliders();
}

/* =========================
   EMPTY STATE
========================= */

function renderEmpty() {
    document.getElementById("homeContainer").innerHTML = `
        <div class="empty-products">
            <h2>SẢN PHẨM ĐANG CẬP NHẬT</h2>
            <p>Vui lòng quay lại sau.</p>
        </div>
    `;
}

/* =========================
   LIST VIEW (GRID)
========================= */

function renderList(products, title) {

    const container = document.getElementById("homeContainer");
    if (!container) return;

    container.innerHTML = `
        <div class="list-header">
            <button onclick="goHome()">Home</button>
            <h2>${title}</h2>
        </div>

        <div class="product-grid">
            ${products.map(p => `
                <div class="product-card">
                    <img src="images/${p.category}/${p.folder}/main.jpg">
                    <h3>${p.name}</h3>
                </div>
            `).join("")}
        </div>
    `;
}

/* =========================
   NAV FUNCTIONS
========================= */

function goBusiness(business) {
    window.location.href = `index.html?business=${business}`;
}

function goCategory(category) {
    window.location.href = `index.html?category=${category}`;
}

function goSearch(keyword) {
    window.location.href = `index.html?search=${keyword}`;
}

function goHome() {
    window.location.href = "index.html";
}