const express = require("express");
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
router.post("/", addReference);
router.put("/:id", updateReference);
router.delete("/:id", deleteReference);

module.exports = router;