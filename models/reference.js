const mongoose = require("mongoose");

const referenceSchema = new mongoose.Schema({
    name: String,
    testimonial: String,
    position: String,
    company: String
});

module.exports = mongoose.model("Reference", referenceSchema);