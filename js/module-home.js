/* =====================================================
   HOME MODULE
===================================================== */

function renderHome() {

    const content = document.getElementById("dashboardContent");

    if (!content) return;

    content.innerHTML = `

        <div class="home-header">

            <h1>Xin chào, Admin 👋</h1>

            <p>

                Chào mừng đến với QTN GLOBAL Control Center.

            </p>

            <p>

                Đây là trung tâm quản trị toàn bộ hệ thống QTN GLOBAL.

            </p>

        </div>

    `;

}