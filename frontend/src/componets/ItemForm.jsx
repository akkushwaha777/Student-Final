import { useState } from 'react';
import Card from './card';
import API from '../api';

function ItemForm({ onTaskAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending'
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      setMessage('❌ Please fill all fields!');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    try {
      await API.post('/tasks', formData);
      setFormData({ title: '', description: '', status: 'pending' });
      setMessage('✅ Task added successfully!');
      if (onTaskAdded) onTaskAdded();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ Failed to add task.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="container py-3">
      <h5 className="mb-2">Add New Task</h5>
      <form onSubmit={handleSubmit} className="card p-3 mb-3">
        <div className="row g-2">
          <div className="col-12 col-md-6">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col-12 col-md-6">
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-control"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="col-12 col-md-12">
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="form-control"
              rows={3}
              required
            />
          </div>
        </div>
        <div className="mt-2">
          <button type="submit" className="btn btn-primary">Add Task</button>
        </div>
      </form>

      {message && <p className="fs-6 text-muted">{message}</p>}
    </div>
  );
}

export default ItemForm;