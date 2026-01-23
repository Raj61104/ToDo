import React, { useState } from 'react';

const Input = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState('');
  const [isDaily, setIsDaily] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim(), deadline, isDaily);
      setText('');
      setDeadline('');
      setIsDaily(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <div className="input-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="input-field"
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="deadline-field"
        />
        <label className="daily-label">
          <input
            type="checkbox"
            checked={isDaily}
            onChange={(e) => setIsDaily(e.target.checked)}
          />
          Daily
        </label>
      </div>
      <button type="submit" className="add-button">
        + Add
      </button>
    </form>
  );
};

export default Input;