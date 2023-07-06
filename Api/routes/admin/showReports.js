import { Router } from "express";
import { showReports } from "../../controllers/admin/showReports.js";

const router = Router();

router.get("/show", showReports)

export default router