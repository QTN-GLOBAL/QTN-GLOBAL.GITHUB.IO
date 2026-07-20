/* ==========================================
   QTN GLOBAL AI IMPORT SERVER
========================================== */

import express from "express";
import cors from "cors";

import importRoute from "./routes/import.route.js";

const app = express();

const PORT = process.env.PORT || 3000;

/* ==========================================
   MIDDLEWARE
========================================== */

app.use(cors());

app.use(express.json({

    limit: "20mb"

}));

app.use(express.urlencoded({

    extended: true

}));

/* ==========================================
   ROUTES
========================================== */

app.use("/api/import", importRoute);

/* ==========================================
   HOME
========================================== */

app.get("/", (req, res) => {

    res.json({

        success: true,

        server: "QTN GLOBAL AI IMPORT API",

        version: "1.0"

    });

});

/* ==========================================
   NOT FOUND
========================================== */

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "API Not Found"

    });

});

/* ==========================================
   START SERVER
========================================== */

app.listen(PORT, () => {

    console.log("");

    console.log("===================================");

    console.log("QTN GLOBAL AI IMPORT SERVER");

    console.log("Running:");

    console.log(`http://localhost:${PORT}`);

    console.log("===================================");

});