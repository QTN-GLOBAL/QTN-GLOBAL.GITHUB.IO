/* ==========================================
   QTN GLOBAL AI IMPORT SERVER
========================================== */

import express from "express";
import cors from "cors";

const app = express();

/* ==========================================
   CONFIG
========================================== */

const PORT = 3000;

/* ==========================================
   MIDDLEWARE
========================================== */

app.use(cors());

app.use(express.json({ limit: "20mb" }));

app.use(express.urlencoded({ extended: true }));

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
   TEST IMPORT
========================================== */

app.post("/api/import", async (req, res) => {

    console.log("");

    console.log("========== IMPORT REQUEST ==========");

    console.log(req.body);

    console.log("====================================");

    res.json({

        success: true,

        message: "Import API Ready",

        data: req.body

    });

});

/* ==========================================
   START
========================================== */

app.listen(PORT, () => {

    console.log("");

    console.log("===================================");

    console.log("QTN GLOBAL AI IMPORT SERVER");

    console.log("Running:");

    console.log("http://localhost:" + PORT);

    console.log("===================================");

});