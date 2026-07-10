/* =====================================================
   SELECT COMPONENT
===================================================== */

function renderSelect(options = {}) {

    const items = options.items || [];

    return `

        <div class="form-group">

            <label>

                ${options.label || ""}

            </label>

            <select id="${options.id || ""}">

                ${items.map(item=>`

                    <option

                        value="${item.value}"

                        ${item.value===options.value?"selected":""}

                    >

                        ${item.label}

                    </option>

                `).join("")}

            </select>

        </div>

    `;

}