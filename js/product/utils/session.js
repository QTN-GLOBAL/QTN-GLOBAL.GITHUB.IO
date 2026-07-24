/* =========================================================
   PRODUCT SESSION
   =========================================================

   PURPOSE
   ---------------------------------------------------------
   Quản lý dữ liệu dùng chung trong toàn bộ quy trình:

       Add Product
           ↓
       Step 1
           ↓
       Step 2
           ↓
       Step 3 - Content Import
           ↓
       Step 4 - Specification
           ↓
       Step 5 - Preview
           ↓
       Step 6 - Save

   IMPORTANT
   ---------------------------------------------------------
   - Chỉ có một nguồn dữ liệu chính: window.currentProduct
   - Không tạo nhiều object dữ liệu riêng cho từng Step
   - Các Step chỉ đọc / cập nhật window.currentProduct
   - Không tự tạo Specification cố định
   - Không tự tạo các field:
       capacity
       division
       platform
       scaleSize
       unit
   - Technical Specification dùng cấu trúc:

       product.specs = {
           table: {
               headers: [],
               rows: []
           },
           text: []
       }

   ========================================================= */


/* =========================================================
   GLOBAL PRODUCT SESSION
========================================================= */

window.currentProduct = window.currentProduct || null;


/* =========================================================
   CREATE EMPTY PRODUCT SESSION
========================================================= */

function createEmptyProductSession() {

    return {

        /* =================================================
           SESSION
        ================================================= */

        sessionId:

            "product-" +

            Date.now() +

            "-" +

            Math.random()
                .toString(36)
                .substring(2, 9),

        createdAt:

            new Date().toISOString(),

        updatedAt:

            new Date().toISOString(),


        /* =================================================
           STEP
        ================================================= */

        currentStep: 1,


        /* =================================================
           BASIC PRODUCT INFORMATION
        ================================================= */

        business: "",

        category: "",

        brand: "",

        origin: "",

        folder: "",


        /* =================================================
           SOURCE
        ================================================= */

        source: {

            type: "website",

            url: "",

            options: {

                description: true,

                specs: true,

                images: true

            },

            imported: false,

            importedAt: ""

        },


        /* =================================================
           PRODUCT
        ================================================= */

        product: {

            /* =============================================
               BASIC
            ============================================== */

            name: "",


            /* =============================================
               DESCRIPTION
            ============================================== */

            description: "",


            /* =============================================
               TECHNICAL SPECIFICATION
            ============================================== */

            specs: {

                table: {

                    headers: [],

                    rows: []

                },

                text: []

            },


            /* =============================================
               IMAGES
            ============================================== */

            images: []

        },


        /* =================================================
           IMPORT RESULT
        ================================================= */

        importResult: null,


        /* =================================================
           IMPORT STATUS
        ================================================= */

        importStatus: {

            success: false,

            message: "",

            error: "",

            importedAt: ""

        }

    };

}


/* =========================================================
   INIT PRODUCT SESSION
========================================================= */

function initProductSession() {

    window.currentProduct =

        createEmptyProductSession();


    console.log(

        "================================="

    );

    console.log(

        "PRODUCT SESSION CREATED"

    );

    console.log(

        window.currentProduct

    );

    console.log(

        "================================="

    );


    return window.currentProduct;

}


/* =========================================================
   GET PRODUCT SESSION
========================================================= */

function getProductSession() {

    if (

        !window.currentProduct

    ) {

        initProductSession();

    }


    return window.currentProduct;

}


/* =========================================================
   ENSURE PRODUCT SESSION
========================================================= */

