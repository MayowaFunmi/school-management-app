import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios, { AxiosRequestConfig } from 'axios';
import { baseUrl } from '../../config/Config';

const UpdateUserRole = () => {
  interface Users {
    _id: string
    username: string
    firstName: string
    lastName: string
    email: string
    roles: { roleName: string }[];
    uniqueId: string
    createdAt: string
  }
  const { isAuthenticated, isSuperAdminRoleExists, token } = useAuth();
  const [uniqueId, setUniqueid] = useState('');
  const [userDetails, setUserDetails] = useState<Users | undefined>(undefined);
  const notifyError = (msg: string) => toast.error(msg);
  const notifySuccess = (msg: string) => toast.success(msg);

  if (!isAuthenticated && !isSuperAdminRoleExists) {
    return <Navigate to="/" />;
  }

  const options = {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const handleGetUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uniqueId) {
      notifyError("Unique ID of user cannot be empty");
    }
    const endpoint = `${baseUrl}/api/users/get-user-by-unique-id?uniqueId=${uniqueId}`;
    try {
      const axiosConfig: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        
      }
      const response = await axios.get(endpoint, axiosConfig);
      setUserDetails(response.data.data);
      notifySuccess(response.data.message);
    } catch (error) {
      console.log(`error = ${error}`);
    }
  }
  return (
    <>
      {/* get user by */}
      <div className="container">
        <form onSubmit={handleGetUser}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingUniqueId" 
              placeholder="Enter user's unique id"
              name='uniqueId'
              value={uniqueId}
              onChange={(e) => {
                setUniqueid(e.target.value);
              }}
            />
            <label htmlFor="floatingUniqueId">Unique ID</label>
          </div>

          <div className="col-12">
            <button type='submit' className="btn btn-primary">Get User Details</button>
          </div>
        </form>

        {/* user data */}
        <h2>User Details</h2>
        {userDetails ? (
          <>
            <p>Id: {userDetails._id.toString()}</p>
            <p>Unique Id: {userDetails.uniqueId}</p>
            <p>Username: {userDetails.username}</p>
            <p>First Name: {userDetails.firstName}</p>
            <p>Last Name: {userDetails.lastName}</p>
            <p>Email: {userDetails.email}</p>
            <p>Date Registered: {new Date(userDetails.createdAt).toLocaleString('en-US')}</p>
            <p>Roles:</p>
            <ul>
              {userDetails.roles.map((role, index) => (
                <li key={index}>{role.roleName}</li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </>
  )
}

export default UpdateUserRole