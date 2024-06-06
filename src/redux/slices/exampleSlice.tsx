import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for a task
interface Task {
  id: number;
  text: string;
}

// Define the type for the slice state
interface TodoState {
  tasks: Task[];
}

// Initial state with type annotation
const initialState: TodoState = {
  tasks: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.tasks.push({ id: Date.now(), text: action.payload });
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
});

export const { addTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
