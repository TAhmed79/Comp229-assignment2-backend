const createError = require("http-errors");
const Service = require("../models/Service");

const formatService = (service) => {
    const obj = service.toObject();
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
    return obj;
};

const getAllServices = async (req, res, next) => {
    try {
        const services = await Service.find();
        res.json({
            success: true,
            message: "Services list retrieved successfully.",
            data: services.map(formatService)
        });
    } catch (error) {
        next(error);
    }
};

const getServiceById = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return next(createError(404, "Service not found."));
        }

        res.json({
            success: true,
            message: "Service retrieved successfully.",
            data: formatService(service)
        });
    } catch (error) {
        next(error);
    }
};

const addService = async (req, res, next) => {
    try {
        const service = await Service.create(req.body);

        res.status(201).json({
            success: true,
            message: "Service added successfully.",
            data: formatService(service)
        });
    } catch (error) {
        next(error);
    }
};

const updateService = async (req, res, next) => {
    try {
        const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!service) {
            return next(createError(404, "Service not found."));
        }

        res.json({
            success: true,
            message: "Service updated successfully."
        });
    } catch (error) {
        next(error);
    }
};

const deleteService = async (req, res, next) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);

        if (!service) {
            return next(createError(404, "Service not found."));
        }

        res.json({
            success: true,
            message: "Service deleted successfully."
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllServices,
    getServiceById,
    addService,
    updateService,
    deleteService
};