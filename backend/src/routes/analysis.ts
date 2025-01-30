import { Router } from "express";
import { authenticate } from "../middlewares/auth";
import { analyze } from "../controllers/analysisController";

const router = Router();
router.use(authenticate);
router.post("/analyze", analyze);
export default router;