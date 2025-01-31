import { Router } from "express";
import { authenticate } from "../middlewares/auth";
import { analyze, getAnalysisHistory, getAnalysisHistorybyId } from "../controllers/analysisController";

const router = Router();
router.use(authenticate);
router.post("/analyze", analyze);
router.get("/analyzedHistory", getAnalysisHistory);
router.get('/history/:id', getAnalysisHistorybyId);

export default router;