/* =====================================================
   TEXT INPUT COMPONENT
===================================================== */

function renderTextInput(options = {}) {

    return `

        <div class="form-group">

            <label>

                ${options.label || ""}

            </label>

            <input

                id="${options.id || ""}"

                type="${options.type || "text"}"

                value="${options.value || ""}"

                placeholder="${options.placeholder || ""}"

            >

        </div>

    `;

}