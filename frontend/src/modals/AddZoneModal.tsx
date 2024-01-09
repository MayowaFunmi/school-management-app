import React from 'react'
import { AddZoneModalProps } from '../models/userModel'
import Zones from '../components/admin/Zones'

const AddZoneModal: React.FC<AddZoneModalProps> = ({ isModalOpen, closeModal, org}) => {
  return (
    <>
      <div className={`modal ${isModalOpen ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: isModalOpen ? 'block' : 'none' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New zone to {org.organizationName}</h5>
                <button type="button" className="close" onClick={closeModal} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {<Zones organizationUniqueId={org.organizationUniqueId} />}
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

export default AddZoneModal