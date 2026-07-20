import AppError from "../errors/AppError.js";
import * as ProjectService from '../services/project.service.js';
import { v2 as cloudinary } from 'cloudinary';

export const getAll = async (req, res, next) => {
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

    // 1. UPLOAD SUR CLOUDINARY
let uploadedImageUrl = null;

    // 🔥 L'astuce magique : on intercepte le fichier peu importe comment Multer l'a rangé
    const uploadedFile = req.file || (req.files && req.files.length > 0 ? req.files[0] : null);

    if (uploadedFile) {
      const b64 = Buffer.from(uploadedFile.buffer).toString("base64");
      const dataURI = "data:" + uploadedFile.mimetype + ";base64," + b64;
      
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'portfolio_projects',
      });
      uploadedImageUrl = result.secure_url;
    }

    // 2. PARSER LES STACKS
    let parsedStacks = [];
    if (data.stacks) {
      if (typeof data.stacks === "string") {
        try {
          parsedStacks = JSON.parse(data.stacks);
        } catch (e) {
          console.warn("Impossible de parser les stacks :", data.stacks);
        }
      } else if (Array.isArray(data.stacks)) {
        parsedStacks = data.stacks;
      }
    }

    // 3. ADAPTER L'IMAGE POUR TON MODÈLE (Tableau d'objets)
    // Si Cloudinary a renvoyé une URL, on la met dans le format [{ image_url: '...' }]
    const imagesArray = uploadedImageUrl ? [{ image_url: uploadedImageUrl }] : [];

    // 4. PRÉPARATION DES DONNÉES FINALES
    const projectData = {
      title: data.title || null,
      description: data.description || null,
      github_url: data.github_url || null,
      demo_url: data.demo_url || null,
      users_id: idUtilisateur,
      images: imagesArray, // <-- Transmis proprement pour ta table 'images' !
      stacks: parsedStacks
    };

    const project = await ProjectService.createProject(projectData);
    
    return res.status(201).json(project);
  } catch (error) {
    console.error("Erreur lors de la création :", error);
    return res.status(500).json({ message: "Erreur serveur lors de la création du projet." });
  }
}

export const projectUpdate = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const updatedProject = await ProjectService.updateProject(id, data);
  return res.status(200).json(updatedProject);
}

export const projectDelete = async (req, res) => {
  await ProjectService.deleteProject(req.params.id);
  res.status(204).send({ message: "Projet supprimé avec succès" });
};