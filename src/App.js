import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";


import HomePage from "./components/HomePage/HomePage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import UserView from "./components/UserView/UserView";

function App() {
  return (
  <Router>
    <Routes>
    <Route path="/" element={<Login/>}></Route>
      <Route path="/sign-in" element={<Login/>}></Route>
      <Route path="/sign-out" element={<Register/>}></Route>
      <Route path="/dashboard" element={<HomePage/>}></Route>
      <Route path="/allmoviesReview" element={<HomePage user={true}/>}></Route>
      <Route path="/addReview" element={<UserView/>}></Route>
    </Routes>
  </Router>
  );
}

export default App
