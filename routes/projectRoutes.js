const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
    getAllProjects,
    getProjectById,
    addProject,
    updateProject,
    deleteProject
} = require("../controllers/projectController");

const router = express.Router();

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/", authMiddleware, addProject);
router.put("/:id", authMiddleware, updateProject);
router.delete("/:id", authMiddleware, deleteProject);

module.exports = router;
