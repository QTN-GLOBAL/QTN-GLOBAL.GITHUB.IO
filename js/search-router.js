/* =========================
   SEARCH ROUTER (SAFE MODE)
   - ONLY HANDLE SEARCH FROM DETAIL
   - NO IMPACT SYSTEM
========================= */

function goSearch(keyword) {

    if (!keyword) return;

    sessionStorage.setItem("searchKeyword", keyword);

    window.location.href = "index.html";
}

/* =========================
   RUN SEARCH FROM INPUT
========================= */
function runSearch() {

    const input = document.getElementById("searchInput");
    if (!input) return;

    const keyword = input.value.trim();

    if (!keyword) return;

    goSearch(keyword);
}

/* =========================
   ENTER KEY SUPPORT
========================= */
document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("searchInput");

    if (!input) return;

    input.addEventListener("keydown", (e) => {

        if (e.key === "Enter") {
            e.preventDefault();
            runSearch();
        }
    });
});