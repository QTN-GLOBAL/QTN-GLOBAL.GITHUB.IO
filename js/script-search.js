function runSearch() {

    const input = document.getElementById("searchInput");
    if (!input) return;

    const keyword = input.value.trim();
    if (!keyword) return;

    sessionStorage.setItem("searchKeyword", keyword);

    window.location.href = "index.html";
}

/* =========================
   ENTER EVENT (FIXED)
========================= */
document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("searchInput");

    if (input) {
        input.addEventListener("keydown", function (e) {

            if (e.key === "Enter") {
                e.preventDefault();
                runSearch();
            }
        });
    }
});