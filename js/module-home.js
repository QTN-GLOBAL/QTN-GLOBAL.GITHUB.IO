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

            Quản lý toàn bộ Website, SEO và hệ thống QVZO từ một nơi duy nhất.

        </p>

    </div>

    <div class="dashboard-cards">

        <div class="info-card">

            <h2>🌐 WEBSITE</h2>

            <p>

                Quản lý sản phẩm, danh mục,
                thương hiệu và ngôn ngữ.

            </p>

            <button onclick="openPage('website')">

                VÀO MODULE

            </button>

        </div>

        <div class="info-card">

            <h2>📈 SEO CENTER</h2>

            <p>

                Landing Pages, Meta,
                Sitemap và Google SEO.

            </p>

            <button onclick="openPage('seo')">

                VÀO MODULE

            </button>

        </div>

        <div class="info-card">

            <h2>🎬 QVZO</h2>

            <p>

                Quản lý nền tảng video,
                người dùng và nội dung.

            </p>

            <button onclick="openPage('qvzo')">

                VÀO MODULE

            </button>

        </div>

        <div class="info-card">

            <h2>⚙ SYSTEM</h2>

            <p>

                Media, cấu hình,
                sao lưu và nhật ký hệ thống.

            </p>

            <button onclick="openPage('settings')">

                VÀO MODULE

            </button>

        </div>

    </div>

    `;

}