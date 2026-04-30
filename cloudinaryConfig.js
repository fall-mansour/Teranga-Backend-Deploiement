const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Remplace 'ton_cloud_name' et 'ton_api_secret' par tes vraies infos
cloudinary.config({
  cloud_name: 'dtwsxs2pz',
  api_key: '742635421594659',
  api_secret: 'kLRnDLU7ZMJFu4RRZeN6ATqfde4',
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'teranga_motors',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };
