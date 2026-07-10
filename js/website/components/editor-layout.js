/* =====================================================
   QTN GLOBAL CMS
   UNIVERSAL EDITOR LAYOUT
===================================================== */

function renderEditorLayout(options = {}) {

    return `

        <div class="editor-layout">

            <!-- HEADER -->

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

            <!-- CONTENT -->

            <div class="editor-content">

                <div class="editor-left">

                    ${options.left || ""}

                </div>

                <div class="editor-right">

                    ${options.right || ""}

                </div>

            </div>

            <!-- BOTTOM -->

            <div class="editor-bottom">

                ${options.bottom || ""}

            </div>

            <!-- FOOTER -->

            <div class="editor-footer">

                ${options.footer || ""}

            </div>

        </div>

    `;

}