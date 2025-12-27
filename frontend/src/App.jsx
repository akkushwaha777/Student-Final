import { useState, useEffect } from 'react';
import Header from './componets/Header';
import Navbar from './componets/navbar';
import StudentList from './componets/student';
import Footer from './componets/Footer';
import ItemForm from './componets/ItemForm';
import './index.css';
import Image from './componets/image';
import Card from './componets/card';
import About from './componets/about';
import Project from './componets/project';
import NewProducts from './componets/NewProducts';
import Login from './componets/Login';
import Register from './componets/Register';
import API from './api';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);

  const [taskCount, setTaskCount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentPage('home');
    }
  }, []);

  useEffect(() => {
    if (user && currentPage === 'home') {
      fetchTasks();
    }
  }, [user, currentPage]);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get('/tasks');
      setTasks(data);
      setTaskCount(data.length);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
  };

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setCurrentPage('login');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const navigate = (key) => {
    setCurrentPage(key);
    if (key !== 'itemform') {
      setEditingTask(null);
    }
  };

  const deleteHomeTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  const toggleHomeTask = async (task) => {
    try {
      const updatedTask = { ...task, status: task.status === 'completed' ? 'pending' : 'completed' };

      await API.put(`/tasks/${task._id}`, { status: updatedTask.status });
      fetchTasks();
    } catch (err) {
      console.error("Failed to toggle task", err);
    }
  };

  if (!user) {
    if (currentPage === 'register') {
      return <Register onNavigate={setCurrentPage} />;
    }
    return <Login onLogin={handleLogin} onNavigate={setCurrentPage} />;
  }

  return (
    <div className={`app-container ${theme} d-flex flex-column min-vh-100`}>
      <Navbar
        onNavigate={navigate}
        currentPage={currentPage}
        taskCount={taskCount}
        theme={theme}
        toggleTheme={toggleTheme}
        onLogout={handleLogout}
      />

      <Header />

      {currentPage === 'home' && (
        <>
          <Image />
          <StudentList />

          <div className="container">
            <h1 className="hero-sub">Student Task [{tasks.length}]</h1>
            <div className="row g-3 mt-1">
              {tasks.map(task => (
                <div key={task._id} className="col-12 col-md-6 col-lg-4">
                  <Card
                    title={task.title}
                    description={task.description}
                    category={task.status}
                    completed={task.status === 'completed'}
                    onToggle={() => toggleHomeTask(task)}
                    onDelete={() => deleteHomeTask(task._id)}
                    onEdit={() => {
                      setEditingTask(task);
                      navigate('itemform');
                    }}
                  />
                </div>
              ))}
              {tasks.length === 0 && (
                <p className="text-muted mt-2">No tasks yet. Add some from the Task Form.</p>
              )}
            </div>
          </div>
        </>
      )}

      {currentPage === 'itemform' && (
        <div className="container my-3">
          <ItemForm
            onTaskAdded={fetchTasks}
            tasks={tasks}
            editingTask={editingTask}
            setEditingTask={setEditingTask}
            onDelete={deleteHomeTask}
            onToggle={toggleHomeTask}
          />
        </div>
      )}

      {currentPage === 'about' && (
        <About />
      )}

      {currentPage === 'project' && (
        <Project />
      )}

      {currentPage === 'products' && (
        <div className="container my-3">
          <NewProducts />
        </div>
      )}

      <Footer />
    </div>
  );
}
