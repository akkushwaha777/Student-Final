const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Student name is required"],
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    course: {
        type: String,
        required: [true, "Course is required"],
    },
    age: {
        type: Number,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Student', studentSchema);
