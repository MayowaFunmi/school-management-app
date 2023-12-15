import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser } from '../features/userSlice';
import { useAppDispatch, useAppSelector } from '../hooks/useTypedSelector';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const backgroundImages = {
		backgroundImage: 'url("/background-students.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
	};

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const { message, status } = useAuth();
	const navigate = useNavigate();

  const notifyError = (msg: string) => toast.error(msg);
  const notifySuccess = (msg: string) => toast.success(msg);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // check if all fields are filled
    if (!username || !password ) {
      notifyError("None of the fields must be empty")
      return;
    }

    try {
      const userCredentials = {
        username, password
      };
      dispatch(loginUser(userCredentials));
	  notifySuccess(message);
	  navigate('/');
    } catch (error) {
	  notifyError(message);
    }
  }

  return (
    <div style={backgroundImages}>
      <div className='container'>
		<h3>Login page</h3>
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

			<div className="col-12">
				{status === "" && <button type='submit' className="btn btn-primary">Login</button>}
				{status === "pending" && <button type='submit' className="btn btn-primary">{message}</button>}
				{status === "rejected" && <button type='submit' className="btn btn-primary">Something Went Wrong</button>}
				
			</div>

			<div>
				Don't have an account?
				<Link to="/signup">Sign Up</Link>
			</div>
		</form>
      </div>
    </div>
  )
}

export default Login;