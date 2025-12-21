import React, { useState, useEffect } from 'react';
import Card from './card.jsx';
import API from '../api';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    age: ''
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data } = await API.get('/students');
      setStudents(data);
    } catch (err) {
      console.error("Failed to fetch students", err);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await API.delete(`/students/${id}`);
      fetchStudents();
    } catch (err) {
      console.error("Failed to delete student", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/students', formData);
      setFormData({ name: '', email: '', course: '', age: '' });
      setIsAdding(false);
      fetchStudents();
    } catch (err) {
      console.error("Failed to add student", err);
      alert('Failed to add student');
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="hero-sub mb-0">Student List</h1>
        <button className="btn btn-primary" onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? 'Cancel' : 'Add Student'}
        </button>
      </div>

      {isAdding && (
        <div className="card p-3 mb-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Course"
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  required
                />
              </div>
              <div className="col-md-2">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Age"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              </div>
              <div className="col-md-1">
                <button type="submit" className="btn btn-success w-100">Save</button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="student-container">
        {students.map((student) => (
          <Card
            key={student._id}
            title={student.name}
            description={`Course: ${student.course}`}
            category={`Age: ${student.age || 'N/A'}`}
            details={{
              Email: student.email || 'N/A'
            }}
            actionText="More Details"
            onDelete={() => deleteStudent(student._id)}
          />
        ))}
        {students.length === 0 && <p>No students found.</p>}
      </div>
    </div>
  );
}

export default StudentList;