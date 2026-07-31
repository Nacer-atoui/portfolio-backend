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
    // 1. Récupération des données texte (req.body)
    const { title, description, github_url, demo_url } = req.body;
    
    // 2. Les stacks sont en JSON, il faut les parser (car FormData n'envoie que du texte)
    const stacks = req.body.stacks ? JSON.parse(req.body.stacks) : [];

    // 3. Récupération des images uploadées sur Cloudinary
    // Si tu utilises multer-storage-cloudinary, le lien de l'image est souvent dans req.files[x].path
    const images = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        images.push({ image_url: file.path }); // file.path contient l'URL Cloudinary
      });
    }

    // 4. Appel du service/modèle
    const newProject = await projectService.create({
      title,
      description,
      github_url,
      demo_url,
      stacks,
      images
    });

    res.status(201).json(newProject);
  } catch (error) {
    // ...
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