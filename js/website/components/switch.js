/* =====================================================
   SWITCH COMPONENT
===================================================== */

function renderSwitch(options = {}) {

    return `

        <div class="form-group">

            <label>

                ${options.label || ""}

            </label>

            <label class="switch-item">

                <input

                    id="${options.id || ""}"

                    type="checkbox"

                    ${options.checked ? "checked" : ""}

                >

                <span>

                    ${options.text || "Active"}

                </span>

            </label>

        </div>

    `;

}