import * as ProjectService from '../services/project.service.js';
import cloudinary from '../config/cloudinary.js';

// --- FONCTION UTILITAIRE : TRAITEMENT & UPLOAD CLOUDINARY ---
const processImageUploads = async (req) => {
  let filesToProcess = [];
  if (req.files && req.files.length > 0) {
    filesToProcess = req.files; // Cas upload.array()
  } else if (req.file) {
    filesToProcess = [req.file]; // Cas upload.single()
  }

  const imagesArray = [];
  for (const file of filesToProcess) {
    const b64 = Buffer.from(file.buffer).toString("base64");
    const dataURI = "data:" + file.mimetype + ";base64," + b64;
    
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'portfolio_projects',
    });
    
    imagesArray.push({ image_url: result.secure_url });
  }

  return imagesArray;
};

// --- CONTROLEURS ---

export const getAll = async (req, res) => {
  const project = await ProjectService.getAllProject();
  res.json(project);
};

export const getById = async (req, res) => {
  const project = await ProjectService.getProjectById(req.params.id);
  res.json(project);
};

export const newProject = async (req, res) => {
  try {
    const data = req.body;
    const idUtilisateur = req.user?.id || null; 

    // 1. Parsing des stacks
    let parsedStacks = [];
    if (data.stacks) {
      parsedStacks = typeof data.stacks === 'string' ? JSON.parse(data.stacks) : data.stacks;
    }

    // 2. Upload des nouvelles images
    const imagesArray = await processImageUploads(req);

    // 3. Préparation sécurisée des données
    const projectData = {
      title: data.title || null,
      description: data.description || null,
      github_url: data.github_url || null,
      demo_url: data.demo_url || null,
      users_id: idUtilisateur,
      images: imagesArray,
      stacks: parsedStacks
    };

    const project = await ProjectService.createProject(projectData);
    res.status(201).json(project);

  } catch (error) {
    console.error("❌ ERREUR CRITIQUE DANS NEWPROJECT :");
    console.error(error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const projectUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // 1. Parsing des stacks
    let parsedStacks = [];
    if (data.stacks) {
      parsedStacks = typeof data.stacks === 'string' ? JSON.parse(data.stacks) : data.stacks;
    }

    // 2. Traitement des images
    let imagesArray = await processImageUploads(req);

    // Si AUCUN nouveau fichier n'a été sélectionné, on conserve les images existantes (si renvoyées dans req.body)
    if (imagesArray.length === 0 && data.images) {
      imagesArray = typeof data.images === 'string' ? JSON.parse(data.images) : data.images;
    }

    // 3. Préparation sécurisée des données
    const projectData = {
      title: data.title || null,
      description: data.description || null,
      github_url: data.github_url || null,
      demo_url: data.demo_url || null,
      images: imagesArray,
      stacks: parsedStacks
    };

    const updatedProject = await ProjectService.updateProject(id, projectData);
    res.status(200).json(updatedProject);

  } catch (error) {
    console.error("❌ ERREUR CRITIQUE DANS PROJECTUPDATE :");
    console.error(error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const projectDelete = async (req, res) => {
  try {
    await ProjectService.deleteProject(req.params.id);
    res.status(204).send({ message: "Projet supprimé avec succès" });
  } catch (error) {
    console.error("❌ ERREUR DANS PROJECTDELETE :");
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};