const express = require("express");
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
router.post("/", addService);
router.put("/:id", updateService);
router.delete("/:id", deleteService);

module.exports = router;