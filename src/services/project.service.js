import { application } from 'express';
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

export const updateProject = async (id, data) => {
    const result = await ProjectModel.findById(id)

    if (result.length === 0) {
        throw new AppError('Projet introuvable', 404);
    }

    const updated = await ProjectModel.update(id, data);

    const project = await ProjectModel.findById(id);

    return project;

}