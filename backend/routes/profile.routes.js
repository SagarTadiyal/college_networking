const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile.controller');
const upload = require('../middlewares/upload');

// Get all profiles (admin only)
router.get('/', profileController.getAllProfiles);

// Get single profile
router.get('/:id', profileController.getProfile);

// Update profile
router.put('/:id', upload.single('profileImage'), profileController.updateProfile);

module.exports = router;