/* =====================================================
   QTN GLOBAL CMS
   CHECKBOX GROUP
===================================================== */

/* =====================================================
   RENDER
===================================================== */

function renderCheckboxGroup(options = {}) {

    const {

        items = [],

        selected = [],

        idField = "id",

        labelField = "name",

        name = "checkbox"

    } = options;

    return `

        <div class="checkbox-group">

            ${items.map(item => `

                <label class="checkbox-item">

                    <input

                        type="checkbox"

                        name="${name}"

                        value="${item[idField]}"

                        ${selected.includes(item[idField])
                            ? "checked"
                            : ""}>

                    <span>

                        ${item.icon || ""}

                        ${item[labelField]}

                    </span>

                </label>

            `).join("")}

        </div>

    `;

}

/* =====================================================
   GET VALUES
===================================================== */

function getCheckboxGroupValues(name){

    return [...document.querySelectorAll(

        `input[name="${name}"]:checked`

    )].map(item => item.value);

}