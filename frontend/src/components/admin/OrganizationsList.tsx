import React, { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { getAllOrganizations } from '../../features/adminSlice';

const OrganizationsList: React.FC = () => {
  const { isAuthenticated, isSuperAdminRoleExists } = useAuth();
  const { allOrganizations, allOrgsMsg } = useAppSelector((state) => state.admin);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllOrganizations());
  }, [dispatch])

  if (!isAuthenticated && !isSuperAdminRoleExists) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <h2>List all organizations</h2>
      {allOrgsMsg === "success" && 
        <>
          {allOrganizations.map((org) => (
            <div key={org._id.toString()}>
              <p>Unique Id: {org.userId.uniqueId}</p>
              <p>First Name: {org.userId.firstName}</p>
              <p>Last Name: {org.userId.lastName}</p>
              <p>Email: {org.userId.email}</p>
              <p>Username: {org.userId.username}</p>
              <p>Organization Name: {org.organizationName}</p>
              <p>Organization Unique Id: {org.organizationUniqueId}</p>
              <hr />
            </div>
          ))}
        </>
      }
    </>
  )
}

export default OrganizationsList