import React, { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { getAllOrganizations, getOrganizationZones } from '../../features/adminSlice';
import { toast } from 'react-toastify';

const OrganizationsList: React.FC = () => {
  const { isAuthenticated, isSuperAdminRoleExists } = useAuth();
  const { allOrganizations, allOrgsMsg, allZones, allZoneMsg } = useAppSelector((state) => state.admin);

  const dispatch = useAppDispatch();
  const notifySuccess = (msg: string) => toast.success(msg);

  useEffect(() => {
    if (allZoneMsg === "success") {
      notifySuccess(allZoneMsg)
    }
    dispatch(getAllOrganizations());
  }, [dispatch, allZoneMsg])

  const getZones = async (id: string) => {
    try {
      await dispatch(getOrganizationZones(id));
    } catch (error) {
      console.error('Error fetching organization zones:', error);
    }
  };

  if (!isAuthenticated && !isSuperAdminRoleExists) {
    return <Navigate to="/" />;
  }

  const formatDate = (time: string) => {
    return new Intl.DateTimeFormat('en-US').format(new Date(time));
  };

  return (
    <>
      <h2>List all organizations</h2>
      {allOrgsMsg === "success" && 
        <>
          {allOrganizations?.map((org) => (
            <>
              <div key={org._id.toString()}>
                <p>Unique Id: {org.userId.uniqueId}</p>
                <p>First Name: {org.userId.firstName}</p>
                <p>Last Name: {org.userId.lastName}</p>
                <p>Email: {org.userId.email}</p>
                <p>Username: {org.userId.username}</p>
                <p>Organization Name: {org.organizationName}</p>
                <p>Organization Unique Id: {org.organizationUniqueId}</p>
                <div>
                  <button className='btn btn-info' onClick={() => getZones(org.organizationUniqueId)}>
                    List Zones For {org.organizationName} Organization
                  </button>
                </div>
                <hr />
              </div>

              {allZones?.map((zone) => (
                <>
                  <div key={zone._id.toString()}>
                    <p>Zone Name: {zone.name}</p>
                    <p>Organization Unique Id: {zone.organizationId.organizationUniqueId}</p>
                    <p>Organization Name: {zone.organizationId.organizationName}</p>
                    <p>Time Added: {formatDate(zone.createdAt.toString())}</p>
                  </div>
                </>
              ))}
            </>
          ))}
        </>
      }
    </>
  )
}

export default OrganizationsList