import { useState } from 'react';
import { login } from '../api';
import { useNavigate, Link } from 'react-router-dom';
import "../App.css";

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Form submitted:', form); 

  try {
    const { data } = await login(form);
    console.log('Login success:', data); 
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user)); 
    console.log('Navigating to /dashboard...'); 
    navigate('/dashboard');
    console.log('After navigate'); // Should never appear
  } catch (err) {
    console.error('Login error:', err.response?.data || err.message); // 🔍
    alert('Login failed');
  }
};


  return (
 <div className="min-h-screen flex   justify-center text-left items-center pb-3">
  <form onSubmit={handleSubmit} className="card w-1/4 bg-base-100 shadow-xl p-8 ">
    <fieldset className="bg-base-200 border border-base-300 rounded-box w-full max-w-sm mx-auto">
      <legend className="fieldset-legend text-bold">Login</legend>

     
     <br />
      <div className="form-control mb-3">
        <label htmlFor="email" className="label">
          Email
        </label>
        <br />
        <input
          id="email"
          type="email"
          className="input input-bordered form-input input-sm"
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
      </div>
    <br />
     
        <label htmlFor="password" className="label">
         Password
        </label>
        <br />
        <input
          id="password"
          type="password"
          className="input input-bordered form-input input-sm"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
    
     <br />
     <br />

      <div className="mt-6">
        <button type="submit" className="btn btn-neutral w-full">Login</button>
      </div>
    </fieldset>

    <p className="mt-4 text-sm text-center">
      Don't have an account? <Link to="/register" className="link link-primary">Register</Link>
    </p>
  </form>
</div>

  );
}

export default Login;