function ensureProductSession() {

    const session =

        getProductSession();


    /* =====================================================
       BASIC ROOT
    ===================================================== */

    if (

        !session ||

        typeof session !== "object"

    ) {

        return initProductSession();

    }


    /* =====================================================
       SOURCE
    ===================================================== */

    if (

        !session.source ||

        typeof session.source !== "object"

    ) {

        session.source = {

            type: "website",

            url: "",

            options: {

                description: true,

                specs: true,

                images: true

            },

            imported: false,

            importedAt: ""

        };

    }


    if (

        !session.source.options ||

        typeof session.source.options !== "object"

    ) {

        session.source.options = {

            description: true,

            specs: true,

            images: true

        };

    }


    /* =====================================================
       PRODUCT
    ===================================================== */

    if (

        !session.product ||

        typeof session.product !== "object"

    ) {

        session.product = {};

    }


    /* =====================================================
       PRODUCT NAME
    ===================================================== */

    if (

        session.product.name === undefined

    ) {

        session.product.name = "";

    }


    /* =====================================================
       DESCRIPTION
    ===================================================== */

    if (

        session.product.description === undefined

    ) {

        session.product.description = "";

    }


    /* =====================================================
       SPECS
    ===================================================== */

    if (

        !session.product.specs ||

        typeof session.product.specs !== "object" ||

        Array.isArray(

            session.product.specs

        )

    ) {

        session.product.specs = {};

    }


    /* =====================================================
       SPEC TABLE
    ===================================================== */

    if (

        !session.product.specs.table ||

        typeof session.product.specs.table !== "object" ||

        Array.isArray(

            session.product.specs.table

        )

    ) {

        session.product.specs.table = {};

    }


    if (

        !Array.isArray(

            session.product.specs.table.headers

        )

    ) {

        session.product.specs.table.headers = [];

    }


    if (

        !Array.isArray(

            session.product.specs.table.rows

        )

    ) {

        session.product.specs.table.rows = [];

    }


    /* =====================================================
       SPEC TEXT
    ===================================================== */

    if (

        !Array.isArray(

            session.product.specs.text

        )

    ) {

        session.product.specs.text = [];

    }


    /* =====================================================
       IMAGES
    ===================================================== */

    if (

        !Array.isArray(

            session.product.images

        )

    ) {

        session.product.images = [];

    }


    /* =====================================================
       IMPORT STATUS
    ===================================================== */

    if (

        !session.importStatus ||

        typeof session.importStatus !== "object"

    ) {

        session.importStatus = {

            success: false,

            message: "",

            error: "",

            importedAt: ""

        };

    }


    /* =====================================================
       UPDATED TIME
    ===================================================== */

    session.updatedAt =

        new Date().toISOString();


    return session;

}


/* =========================================================
   UPDATE PRODUCT SESSION
========================================================= */

function updateProductSession(

    updates = {}

) {

    const session =

        ensureProductSession();


    if (

        !updates ||

        typeof updates !== "object"

    ) {

        return session;

    }


    /* =====================================================
       ROOT DATA
    ===================================================== */

    const rootFields = [

        "business",

        "category",

        "brand",

        "origin",

        "folder",

        "currentStep"

    ];


    rootFields.forEach(

        field => {

            if (

                updates[field] !== undefined

            ) {

                session[field] =

                    updates[field];

            }

        }

    );


    /* =====================================================
       SOURCE
    ===================================================== */

    if (

        updates.source &&

        typeof updates.source === "object"

    ) {

        session.source = {

            ...session.source,

            ...updates.source

        };


        if (

            updates.source.options &&

            typeof updates.source.options === "object"

        ) {

            session.source.options = {

                ...session.source.options,

                ...updates.source.options

            };

        }

    }


    /* =====================================================
       PRODUCT
    ===================================================== */

    if (

        updates.product &&

        typeof updates.product === "object"

    ) {

        session.product = {

            ...session.product,

            ...updates.product

        };


        /* ================================================
           SPECS
        ================================================= */

        if (

            updates.product.specs &&

            typeof updates.product.specs === "object"

        ) {

            session.product.specs = {

                ...session.product.specs,

                ...updates.product.specs

            };


            /* ============================================
               TABLE
            ============================================= */

            if (

                updates.product.specs.table &&

                typeof updates.product.specs.table === "object"

            ) {

                session.product.specs.table = {

                    ...session.product.specs.table,

                    ...updates.product.specs.table

                };

            }


            /* ============================================
               TEXT
            ============================================= */

            if (

                Array.isArray(

                    updates.product.specs.text

                )

            ) {

                session.product.specs.text =

                    [

                        ...

                        updates.product.specs.text

                    ];

            }

        }


        /* ================================================
           IMAGES
        ================================================= */

        if (

            Array.isArray(

                updates.product.images

            )

        ) {

            session.product.images =

                [

                    ...

                    updates.product.images

                ];

        }

    }


    /* =====================================================
       IMPORT RESULT
    ===================================================== */

    if (

        updates.importResult !== undefined

    ) {

        session.importResult =

            updates.importResult;

    }


    /* =====================================================
       IMPORT STATUS
    ===================================================== */

    if (

        updates.importStatus &&

        typeof updates.importStatus === "object"

    ) {

        session.importStatus = {

            ...session.importStatus,

            ...updates.importStatus

        };

    }


    /* =====================================================
       UPDATED TIME
    ===================================================== */

    session.updatedAt =

        new Date().toISOString();


    return session;

}


