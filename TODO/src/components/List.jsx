import React from 'react';
import Item from './Item';

const List = ({ tasks, onToggle, onEdit, onDelete }) => {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <Item
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default List;