// src/pages/Login.jsx
import AuthForm from "../components/AuthForm";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';


export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (form) => {
    try {
      const res = await api.post("/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
       setErrorMessage("Invalid email or password.");
       console.log(err);
    }
  };

  return (
    <>
  <AuthForm title="Login" onSubmit={handleLogin} isLogin={true} />
   {errorMessage && (
  <p className="text-sm text-red-500 text-center">{errorMessage}</p>
 )}
 </>
 
);

}
