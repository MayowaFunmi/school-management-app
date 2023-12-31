import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector'
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createZone } from '../../features/adminSlice';

interface ZoneProps {
  organizationUniqueId: string
}

const Zones: React.FC<ZoneProps> = ({ organizationUniqueId }) => {

  const { zoneMsg, zone } = useAppSelector((state) => state.admin);
  const { isAuthenticated, isAdminRoleExists } = useAuth();
  const dispatch = useAppDispatch();

  const [zoneName, setZoneName] = useState("")

  const notifyError = (msg: string) => toast.error(msg);
  const notifySuccess = (msg: string) => toast.success(msg);

  useEffect(() => {
    if (zoneMsg === "success") {
      notifySuccess("zone created successfully")
    } else if (zoneMsg === "rejected") {
      notifyError(zoneMsg)
    }
  }, [zoneMsg])

  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }
  if (!isAdminRoleExists) {
    return <Navigate to='/' />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const zoneValues = { organizationUniqueId, zoneName};
    if (!zoneName || !organizationUniqueId) {
      notifyError("Organization Unique Id or zone name cannot be empty");
      return;
    }
    await dispatch(createZone(zoneValues));
  }

  return (
    <>
      <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
					<input
						type="text"
						className="form-control"
						id="zoneName" 
						placeholder="Enter user's unique id"
						name='userId'
						value={zoneName}
						onChange={(e) => {
							setZoneName(e.target.value);
						}}
					/>
					<label htmlFor="ZoneName">Name Of Zone</label>
				</div>

				<div className="col-12">
          {zoneMsg !== "success" ? (
            <button type='submit' className="btn btn-primary">Create Zone</button>
          ) : null}
					
				</div>
			</form>

      {/* {zoneMsg === "success" && (
        <>
          {zone?.map((z) => (
            <>
              <p>{z.}</p>
            </>
          ))}
        </>
      )} */}
      </div>
      <hr />
    </>
  )
}

export default Zones