import React from 'react'
import { Organization, OrganizationZonesModalProps, Zone } from '../models/userModel';

const GetZonesModal: React.FC<OrganizationZonesModalProps> = ({ isModalOpen, closeModal, allZones, zoneMsg, org }) => {

  const formatDate = (time: string) => {
    return new Intl.DateTimeFormat('en-US').format(new Date(time));
  };
  
  return (
    <>
      <div className={`modal ${isModalOpen ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: isModalOpen ? 'block' : 'none' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Organization Zones For {org.organizationName}</h5>
                <button type="button" className="close" onClick={closeModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                
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
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default GetZonesModal