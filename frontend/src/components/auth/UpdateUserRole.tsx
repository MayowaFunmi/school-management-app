import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from "../../hooks/useTypedSelector";
import { getUserDetails } from '../../features/adminSlice';
import Spinner from '../../spinner/Spinner';

const UpdateUserRole: React.FC = () => {
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
  const { isAuthenticated, isSuperAdminRoleExists } = useAuth();
  const [uniqueId, setUniqueid] = useState('');
  //const [msg, setMsg] = useState('');
  const [userDetails, setUserDetails] = useState<Users | undefined>(undefined);
  const notifyError = (msg: string) => toast.error(msg);

  const dispatch = useAppDispatch();
  const { loading, data, status } = useAppSelector((state) => state.admin);

  useEffect(() => {
    if (!loading) {
      //setMsg(message);
      setUserDetails(data);
    }
  }, [data, loading])

  if (!isAuthenticated && !isSuperAdminRoleExists) {
    return <Navigate to="/" />;
  }

  const handleGetUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uniqueId) {
      notifyError("Unique ID of user cannot be empty");
    }
    dispatch(getUserDetails(uniqueId));
  };

  return (
    <>
      {/* get user by */}
      <div className="container">
		    <Spinner loading={loading} />
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
            {status === "" && <button type='submit' className="btn btn-primary">Get User Details</button>}
            {status === "pending" && <button type='submit' className="btn btn-primary" disabled>Please wait ...</button>}
            {(status === "success" || status === "rejected") && null}
            
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