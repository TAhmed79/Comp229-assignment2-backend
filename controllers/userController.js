const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const formatUser = (user) => {
    const obj = user.toObject();
    obj.id = obj._id.toString();
    delete obj._id;
    delete obj.__v;
    delete obj.password;
    return obj;
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");

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
        const user = await User.findById(req.params.id).select("-password");

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
        const { firstname, lastname, email, password } = req.body;

        if (!firstname || !lastname || !email || !password) {
            return next(createError(400, "All user fields are required."));
        }

        const existingUser = await User.findOne({
            email: email.toLowerCase()
        });

        if (existingUser) {
            return next(createError(409, "An account with this email already exists."));
        }

        const user = await User.create({
            firstname,
            lastname,
            email,
            password
        });

        res.status(201).json({
            success: true,
            message: "User created successfully.",
            data: formatUser(user)
        });
    } catch (error) {
        if (error.code === 11000) {
            return next(createError(409, "An account with this email already exists."));
        }

        next(error);
    }
};

const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(createError(400, "Email and password are required."));
        }

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user || !(await user.comparePassword(password))) {
            return next(createError(401, "Invalid email or password."));
        }

        if (!process.env.JWT_SECRET) {
            return next(createError(500, "JWT_SECRET is not configured."));
        }

        const token = jwt.sign(
            {
                id: user._id.toString(),
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );

        res.json({
            success: true,
            message: "Signed in successfully.",
            token,
            data: formatUser(user)
        });
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return next(createError(404, "User not found."));
        }

        if (req.body.firstname !== undefined) {
            user.firstname = req.body.firstname;
        }

        if (req.body.lastname !== undefined) {
            user.lastname = req.body.lastname;
        }

        if (req.body.email !== undefined) {
            user.email = req.body.email;
        }

        if (req.body.password) {
            user.password = req.body.password;
        }

        user.updated = new Date();
        await user.save();

        res.json({
            success: true,
            message: "User updated successfully.",
            data: formatUser(user)
        });
    } catch (error) {
        if (error.code === 11000) {
            return next(createError(409, "An account with this email already exists."));
        }

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
    signIn,
    updateUser,
    deleteUser
};
