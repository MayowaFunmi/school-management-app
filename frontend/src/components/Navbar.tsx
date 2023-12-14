// Navbar.tsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/useTypedSelector';
import { useJwt } from 'react-jwt';
import { baseUrl } from '../config/Config';
import { isAdminRole } from '../utils/isAdminRole';
//import { decodedToken } from '../utils/jwtUtils';
// import { hasAdminRole } from '../utils/checkRoleInRoles';

const Navbar: React.FC = () => {

  interface DecodedToken {
    userId: string;
    roles: string[];
    iat: number;
    exp: number;
    // Add other properties if present
  }

  const [userId, setUserId] = useState<string>("");
  const [roleIds, setRoleIds] = useState<string[]>([]);
  const [tokenExpired, setTokenExpired] = useState(Boolean);
  const [isAdminRoleExists, setIsAdminRoleExists] = useState<boolean | null>(null);

  const { isAuthenticated, token } = useAppSelector((state) => state.user);
  const { decodedToken, isExpired } = useJwt(token);

  useEffect(() => {
    if (decodedToken) {
      const { roles, userId } = decodedToken as DecodedToken;
      setUserId(userId);
      setRoleIds(roles);
      setTokenExpired(isExpired)
    };
    const rolesApiEndpoint = `${baseUrl}/api/roles/show-all-roles`;
    const fetchData = async () => {
      const isAdmin = await isAdminRole({ roleIds }, rolesApiEndpoint, token);
      setIsAdminRoleExists(isAdmin);
    }
    fetchData();
  }, [decodedToken, roleIds, userId, isExpired, tokenExpired, token, isAdminRoleExists])


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
                ) : null}
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign Up</Link>
                </li>
                
                <li className="nav-item">
                  <Link className="nav-link" to="#">Disabled</Link>
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
