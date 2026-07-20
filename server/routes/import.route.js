import express from "express";

import { importProduct } from "../controllers/import.controller.js";

const router = express.Router();

router.post("/", importProduct);

export default router;