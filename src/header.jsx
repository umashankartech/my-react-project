
import React, { useState } from 'react';

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, inputValue.trim()]);
      setInputValue('');
    }
  };
  const handleRemoveTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };
  const handleEditTask = (index) => {
    setEditingIndex(index);
    setInputValue(tasks[index]);
  };
  const handleUpdateTask = () => {
    if (inputValue.trim() && editingIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editingIndex ? inputValue.trim() : task
      );
      setTasks(updatedTasks);
      setEditingIndex(null);
      setInputValue('');
    }
  };
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Todo List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter a task"
        style={{ padding: '8px', width: '80%' }}
      />
      {editingIndex !== null ? (
        <button onClick={handleUpdateTask} style={{ padding: '8px', marginLeft: '4px' }}>
          Update Task
        </button>
      ) : (
        <button onClick={handleAddTask} style={{ padding: '8px', marginLeft: '4px' }}>
          Add Task
        </button>
      )}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {tasks.map((task, index) => (
          <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
            {task}
            <div>
              <button onClick={() => handleEditTask(index)} style={{ padding: '4px', marginRight: '4px' }}>
                Edit
              </button>
              <button onClick={() => handleRemoveTask(index)} style={{ padding: '4px' }}>
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;



