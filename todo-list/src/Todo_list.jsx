import React, { useState } from "react";
import todo from './assets/todo.jpeg';

function Todo_list() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [updatedText, setUpdatedText] = useState("");

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    }
  }

  function deleteTask(index) {
    const updateTasks = tasks.filter((_, i) => i !== index);
    setTasks(updateTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updateTasks = [...tasks];
      [updateTasks[index], updateTasks[index - 1]] = [
        updateTasks[index - 1],
        updateTasks[index],
      ];
      setTasks(updateTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updateTasks = [...tasks];
      [updateTasks[index], updateTasks[index + 1]] = [
        updateTasks[index + 1],
        updateTasks[index],
      ];
      setTasks(updateTasks);
    }
  }

  function startEdit(index) {
    setEditingIndex(index);
    setUpdatedText(tasks[index]);
  }

  function saveUpdate(index) {
    const updateTasks = [...tasks];
    updateTasks[index] = updatedText;
    setTasks(updateTasks);
    setEditingIndex(null);
    setUpdatedText("");
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 w-full bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,139,0.92), rgba(0,0,205,0.91)), url(${todo})`,
         backgroundSize: 'cover',
          backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-lg bg-white/90 shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          TO-DO LIST APP
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter a task..."
            value={newTask}
            onChange={handleInputChange}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <button
            onClick={addTask}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg 
                       hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>

        <ol className="space-y-3">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-50 
                         px-4 py-2 rounded-lg shadow-sm border"
            >
              {editingIndex === index ? (
                <input
                  type="text"
                  value={updatedText}
                  onChange={(e) => setUpdatedText(e.target.value)}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded-lg 
                             focus:ring-2 focus:ring-green-400 focus:outline-none mr-2"
                />
              ) : (
                <span className="text-gray-800">{task}</span>
              )}

              <div className="flex gap-2">
                {editingIndex === index ? (
                  <button
                    onClick={() => saveUpdate(index)}
                    className="px-2 py-1 text-sm bg-green-500 text-white 
                               hover:bg-green-600 rounded-md transition"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(index)}
                    className="px-2 py-1 text-sm bg-indigo-500 text-white 
                               hover:bg-indigo-600 rounded-md transition"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => moveTaskUp(index)}
                  className="px-2 py-1 text-sm bg-yellow-400 hover:bg-yellow-500 
                             rounded-md transition"
                >
                  Up
                </button>

                <button
                  onClick={() => moveTaskDown(index)}
                  className="px-2 py-1 text-sm bg-purple-400 hover:bg-purple-500 
                             rounded-md transition"
                >
                  Down
                </button>

                <button
                  onClick={() => deleteTask(index)}
                  className="px-2 py-1 text-sm bg-red-500 text-white 
                             hover:bg-red-600 rounded-md transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Todo_list;
