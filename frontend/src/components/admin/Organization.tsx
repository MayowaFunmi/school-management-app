import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector'
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createOrganization, getAdminOrganizations, getOrganizationZones, resetAllZones } from '../../features/adminSlice';
import Zones from './Zones';
import { Organization as UserOrganization } from '../../models/userModel';
import store from '../../store/store';

const Organization = () => {

  const { orgMsg, orgStatus, organizations, checkOrgs, allZones, zoneMsg } = useAppSelector((state) => state.admin);
  const { isAuthenticated, isAdminRoleExists } = useAuth();
  const dispatch = useAppDispatch();

  const [organizationName, setOrganizationName] = useState("")
  const [orgUniqueId, setOrgUniqueId] = useState("")
  const [organizationDetails, setOrganizationDetails] = useState<UserOrganization | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const notifyError = (msg: string) => toast.error(msg);
  const notifySuccess = (msg: string) => toast.success(msg);

  useEffect(() => {
    if (orgStatus === "success") {
      notifySuccess(orgMsg)
    } else if (orgStatus === "rejected") {
      notifyError(orgMsg)
    }
    dispatch(getAdminOrganizations());
  }, [dispatch, orgMsg, orgStatus])

  if (!isAuthenticated && !isAdminRoleExists) {
    return <Navigate to='/' />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!organizationName) {
      notifyError("Organization name cannot be empty");
      return;
    }
    await dispatch(createOrganization(organizationName))
  }

  const getZones = async (id: string) => {
    try {
      await dispatch(getOrganizationZones(id));
    } catch (error) {
      console.error('Error fetching organization zones:', error);
    }
  };

  const addZone = (id: string) => {
    setOrgUniqueId(id);
  }

  const formatDate = (time: string) => {
    return new Intl.DateTimeFormat('en-US').format(new Date(time));
  };

  const handleViewDetails  = (org: UserOrganization) => {
    // reset the state
    store.dispatch(resetAllZones())
    setOrganizationDetails(org);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setOrganizationDetails(null);
    setIsModalOpen(false);
    setOrgUniqueId("");
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingOrganizationName" 
              name='organizationName'
              value={organizationName}
              onChange={(e) => {
                setOrganizationName(e.target.value);
              }}
            />
            <label htmlFor="floatingOrganizationName">Name Of Organization</label>
          </div>

          <div className="col-12">
            {(orgStatus === "" || orgStatus === "rejected") && <button type='submit' className="btn btn-primary">Create Organization</button>}
            {orgStatus === "pending" && <button type='submit' className="btn btn-primary" disabled>Please wait ...</button>}
            {orgStatus === "success" && null}
          </div>
        </form>
      </div>
      <hr />
      <h3>Your Organizations</h3>
      {/* {checkOrgs === "rejected" && <h3>No organization found for this user</h3>} */}

      {organizations?.map((org) => (
        <>
          <div key={org._id.toString()}>
            <p>Organization Name: {org.organizationName}</p>
            <p>Organization Unique Id: {org.organizationUniqueId}</p>
            <button className='btn btn-info' onClick={() => handleViewDetails(org)}>
              View Details
            </button>
            <hr />
          </div>
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
                <button className='btn btn-info' onClick={() => getZones(organizationDetails.organizationUniqueId)}>List Zones</button> | 
                <button className='btn btn-info' onClick={() => addZone(organizationDetails.organizationUniqueId)}>Add Zone</button>
                {(allZones.length !== 0  || zoneMsg === "success") && (
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

              {orgUniqueId && (
                <Zones organizationUniqueId={orgUniqueId} />
              )}
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}















      {checkOrgs === "success" && 
        <>
          

          {/* <button className='btn btn-info' onClick={() => addZone(org.organizationUniqueId)}>Add Zone</button> */}
          {/* <div>
            {allZones?.length === 0 ? (
              <>
                {<p>{orgUniqueId} has no registered zone.</p>}
              </>
            ) : (
              <>
                <button className='btn btn-info' onClick={() => getZones(orgUniqueId)}>List Zones For {orgUniqueId} Organization</button>
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
            )}
          </div>

          {orgUniqueId && (
            <Zones organizationUniqueId={orgUniqueId} />
          )} */}
        </>
      }
    </>
  )
}

export default Organization