import * as ProjectService from '../services/project.service.js';
import { v2 as cloudinary } from 'cloudinary';

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
    console.log("=== 1. NOUVELLE REQUÊTE REÇUE ===");
    
    const data = req.body;
    const idUtilisateur = req.user?.id || null; 

    // 1. Parsing des stacks
    let parsedStacks = [];
    if (data.stacks) {
      parsedStacks = typeof data.stacks === 'string' ? JSON.parse(data.stacks) : data.stacks;
    }

    // 2. RÉCUPÉRATION DES FICHIERS (Blindé pour upload.single OU upload.array)
    let filesToProcess = [];
    if (req.files && req.files.length > 0) {
      filesToProcess = req.files; // Cas upload.array()
    } else if (req.file) {
      filesToProcess = [req.file]; // Cas upload.single()
    }

    console.log(`=== 2. FICHIERS DÉTECTÉS : ${filesToProcess.length} ===`);

    // 3. UPLOAD SUR CLOUDINARY (La méthode DataURI qui marche !)
    const imagesArray = [];
    for (const file of filesToProcess) {
      console.log(`⏳ Envoi de ${file.originalname} vers Cloudinary...`);
      
      const b64 = Buffer.from(file.buffer).toString("base64");
      const dataURI = "data:" + file.mimetype + ";base64," + b64;
      
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'portfolio_projects',
      });
      
      console.log("✅ Réponse Cloudinary :", result.secure_url);
      imagesArray.push({ image_url: result.secure_url });
    }

    // 4. PRÉPARATION SÉCURISÉE DES DONNÉES (Évite les undefined pour MySQL)
    const projectData = {
      title: data.title || null,
      description: data.description || null,
      github_url: data.github_url || null,
      demo_url: data.demo_url || null,
      users_id: idUtilisateur,
      images: imagesArray,      // <-- Transmis au modèle sous forme [{ image_url: '...' }]
      stacks: parsedStacks
    };

    console.log("=== 3. PRÊT POUR LA BDD ===", projectData);

    const project = await ProjectService.createProject(projectData);
    
    console.log("=== 4. SUCCÈS ! PROJET CRÉÉ ===");
    res.status(201).json(project);

  } catch (error) {
    console.error("❌ ERREUR CRITIQUE DANS LE CONTRÔLEUR :");
    console.error(error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

export const projectUpdate = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const updatedProject = await ProjectService.updateProject(id, data);
  res.status(200).json(updatedProject);
};

export const projectDelete = async (req, res) => {
  await ProjectService.deleteProject(req.params.id);
  res.status(204).send({ message: "Projet supprimé avec succès" });
};