// Navbar.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAppDispatch } from '../hooks/useTypedSelector';
import { logoutUser } from '../features/userSlice';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated, isAdminRoleExists } = useAuth();

  const logOutUser = async () => {
    try {
      await dispatch(logoutUser());
      navigate('/login')
    } catch (error) {
      
    }
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Navbar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" to="/list">List</Link>
                </li>
                {isAdminRoleExists ? (
                  <>
                    <li className="nav-item dropdown">
                      <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Dropdown
                      </Link>
                      <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="#">Action</Link></li>
                        <li><Link className="dropdown-item" to="#">Another action</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><Link className="dropdown-item" to="#">Something else here</Link></li>
                      </ul>
                    </li>
                  </>
                ) : null}
                
                <li className="nav-item">
                  <button className='btn btn-danger' onClick={() => logOutUser()}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">LogIn</Link>
                </li>
              </>
            )}
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
