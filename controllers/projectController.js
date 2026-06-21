const createError = require("http-errors");
const Project = require("../models/project");

const formatProject = (project) => {
    const obj = project.toObject();
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
    return obj;
};

const getAllProjects = async (req, res, next) => {
    try {
        const projects = await Project.find();
        res.json({
            success: true,
            message: "Projects list retrieved successfully.",
            data: projects.map(formatProject)
        });
    } catch (error) {
        next(error);
    }
};

const getProjectById = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            return next(createError(404, "Project not found."));
        }

        res.json({
            success: true,
            message: "Project retrieved successfully.",
            data: formatProject(project)
        });
    } catch (error) {
        next(error);
    }
};

const addProject = async (req, res, next) => {
    try {
        const project = await Project.create(req.body);

        res.status(201).json({
            success: true,
            message: "Project added successfully.",
            data: formatProject(project)
        });
    } catch (error) {
        next(error);
    }
};

const updateProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!project) {
            return next(createError(404, "Project not found."));
        }

        res.json({
            success: true,
            message: "Project updated successfully."
        });
    } catch (error) {
        next(error);
    }
};

const deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            return next(createError(404, "Project not found."));
        }

        res.json({
            success: true,
            message: "Project deleted successfully."
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllProjects,
    getProjectById,
    addProject,
    updateProject,
    deleteProject
};