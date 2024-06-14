import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './styles/index.scss';
import Signup from './Pages/Signup/Signup';
import DummyHomePage from './Pages/DummyHomePage/DummyHomePage';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
      <Routes>

        <Route  path='/' element={<DummyHomePage />}/>
        <Route  path='/signup' element={<Signup />}/>
        

      </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
