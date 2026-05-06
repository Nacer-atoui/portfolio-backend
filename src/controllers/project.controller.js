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
    const project = await ProjectService.createProject(req.body)
    return res.status(201).json(project)
}

export const projectUpdate = async (req, res) => {
    const project = await ProjectService.updateProject(req.params.id, req.body)
    return res.status(201).json(project)
}