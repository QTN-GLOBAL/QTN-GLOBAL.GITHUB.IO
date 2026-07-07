/* =====================================================
   WEBSITE MODULE
===================================================== */

function renderWebsite() {

    const content =
        document.getElementById("dashboardContent");

    if (!content) return;

    content.innerHTML = `

        <h1>🌐 WEBSITE</h1>

        <p>

            Đây là module quản lý Website QTN GLOBAL.

        </p>

        <button onclick="openPage('home')">

            ← Quay về Home

        </button>

    `;

}