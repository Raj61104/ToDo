import React, { useState, useEffect } from 'react';
import Input from './components/Input';
import List from './components/List';
import Filter from './components/Filter';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text, deadline, isDaily) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      deadline: deadline || null,
      isDaily,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
  const currentDate = new Date().toLocaleDateString();

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="app">
      <div className="container">
        <h1>Todo List</h1>
        <div className="stats">
          <div className="stat-item">
            <span className="stat-label">Total</span>
            <span className="stat-value">{total}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Completed</span>
            <span className="stat-value">{completed}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Pending</span>
            <span className="stat-value">{pending}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Progress</span>
            <span className="stat-value">{progress}%</span>
          </div>
          <div className="date">{currentDate}</div>
        </div>
        <Input onAdd={addTask} />
        <div className="controls">
          <Filter currentFilter={filter} onFilterChange={setFilter} />
          <button onClick={clearCompleted} className="clear-button">Clear Completed</button>
        </div>
        <List
          tasks={filteredTasks}
          onToggle={toggleTask}
          onEdit={editTask}
          onDelete={deleteTask}
        />
      </div>
    </div>
  );
}

export default App;
