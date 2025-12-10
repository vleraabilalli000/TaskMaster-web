import React, { useState, useEffect } from "react";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Merr detyrat nga backend
  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  // Shto detyrë të re
  const addTask = () => {
    if (!newTitle) return;

    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTitle,
        description: newDescription,
      }),
    })
      .then(res => res.json())
      .then(task => setTasks([task, ...tasks])); // shto në krye

    setNewTitle("");
    setNewDescription("");
  };

  return (
    <div>
      <h2>Lista e Detyrave</h2>

      {/* Input për titull */}
      <input
        type="text"
        placeholder="Titulli i detyrës"
        value={newTitle}
        onChange={e => setNewTitle(e.target.value)}
      />

      {/* Input për përshkrim */}
      <input
        type="text"
        placeholder="Përshkrimi i detyrës"
        value={newDescription}
        onChange={e => setNewDescription(e.target.value)}
      />

      <button onClick={addTask}>Shto</button>

      {/* Lista */}
      {tasks.length === 0 ? (
        <p>Nuk ka detyra.</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <strong>{task.title}</strong>  
              <br />
              {task.description}
              <br />
              <em>Statusi:</em> {task.status}
              <br />
              <em>Data:</em> {new Date(task.created_at).toLocaleString()}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;