import React from "react";
import Home from "./pages/Home/Home";
import LogIn from "./pages/LogIn/LogIn";
import SignUp from "./pages/SignUp/SignUp";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const routes = (
  <Router>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/login" exact element={<LogIn />} />
      <Route path="/signup" exact element={<SignUp />} />
    </Routes>
  </Router>
);

const App = () => {
  return <div>{routes}</div>;
};

export default App;
