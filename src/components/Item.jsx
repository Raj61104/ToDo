import React, { useState } from 'react';

const Item = ({ task, onToggle, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(task.id, editText);
    }
    setIsEditing(!isEditing);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <button
        className={`check-button ${task.completed ? 'checked' : ''}`}
        onClick={() => onToggle(task.id)}
      >
        ✓
      </button>
      <div className="task-content">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="edit-input"
            autoFocus
          />
        ) : (
          <>
            <span className="task-text">{task.text}</span>
            {task.isDaily && <span className="daily-badge">🔄</span>}
            {task.deadline && <span className="deadline">Due: {new Date(task.deadline).toLocaleDateString()}</span>}
          </>
        )}
      </div>
      <div className="task-actions">
        <button onClick={handleEdit} className="edit-button" title={isEditing ? "Save" : "Edit"}>
          {isEditing ? 'Save' : 'Edit'}
        </button>
        <button onClick={() => onDelete(task.id)} className="delete-button" title="Delete">
          Del
        </button>
      </div>
    </div>
  );
};

export default Item;