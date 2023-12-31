import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector';
import { getAllOrganizations, getOrganizationZones, resetAllZones } from '../../features/adminSlice';
import { toast } from 'react-toastify';
import { Organization as UserOrganization } from '../../models/userModel';
import store from '../../store/store';

const OrganizationsList: React.FC = () => {
  const { isAuthenticated, isSuperAdminRoleExists } = useAuth();
  const { allOrganizations, allOrgsMsg, allZones, allZoneMsg } = useAppSelector((state) => state.admin);
  const [organizationDetails, setOrganizationDetails] = useState<UserOrganization | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const notifySuccess = (msg: string) => toast.success(msg);

  useEffect(() => {
    if (allZoneMsg === "success") {
      notifySuccess(allZoneMsg)
    }
    dispatch(getAllOrganizations());
  }, [dispatch, allZoneMsg])

  const handleViewDetails  = (org: UserOrganization) => {
    // reset the state
    store.dispatch(resetAllZones())
    setOrganizationDetails(org);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setOrganizationDetails(null);
    setIsModalOpen(false);
  };

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
      <hr />
      {allOrganizations?.map((org) => (
        <>
          <div key={org._id.toString()}>
          <p><strong>Organization Name: {org.organizationName}</strong></p>
            <p>User Unique Id: {org.userId.uniqueId}</p>
            <p>First Name: {org.userId.firstName}</p>
            <p>Last Name: {org.userId.lastName}</p>
            <p>Email: {org.userId.email}</p>
            <p>Username: {org.userId.username}</p>
            <p>Organization Unique Id: {org.organizationUniqueId}</p>
            <div>
              <button className='btn btn-info' onClick={() => handleViewDetails(org)}>
                View Details
              </button>
            </div>
            <hr />
          </div>

          {/* {allZones?.map((zone) => (
            <>
              <div key={zone._id.toString()}>
                <p>Zone Name: {zone.name}</p>
                <p>Organization Unique Id: {zone.organizationId.organizationUniqueId}</p>
                <p>Organization Name: {zone.organizationId.organizationName}</p>
                <p>Time Added: {formatDate(zone.createdAt.toString())}</p>
              </div>
            </>
          ))} */}
        </>
      ))}

      {/* Bootstrap Modal */}
      {organizationDetails && (
        <div className={`modal ${isModalOpen ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: isModalOpen ? 'block' : 'none' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Organization Details For {organizationDetails.organizationName}</h5>
                <button type="button" className="close" onClick={closeModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Display organization details in the modal */}
                <p>Organization Name: {organizationDetails.organizationName}</p>
                <p>Organization Unique Id: {organizationDetails.organizationUniqueId}</p>
                <button className='btn btn-info' onClick={() => getZones(organizationDetails.organizationUniqueId)}>List Zones</button>
                {allZones.length !== 0 && (
                  <>
                    <p>{allZones?.length} {allZones?.length === 1 ? 'zone' : 'zones'}:</p>
                    <hr />
                    {allZones?.map((zone) => (
                      <>
                        <div key={zone._id.toString()}>
                          <p>Zone Name: {zone.name}</p>
                          <p>Organization Unique Id: {zone.organizationId.organizationUniqueId}</p>
                          <p>Organization Name: {zone.organizationId.organizationName}</p>
                          <p>Time Added: {formatDate(zone.createdAt.toString())}</p>
                        </div>
                        <hr />
                      </>
                    ))}
                  </>
                )}
                
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default OrganizationsList