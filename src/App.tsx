import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './styles/index.scss';
import Signup from './Pages/Signup/Signup';
import Toast from './components/Toast/Toast';
import DummyHomePage from './Pages/DummyHomePage/DummyHomePage';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
      <Routes>

        <Route  path='/' element={<DummyHomePage />}/>
        <Route  path='/signup' element={<Signup />}/>
        
      {/* <Task /> */}
      {/* <TaskList /> */}

      </Routes>
      </BrowserRouter>
      {/* <Toast /> */}


    </div>
  );
}

export default App;
