const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
    getAllReferences,
    getReferenceById,
    addReference,
    updateReference,
    deleteReference
} = require("../controllers/referenceController");

const router = express.Router();

router.get("/", getAllReferences);
router.get("/:id", getReferenceById);
router.post("/", authMiddleware, addReference);
router.put("/:id", authMiddleware, updateReference);
router.delete("/:id", authMiddleware, deleteReference);

module.exports = router;
