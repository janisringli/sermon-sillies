import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./views/auth/login.jsx";
import Register from "./views/auth/register.jsx";
import RegisterConfirmation from "./views/auth/registerConfirmation.jsx";
import Home from "./home";


function App() {
  
  return (
    <div>
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/registerConfirmation" element={<RegisterConfirmation />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
