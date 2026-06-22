function goSearch(keyword) {

    const k = (keyword || "").trim();

    if (!k) return;

    sessionStorage.setItem("searchKeyword", k);

    window.location.href = "index.html";
}

function runSearch() {

    const input = document.getElementById("searchInput");
    if (!input) return;

    goSearch(input.value);
}

/* =========================
   🔥 EVENT DELEGATION (FIX CHẾT NGƯỜI)
========================= */
document.addEventListener("click", function (e) {

    // nút search (KHÔNG phụ thuộc DOM load)
    if (e.target.closest("#searchBtn")) {
        e.preventDefault();
        runSearch();
    }
});

document.addEventListener("keydown", function (e) {

    if (e.key !== "Enter") return;

    const input = document.getElementById("searchInput");

    if (!input) return;

    if (document.activeElement === input) {
        e.preventDefault();
        runSearch();
    }
});