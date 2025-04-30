// ...existing imports...
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if not present
const uploadDir = path.join(__dirname, '../uploads/avatars');
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, req.user.id + '_' + Date.now() + ext);
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (!file.mimetype.startsWith('image/')) return cb(new Error('Only images are allowed!'));
    cb(null, true);
  },
  limits: { fileSize: 2 * 1024 * 1024 }, // max 2MB
});

// POST /api/profile/avatar
router.post('/avatar', auth, upload.single('avatar'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  const avatarUrl = `/uploads/avatars/${req.file.filename}`;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Optionally: delete old avatar file if present
    if (user.avatar && user.avatar.startsWith('/uploads/avatars/')) {
      const oldPath = path.join(__dirname, '..', user.avatar);
      fs.unlink(oldPath, () => {}); // Ignore errors
    }

    user.avatar = avatarUrl;
    await user.save();
    res.json({ message: 'Avatar updated', avatar: avatarUrl });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});