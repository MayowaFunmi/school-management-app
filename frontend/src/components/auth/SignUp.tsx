import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { baseUrl } from '../../config/Config';

const SignUp: React.FC = () => {
  const backgroundImages = {
		backgroundImage: 'url("/background-students.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
	};

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const notifyError = (msg: string) => toast.error(msg);
  const notifySuccess = (msg: string) => toast.success(msg);
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // check if all fields are filled
    if (!username || !firstName || !lastName || !email || !password || !confirmPassword) {
      notifyError("None of the fields must be empty")
      return;
    }

    if (!emailRegex.test(email)) {
      notifyError("Email is invalid");
      return;
    }

    try {
      const result = await axios.post(`${baseUrl}/api/users/register-user`, {
        username, firstName, lastName, email, password
      })
      if (result.status === 200) {
        setUsername("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        notifySuccess(result.data.message);
        navigate('/login');
      } else if (result.status === 500) {
        notifyError(result.data.message)
      }
    } catch (error) {
      console.log("error = ", error)
    }
  }
  return (
    <div style={backgroundImages}>
      <div className='container'>
        <h3>Sign up page</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingUsername" 
              placeholder="Enter your username"
              name='username'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <label htmlFor="floatingUsername">Username</label>
          </div>
          
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control" 
              id="floatingFirstName" 
              placeholder="Enter your first Name" 
              required
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            <label htmlFor="floatingFirstName">First Name</label>
          </div>
          
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingLastName" 
              placeholder="Enter Your Last Name" 
              required 
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            <label htmlFor="floatingLastName">Last Name</label>
          </div>

          <div className="form-floating mb-3">
            <input 
              type="email" 
              className="form-control" 
              id="floatingEmail" 
              placeholder="Enter email address" 
              required 
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <label htmlFor="floatingEmail">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password" 
              className="form-control" 
              id="floatingPassword" 
              placeholder="Enter Password" 
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="form-floating mb-3">
          <input
              type="password" 
              className="form-control" 
              id="floatingPassword2" 
              placeholder="Enter Password Again" 
              required
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <label htmlFor="floatingPassword2">Confirm Password</label>
          </div>

          <div className="col-12">
            <button type='submit' className="btn btn-primary">Register</button>
          </div>

          <div>
            Already have an account?
            <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp