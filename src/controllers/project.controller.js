import * as ProjectService from '../services/project.service.js';

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
    const idUtilisateur = req.user.id; 

    // 1. On parse les stacks car FormData les a envoyés en string JSON
    let parsedStacks = [];
    if (data.stacks) {
      parsedStacks = JSON.parse(data.stacks);
    }

    // 2. On récupère les images depuis req.files
    // (Cloudinary via Multer place généralement l'URL générée dans file.path)
    const images = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        // file.path contient le lien de ton image sur Cloudinary
        images.push({ image_url: file.path }); 
      });
    }

    // 3. On prépare l'objet complet pour le modèle
    const projectData = {
      ...data,
      stacks: parsedStacks, // On écrase la version texte par la version tableau
      images: images,       // On ajoute le tableau d'images formaté
      users_id: idUtilisateur 
    };

    // 4. On crée le projet
    const project = await ProjectService.createProject(projectData);
    res.status(201).json(project);
    
  } catch (error) {
    console.error("Erreur lors de la création du projet :", error);
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