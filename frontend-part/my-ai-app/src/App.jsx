import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import './App.css'

export default function App() {
  return (
    <div className="bg-white">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
         <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}
