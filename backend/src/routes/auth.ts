import express from 'express';

import { register , login, verify} from '../controllers/authController' ;

const router : express.Router = express.Router();

router.post("/register" , register);
router.post("/login" , login);
router.post("/verifytoken" , verify) ;
export default router;