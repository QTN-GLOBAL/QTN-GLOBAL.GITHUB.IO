/* =====================================================
   TEXTAREA COMPONENT
===================================================== */

function renderTextarea(options = {}) {

    return `

        <div class="form-group">

            <label>

                ${options.label || ""}

            </label>

            <textarea

                id="${options.id || ""}"

                rows="${options.rows || 5}"

                placeholder="${options.placeholder || ""}"

            >${options.value || ""}</textarea>

        </div>

    `;

}