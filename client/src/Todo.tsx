import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";

const Todo: React.FC = () => {
  const [task, setTask] = useState<string>(""); 
  const [tasks, setTasks] = useState<string[]>([]);

  // Fetch tasks from the backend
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/fetchAllTasks");
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Handle task input change with proper event typing
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const addTask = async () => {
    if (task) {
      try {
        await axios.post("http://localhost:5000/addTask", { task });
        setTask(""); // Clear input field
        fetchTasks(); // Fetch updated tasks
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-orange-600">Note App</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={task}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-l-lg"
            placeholder="New task..."
          />

          <button
            onClick={addTask}
            className="bg-orange-600 text-white px-4 py-2 rounded-r-lg hover:bg-orange-500"
          >
            Add
          </button>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Notes</h2>
          <ul className="space-y-2">
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <li
                  key={index}
                  className="bg-gray-100 p-2 rounded-lg shadow-sm border border-gray-200"
                >
                  {task}
                </li>
              ))
            ) : (
              <p className="text-gray-500">No tasks found.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;