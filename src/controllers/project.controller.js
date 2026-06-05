import AppError from "../errors/AppError.js";
import * as ProjectService from '../services/project.service.js';


export const getAll = async (req, res, next) => {
  const project = await ProjectService.getAllProject();
  res.json(project);
};

export const getById = async (req, res) => {
    const project = await ProjectService.getProjectById(req.params.id);
    res.json(project);
};


export const newProject = async (req, res) => {
    const data = req.body;
    const idUtilisateur = req.user.id; 
    const projectData = {
        ...data,
        users_id: idUtilisateur 
    };

    const project = await ProjectService.createProject(projectData);
    
    return res.status(201).json(project);
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