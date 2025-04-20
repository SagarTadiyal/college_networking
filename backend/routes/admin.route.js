import express from 'express'
import { deleteNotice, deletePyq, deleteStudyMaterial, fetchDashboardData, fetchNotices, fetchPYQ, fetchStudyMaterial, postNotice, uploadPYQ, uploadStudyMaterial } from '../controllers/admin.controller.js';
import { checkIsAdmin } from '../middleware/checkAdmin.js';
import studyMaterial from '../models/studyMaterial.js';

const router = express.Router();

router.post("/upload/studyMaterial",checkIsAdmin,uploadStudyMaterial)
router.get('/fetch/studyMaterial',fetchStudyMaterial)
router.post("/upload/pyq",checkIsAdmin,uploadPYQ)
router.get('/fetch/pyq',fetchPYQ)
router.post("/upload/notice",checkIsAdmin,postNotice)
router.get("/fetch/notices",fetchNotices)
router.delete("/delete/notice/:id",deleteNotice)
router.delete("/delete/studyMaterial/:id",deleteStudyMaterial)
router.delete("/delete/pyq/:id",deletePyq)
router.get("/fetch/dashboardData",fetchDashboardData)

export default router;