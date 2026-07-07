/* =========================
   ADMIN ENTRY
   - Open Admin Login
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const adminEntry =
        document.getElementById("admin-entry");

    if (!adminEntry) return;

    adminEntry.addEventListener("click", () => {

        window.location.href = "admin/admin.html";

    });

});