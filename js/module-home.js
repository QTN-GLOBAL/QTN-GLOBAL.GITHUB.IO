/* =====================================================
   HOME MODULE
===================================================== */

function renderHome(){

    const content =
        document.getElementById("dashboardContent");

    if(!content) return;

    content.innerHTML = `

        <h1>Dashboard</h1>

        <p>

            Chào mừng đến với QTN GLOBAL Control Center.

        </p>

        <br>

        <div class="dashboard-cards">

            <div class="info-card">

                <h2>🌐 Website</h2>

                <p>Quản lý Website QTN GLOBAL</p>

            </div>

            <div class="info-card">

                <h2>📈 SEO Center</h2>

                <p>Quản lý Landing Pages</p>

            </div>

            <div class="info-card">

                <h2>🎬 QVZO</h2>

                <p>Nền tảng Video Social</p>

            </div>

        </div>

    `;

}