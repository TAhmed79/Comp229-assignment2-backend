const express = require("express");
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
router.post("/", addProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

module.exports = router;