
import AppError from '../errors/AppError.js';
import * as ProjectModel from '../models/project.model.js';

export const getAllProject = async () => {
    // On stocke la requête et on la retourne directement
    const rows = await ProjectModel.findAll();
    return rows; 
};

export const getProjectById = async (id) => {
    // Le modèle renvoie directement l'objet projet
    const project = await ProjectModel.findById(id);
    
    if (!project) { // Plus besoin de .length
        throw new AppError('Projet introuvable', 404);
    }

    return project; // On retourne le projet tel quel
}

export const createProject = async (data) => {
    const id = await ProjectModel.create(data);
    return getProjectById(id);
}

export const updateProject = async (id, data) => {
    // Même correction ici pour la mise à jour
    const projectExists = await ProjectModel.findById(id);

    if (!projectExists) {
        throw new AppError('Projet introuvable', 404);
    }

    await ProjectModel.update(id, data);
    const updatedProject = await ProjectModel.findById(id);

    return updatedProject;
}

export const deleteProject = async (id) => {
  const affected = await ProjectModel.remove(id);

  if (!affected) {
    throw new AppError('Projet introuvable ou déjà supprimé', 404);
  }
};