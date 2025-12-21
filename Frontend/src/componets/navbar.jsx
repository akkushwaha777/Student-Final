import React from 'react';

function Navbar({ onNavigate, currentPage, taskCount, theme, toggleTheme, onLogout }) {
  const tabs = [
    { key: 'home', label: 'Home' },
    { key: 'about', label: 'About' },
    { key: 'project', label: 'Project' },
    { key: 'products', label: 'Products' },
    { key: 'itemform', label: 'Add Task' }
  ];

  return (
    <nav className={`premium-navbar`}>
      <div className="nav-content">
        <div className="brand" onClick={() => onNavigate('home')}>
          Student Record Manager
        </div>

        <ul className="nav-links">
          {tabs.map(t => (
            <li key={t.key}>
              <button
                className={`nav-link-custom ${currentPage === t.key ? 'active' : ''}`}
                onClick={() => onNavigate(t.key)}
              >
                {t.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <span className="task-badge">
            Tasks: {taskCount}
          </span>

          <button className="theme-btn" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;