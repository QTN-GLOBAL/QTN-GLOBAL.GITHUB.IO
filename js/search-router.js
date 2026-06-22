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
   SAFE BIND (FIXED)
========================= */
function bindSearchEvents() {

    const input = document.getElementById("searchInput");
    const btn = document.getElementById("searchBtn");

    // ENTER
    if (input && !input.dataset.bound) {

        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                runSearch();
            }
        });

        input.dataset.bound = "1";
    }

    // CLICK
    if (btn && !btn.dataset.bound) {

        btn.addEventListener("click", (e) => {
            e.preventDefault();
            runSearch();
        });

        btn.dataset.bound = "1";
    }
}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", bindSearchEvents);

/* =========================
   🔥 GLOBAL SAFETY (QUAN TRỌNG)
   FIX TRƯỜNG HỢP HEADER LOAD LATE
========================= */
setInterval(bindSearchEvents, 1000);