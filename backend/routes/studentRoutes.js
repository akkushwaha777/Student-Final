const express = require('express');
const router = express.Router();
const { getStudents, createStudent, updateStudent, deleteStudent } = require('../controllers/studentController');
const protect = require('../middleware/authMiddleware');

router.get('/', protect, getStudents);
router.post('/', protect, createStudent);
router.put('/:id', protect, updateStudent);
router.delete('/:id', protect, deleteStudent);

module.exports = router;
