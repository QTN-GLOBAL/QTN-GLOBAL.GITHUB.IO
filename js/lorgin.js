/* =====================================================
   QTN GLOBAL CONTROL CENTER
   ADMIN LOGIN
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");

    if (!form) return;

    form.addEventListener("submit", loginAdmin);

});


/* =====================================================
   LOGIN
===================================================== */

function loginAdmin(event) {

    event.preventDefault();

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    /* =========================
       TEMP ACCOUNT
    ========================= */

    const ADMIN_USERNAME = "admin";

    const ADMIN_PASSWORD = "123456";


    if (
        username === ADMIN_USERNAME &&
        password === ADMIN_PASSWORD
    ) {

        window.location.href = "dashboard.html";

        return;

    }

    alert("Sai tài khoản hoặc mật khẩu.");

}