function goSearch(keyword) {

    const k = (keyword || "").trim();

    if (!k) return;

    sessionStorage.setItem("searchKeyword", k);

    window.location.href = "index.html";
}

/* =========================
   RUN SEARCH
========================= */
function runSearch() {

    const input = document.getElementById("searchInput");

    const keyword = input ? input.value : "";

    goSearch(keyword);
}

/* =========================
   INIT EVENTS SAFE
========================= */
document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("searchInput");

    if (input) {

        // Enter key
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                runSearch();
            }
        });
    }

    // 🔥 FIX QUAN TRỌNG: hỗ trợ button search
    const btn = document.getElementById("searchBtn");

    if (btn) {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            runSearch();
        });
    }
});