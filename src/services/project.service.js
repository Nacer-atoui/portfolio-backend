import AppError from '../errors/AppError.js';
import * as ProjectModel from '../models/project.model.js';
 

export const getAllProject = async () => {
    const rows = await ProjectModel.findAll();

  return ProjectModel.findAll();
};

export const getProjectById = async (id) => {
    const rows = await ProjectModel.findById();
    if (rows.length === 0) {
        throw new AppError('Projet introuvable', 404);
    }

    return ProjectModel.findById(id);
}

export const createProject = async (data) => {
    const result = await ProjectModel.create(data);

    return result;
}