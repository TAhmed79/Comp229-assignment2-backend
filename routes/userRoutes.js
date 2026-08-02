const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
    getAllUsers,
    getUserById,
    addUser,
    signIn,
    updateUser,
    deleteUser
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", addUser);
router.post("/signin", signIn);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
