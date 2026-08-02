const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
    getAllServices,
    getServiceById,
    addService,
    updateService,
    deleteService
} = require("../controllers/serviceController");

const router = express.Router();

router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.post("/", authMiddleware, addService);
router.put("/:id", authMiddleware, updateService);
router.delete("/:id", authMiddleware, deleteService);

module.exports = router;
