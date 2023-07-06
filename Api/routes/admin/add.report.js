import { Router } from "express";
import { createReport } from "../../controllers/admin/add.report.js";

const router = Router();

router.post("/data", createReport)

export default router