/* =========================================================
   SET CURRENT STEP
========================================================= */

function setProductStep(

    step

) {

    const session =

        ensureProductSession();


    const number =

        Number(step);


    if (

        !Number.isInteger(number) ||

        number < 1 ||

        number > 6

    ) {

        console.warn(

            "Invalid product step:",

            step

        );


        return session.currentStep;

    }


    session.currentStep =

        number;


    session.updatedAt =

        new Date().toISOString();


    return number;

}


/* =========================================================
   GET CURRENT STEP
========================================================= */

function getProductStep() {

    const session =

        ensureProductSession();


    return (

        Number(

            session.currentStep

        ) || 1

    );

}


/* =========================================================
   SET SOURCE URL
========================================================= */

function setProductSourceUrl(

    url

) {

    const session =

        ensureProductSession();


    session.source.url =

        typeof url === "string"

            ? url.trim()

            : "";


    session.updatedAt =

        new Date().toISOString();


    return session.source.url;

}


/* =========================================================
   GET SOURCE URL
========================================================= */

function getProductSourceUrl() {

    const session =

        ensureProductSession();


    return (

        session.source?.url ||

        ""

    );

}


/* =========================================================
   MARK IMPORT SUCCESS
========================================================= */

function markProductImportSuccess(

    result = null

) {

    const session =

        ensureProductSession();


    session.importResult =

        result;


    session.importStatus = {

        success: true,

        message:

            "Product content imported successfully.",

        error: "",

        importedAt:

            new Date().toISOString()

    };


    session.source.imported =

        true;


    session.source.importedAt =

        session.importStatus.importedAt;


    session.updatedAt =

        new Date().toISOString();


    return session;

}


/* =========================================================
   MARK IMPORT ERROR
========================================================= */

function markProductImportError(

    error

) {

    const session =

        ensureProductSession();


    const message =

        error instanceof Error

            ? error.message

            : String(

                error ||

                "Import failed."

            );


    session.importStatus = {

        success: false,

        message: "",

        error: message,

        importedAt: ""

    };


    session.source.imported =

        false;


    session.updatedAt =

        new Date().toISOString();


    return session;

}


/* =========================================================
   RESET PRODUCT SESSION
========================================================= */

function resetProductSession() {

    window.currentProduct =

        createEmptyProductSession();


    console.log(

        "PRODUCT SESSION RESET"

    );


    return window.currentProduct;

}


/* =========================================================
   CLEAR IMPORT DATA ONLY
========================================================= */

function clearProductImportData() {

    const session =

        ensureProductSession();


    session.importResult =

        null;


    session.importStatus = {

        success: false,

        message: "",

        error: "",

        importedAt: ""

    };


    session.source.imported =

        false;


    session.source.importedAt =

        "";


    session.updatedAt =

        new Date().toISOString();


    return session;

}


/* =========================================================
   EXPORT PRODUCT SESSION
========================================================= */

function exportProductSession() {

    const session =

        ensureProductSession();


    return JSON.parse(

        JSON.stringify(

            session

        )

    );

}


/* =========================================================
   DEBUG PRODUCT SESSION
========================================================= */

function debugProductSession(

    label = "PRODUCT SESSION"

) {

    const session =

        ensureProductSession();


    console.log(

        "========================================"

    );

    console.log(

        label

    );

    console.log(

        "========================================"

    );

    console.log(

        session

    );

    console.log(

        "========================================"

    );


    return session;

}


/* =========================================================
   AUTO INITIALIZE
========================================================= */

if (

    !window.currentProduct

) {

    initProductSession();

}