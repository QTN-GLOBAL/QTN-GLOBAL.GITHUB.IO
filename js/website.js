/* =====================================================
   WEBSITE MODULE
===================================================== */

function renderWebsite() {

    const content = document.getElementById("dashboardContent");

    if (!content) return;

    content.innerHTML = `

        <div class="website-header">

            <h1>🌐 Website</h1>

            <p>

                Quản lý toàn bộ Website QTN GLOBAL.

            </p>

        </div>

    `;

}