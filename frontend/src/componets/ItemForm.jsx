import { useState, useEffect } from 'react';
import Card from './card';
import API from '../api';

function ItemForm({ onTaskAdded, tasks = [], editingTask, setEditingTask, onDelete, onToggle }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending'
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        status: editingTask.status
      });
    } else {
      setFormData({ title: '', description: '', status: 'pending' });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      setMessage('❌ Please fill all fields!');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    try {
      if (editingTask) {
        await API.put(`/tasks/${editingTask._id}`, formData);
        setMessage('✅ Task updated successfully!');
        if (setEditingTask) setEditingTask(null);
      } else {
        await API.post('/tasks', formData);
        setMessage('✅ Task added successfully!');
      }

      setFormData({ title: '', description: '', status: 'pending' });
      if (onTaskAdded) onTaskAdded();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to save task.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleCancel = () => {
    if (setEditingTask) setEditingTask(null);
    setFormData({ title: '', description: '', status: 'pending' });
  };

  return (
    <div className="container py-3">
      <h5 className="mb-2">{editingTask ? 'Edit Task' : 'Add New Task'}</h5>
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
        <div className="mt-2 d-flex gap-2">
          <button type="submit" className="btn btn-primary">{editingTask ? 'Update Task' : 'Add Task'}</button>
          {editingTask && (
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
          )}
        </div>
      </form>

      {message && <p className="fs-6 text-muted">{message}</p>}

      <hr />

      <h5 className="mb-3">All Tasks</h5>
      <div className="row g-3">
        {tasks && tasks.length > 0 ? (
          tasks.map(task => (
            <div key={task._id} className="col-12 col-md-6 col-lg-4">
              <Card
                title={task.title}
                description={task.description}
                category={task.status}
                completed={task.status === 'completed'}
                onToggle={() => onToggle && onToggle(task)}
                onDelete={() => onDelete && onDelete(task._id)}
                onEdit={() => setEditingTask && setEditingTask(task)}
              />
            </div>
          ))
        ) : (
          <p className="text-muted">No tasks available.</p>
        )}
      </div>
    </div>
  );
}

export default ItemForm;