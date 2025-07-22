// src/pages/Signup.jsx
import AuthForm from "../components/AuthForm";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
 

export default function Signup() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (form) => {
    try {
      await api.post("/signup", form);
      navigate("/");
    } catch (err) {
      setErrorMessage("Signup failed. Try again");
       console.log(err);
    }
  };

  return (
    <>
    <AuthForm title="Sign Up" onSubmit={handleSignup} isLogin={false} />;
     {errorMessage && (
  <p className="text-sm text-red-500 text-center">{errorMessage}</p>
 )}
    </>
  )
}
