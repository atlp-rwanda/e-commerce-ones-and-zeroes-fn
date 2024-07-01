// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../redux/store';
// import { deleteTodo } from '../redux/slices/exampleSlice';

// // Define the type for the task
// interface Task {
//   id: number;
//   text: string;
// }

// const TaskList: React.FC = () => {
//   // Specify the type for the state slice
//   const tasks = useSelector((state: RootState) => state.example.tasks);
//   const dispatch = useDispatch();

//   // Specify the type for the handleDelete function
//   const handleDelete = (id: number) => {
//     dispatch(deleteTodo(id));
//   };

//   return (
//     <div className="tasklist">
//       <div className="display-tasks">
//         <h3>Your tasks:</h3>
//         <ul className="tasks">
//           {tasks.map((task: Task) => (
//             <li className="task" key={task.id}>
//               {task.text}
//               <button
//                 className="delete-btn"
//                 onClick={() => handleDelete(task.id)}
//               >
//                 delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default TaskList;