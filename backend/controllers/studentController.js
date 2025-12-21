const Student = require('../models/Student');

// Get all students
const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new student
const createStudent = async (req, res) => {
    try {
        const { name, email, course, age } = req.body;
        const student = new Student({ name, email, course, age });
        const createdStudent = await student.save();
        res.status(201).json(createdStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update a student
const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id);

        if (student) {
            student.name = req.body.name || student.name;
            student.email = req.body.email || student.email;
            student.course = req.body.course || student.course;
            student.age = req.body.age || student.age;

            const updatedStudent = await student.save();
            res.json(updatedStudent);
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a student
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findByIdAndDelete(id);

        if (student) {
            res.json({ message: 'Student removed' });
        } else {
            res.status(404).json({ message: 'Student not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
};
