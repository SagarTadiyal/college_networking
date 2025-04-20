import express from 'express'
import { authSessionCheck } from '../controllers/authSession.controller.js';

const router = express.Router();

router.get("/session",authSessionCheck)
export default router;