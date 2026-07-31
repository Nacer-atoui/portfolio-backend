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

    // On parse les stacks qui arrivent sous forme de texte depuis le FormData
    let parsedStacks = data.stacks ? JSON.parse(data.stacks) : [];

    // Multer a déjà envoyé l'image sur Cloudinary, on a juste à récupérer l'URL
    const images = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        images.push({ image_url: file.path }); // file.path contient le lien direct Cloudinary !
      });
    }

    const projectData = {
      ...data,
      stacks: parsedStacks,
      images: images,
      users_id: idUtilisateur 
    };

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