import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserDash from "./views/userDash";
import MyAccount from "./views/MyAccount";
import UpdateProfile from "./views/updateprofile";
import UpdateBilling from "./views/updatebilling";
import Header from "./components/userDashHeader/UserHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./views/Home";
import Login from "./views/Login";
import FakeLogin from "./views/fakeLogin";
const App: React.FC = () => {
  return (
    <Router>
      {/* <Header /> */}
      <ToastContainer />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<FakeLogin />} />

          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/UserDash/:id" element={<UserDash />} />

          <Route path="/MyAccount/:id" element={<MyAccount />} />
          <Route path="/updateprofile" element={<UpdateProfile />} />
          <Route path="/updatebilling" element={<UpdateBilling />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
