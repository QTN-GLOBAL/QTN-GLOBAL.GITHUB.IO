/* =====================================================
   QTN GLOBAL CMS
   SHARED EDITOR LAYOUT
===================================================== */

/* =====================================================
   RENDER EDITOR
===================================================== */

function renderEditorLayout(options = {}) {

    return `

        <div class="editor-layout">

            <!-- =====================================
                 HEADER
            ====================================== -->

            <div class="editor-header">

                <div>

                    <h2>

                        ${options.title || "Editor"}

                    </h2>

                    <p>

                        ${options.description || ""}

                    </p>

                </div>

                <button
                    class="editor-close-btn"
                    onclick="${options.onClose || ""}">

                    ✕

                </button>

            </div>

            <!-- =====================================
                 BODY
            ====================================== -->

            <div class="editor-body">

                ${options.body || ""}

            </div>

            <!-- =====================================
                 FOOTER
            ====================================== -->

            <div class="editor-footer">

                ${options.footer || ""}

            </div>

        </div>

    `;

}