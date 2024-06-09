import React from 'react';
import Task from "./components/Example";
import './styles/index.scss';

import TaskList from "./components/ExampleList";

function App() {
  return (
    <div className="App">
      <Task />
      <TaskList />
    </div>
  );
}

export default App;
