import React, { useState } from 'react';


const Card = ({ title, description, category, details, actionText = 'More Details', completed, onToggle, onDelete, onEdit }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [liked, setLiked] = useState(false);
  const [purchased, setPurchased] = useState(false);
  const [done, setDone] = useState(completed);
  const [read, setRead] = useState(false);

  const toggleDetails = () => setShowDetails(!showDetails);

  const handleLike = () => setLiked(!liked);

  const handlePurchase = () => setPurchased(!purchased);

  const handleComplete = () => {
    setDone(!done);
    if (onToggle) onToggle();
  };

  const handleRead = () => setRead(!read);

  return (
    <div className={`card h-100 ${done ? 'border-success' : ''}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <h6 className={`card-title mb-1 ${done ? 'text-success' : ''}`}>
            {title ? title : 'Untitled'}
          </h6>
          <span className="badge text-bg-secondary">{category || 'General'}</span>
        </div>
        <p className={`card-text ${done ? 'text-muted text-decoration-line-through' : ''}`}>
          {description || 'No description'}
        </p>
        <div className="d-flex gap-2">
          <button
            className={`btn btn-sm ${done ? 'btn-success' : 'btn-outline-success'}`}
            onClick={handleComplete}
          >
            {done ? 'Completed' : 'Mark Complete'}
          </button>

          {typeof onEdit === 'function' && (
            <button className="btn btn-sm btn-outline-primary" onClick={onEdit}>
              Edit
            </button>
          )}

          {typeof onDelete === 'function' && (
            <button className="btn btn-sm btn-outline-danger" onClick={onDelete}>
              Delete
            </button>
          )}
        </div>

        {showDetails && details && (
          <div className="card-details">
            {Object.entries(details).map(([key, value]) => (
              <p key={key} className="card-text">
                <strong>{key}:</strong> {value}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="card-footer">
        <div className="button-group">
          <button
            className={`btn-like ${liked ? 'active' : ''}`}
            onClick={handleLike}
          >
            {liked ? ' Liked' : ' Like'}
          </button>

          <button
            className={`btn-purchase ${purchased ? 'active' : ''}`}
            onClick={handlePurchase}>
            {purchased ? ' Purchased' : ' Purchase'}
          </button>

          <button
            className={`btn-complete ${done ? 'active' : ''}`}
            onClick={handleComplete}>
            {done ? ' Completed' : ' Mark as Done'}
          </button>

          <button
            className={`btn-read ${read ? 'active' : ''}`}
            onClick={handleRead}>
            {read ? ' Read' : ' Read'}
          </button>

          <button
            className="btn-expand"
            onClick={toggleDetails}
          >
            {showDetails ? '🔼 Collapse' : '🔽 Expand Details'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;