import React from "react";
import Home from "./pages/Home/Home";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import Profile from "./pages/Profile/Profile";

const routes = (
  <Router>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/login" exact element={<LogIn />} />
      <Route path="/signup" exact element={<SignUp />} />
      <Route path="/forgotPassword" exact element={<ForgotPassword />} />
      <Route path="/resetPassword" exact element={<ResetPassword />} />
      <Route path="/profile" exact element={<Profile />} />
    </Routes>
  </Router>
);

const App = () => {
  return <div>{routes}</div>;
};

export default App;
