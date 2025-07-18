import { useState } from 'react';
import { register } from '../api';
import { useNavigate, Link } from 'react-router-dom';
import "../App.css";

function Register() {
  const [form, setForm] = useState({  firstName:'', lastName:'',email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await register(form);
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    } catch {
      alert('Registration failed');
    }
  };

  return (
 <div className="min-h-screen flex justify-center text-left items-center pb-3">
  <form onSubmit={handleSubmit} className="card w-1/4 bg-base-100 shadow-xl p-8 ">
    <fieldset className="bg-base-200 border border-base-300 rounded-box p-4 w-96  max-w-sm mx-auto">
      <legend className="text-lg font-bold">Register</legend>

     
     <br />
      <div className="form-control mb-3">
        <label htmlFor="firstName" className="label">
         First Name
        </label>
        <br />
       
        <input
          id="firstName"
          type="text"
          className="input input-bordered input-sm form-input"
          placeholder="First Name"
          onChange={e => setForm({ ...form, firstName: e.target.value })}
        />
      </div>

     <br />

      <div className="form-control mb-3">
        <label htmlFor="lastName" className="label">
          Last Name
        </label>
         <br />
        <input
          id="lastName"
          type="text"
          className="input input-bordered input-sm form-input"
          placeholder="Last Name"
          onChange={e => setForm({ ...form, lastName: e.target.value })}
        />
      </div>

     <br />

      <div className="form-control mb-3">
        <label htmlFor="email" className="label">
         Email
        </label>
         <br />
        <input
          id="email"
          type="email"
          className="input input-bordered input-sm form-input"
          placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
      </div>
     <br />


      <div className="form-control mb-4">
        <label htmlFor="password" className="label">
         Password
        </label>
         <br />
        <input
          id="password"
          type="password"
          className="input input-bordered input-sm form-input"
          placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />
      </div>
       <br />

      <div className="mt-6">
        <button type="submit" className="btn btn-neutral w-full">Register</button>
      </div>
    </fieldset>

    <p className="mt-4 text-sm text-center">
      Already have an account? <Link to="/login" className="link link-primary">Login</Link>
    </p>
  </form>
</div>
  );
}

export default Register;
