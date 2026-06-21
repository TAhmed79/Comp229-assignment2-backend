const createError = require("http-errors");
const User = require("../models/User");

const formatUser = (user) => {
    const obj = user.toObject();
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
    return obj;
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        res.json({
            success: true,
            message: "Users list retrieved successfully.",
            data: users.map(formatUser)
        });
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return next(createError(404, "User not found."));
        }

        res.json({
            success: true,
            message: "User retrieved successfully.",
            data: formatUser(user)
        });
    } catch (error) {
        next(error);
    }
};

const addUser = async (req, res, next) => {
    try {
        const user = await User.create(req.body);

        res.status(201).json({
            success: true,
            message: "User added successfully.",
            data: formatUser(user)
        });
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        req.body.updated = new Date();

        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!user) {
            return next(createError(404, "User not found."));
        }

        res.json({
            success: true,
            message: "User updated successfully."
        });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return next(createError(404, "User not found."));
        }

        res.json({
            success: true,
            message: "User deleted successfully."
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
};