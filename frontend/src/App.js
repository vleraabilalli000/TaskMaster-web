import React from "react";
import "./App.css";
import TaskList from "./TaskList"; // import komponentin që ke bërë

function App() {
  return (
    <div className="App">
      <h1>TaskMaster</h1>
      <TaskList />  {/* shfaq lista e detyrave */}
    </div>
  );
}

export default App;