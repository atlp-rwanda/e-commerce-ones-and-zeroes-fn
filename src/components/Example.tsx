import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/slices/exampleSlice";

const Task: React.FC = () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const addNewTask = () => {
    if (inputRef.current) {
      const task = inputRef.current.value.trim();
      if (task !== "") {
        dispatch(addTodo(task));
        inputRef.current.value = "";
      }
    }
  };

  return (
    <div className="task-component">
      <div className="add-task">
        <input
          type="text"
          placeholder="Add task here..."
          ref={inputRef}
          className="taskInput"
        />
        <button onClick={addNewTask}>Add task</button>
      </div>
    </div>
  );
};

export default Task;