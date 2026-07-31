import multer from 'multer';

// 1. On configure le stockage temporaire en mémoire (RAM) 
const storage = multer.memoryStorage();

// 2. On crée un filtre de sécurité pour n'accepter QUE les images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accepte le fichier
  } else {
    cb(new Error('Le fichier doit être une image !'), false); // Rejette le fichier
  }
};

// 3. On initialise Multer avec ces configurations
const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // Limite optionnelle : 5 Mo maximum par image
  }
});

// 4. On exporte le middleware par défaut
export default upload;