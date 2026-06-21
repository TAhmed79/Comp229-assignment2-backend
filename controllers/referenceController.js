const createError = require("http-errors");
const Reference = require("../models/reference");

const formatReference = (reference) => {
    const obj = reference.toObject();
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
    return obj;
};

const getAllReferences = async (req, res, next) => {
    try {
        const references = await Reference.find();
        res.json({
            success: true,
            message: "References list retrieved successfully.",
            data: references.map(formatReference)
        });
    } catch (error) {
        next(error);
    }
};

const getReferenceById = async (req, res, next) => {
    try {
        const reference = await Reference.findById(req.params.id);

        if (!reference) {
            return next(createError(404, "Reference not found."));
        }

        res.json({
            success: true,
            message: "Reference retrieved successfully.",
            data: formatReference(reference)
        });
    } catch (error) {
        next(error);
    }
};

const addReference = async (req, res, next) => {
    try {
        const reference = await Reference.create(req.body);

        res.status(201).json({
            success: true,
            message: "Reference added successfully.",
            data: formatReference(reference)
        });
    } catch (error) {
        next(error);
    }
};

const updateReference = async (req, res, next) => {
    try {
        const reference = await Reference.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!reference) {
            return next(createError(404, "Reference not found."));
        }

        res.json({
            success: true,
            message: "Reference updated successfully."
        });
    } catch (error) {
        next(error);
    }
};

const deleteReference = async (req, res, next) => {
    try {
        const reference = await Reference.findByIdAndDelete(req.params.id);

        if (!reference) {
            return next(createError(404, "Reference not found."));
        }

        res.json({
            success: true,
            message: "Reference deleted successfully."
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllReferences,
    getReferenceById,
    addReference,
    updateReference,
    deleteReference
};