function runSearch() {

    const input = document.getElementById("searchInput");
    if (!input) return;

    const keyword = (input.value || "").trim();
    if (!keyword) return;

    sessionStorage.setItem("searchKeyword", keyword);

    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("searchInput");
    if (!input) return;

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            runSearch();
        }
    });

    const btn = document.querySelector(".search-btn, .search-icon");
    if (btn) btn.addEventListener("click", runSearch);
});