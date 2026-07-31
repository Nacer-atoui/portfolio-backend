import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// 1. Configuration du stockage automatique vers Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'portfolio_projects', // Le dossier dans ton espace Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'gif'], // N'accepte que les images
  },
});

// 2. Initialisation de Multer
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5 Mo maximum
});

export default upload;