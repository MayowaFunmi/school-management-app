import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useTypedSelector'
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createOrganization } from '../../features/adminSlice';

const Organization = () => {

  const { orgMsg, orgStatus } = useAppSelector((state) => state.admin);
  const { isAuthenticated, isAdminRoleExists } = useAuth();
  const dispatch = useAppDispatch();

  const [organizationName, setOrganizationName] = useState("")

  const notifyError = (msg: string) => toast.error(msg);
  const notifySuccess = (msg: string) => toast.success(msg);

  useEffect(() => {
    if (orgStatus === "success") {
      notifySuccess(orgMsg)
    } else if (orgStatus === "rejected") {
      notifyError(orgMsg)
    }
  }, [orgMsg, orgStatus])

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
    </>
  )
}

export default Organization