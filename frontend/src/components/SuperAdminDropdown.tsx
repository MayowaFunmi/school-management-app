import React from 'react'
import { Link } from 'react-router-dom'

const SuperAdminDropdown: React.FC = () => {
  return (
    <>
		<div className="nav-item text-nowrap">
			<div className="dropdown">
				<button className="btn text-white dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					Super Admin
				</button>
				<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
					<Link className="dropdown-item" to="/show-all-organizations">All Organizations</Link>
					<Link className="dropdown-item" to="#">Another action</Link>
					<div className="dropdown-divider"></div>
					<Link className="dropdown-item" to="#">Separated link</Link>
					<li><Link className="dropdown-item" to="/add-role-to-user">Update User Role</Link></li>
				</div>
			</div>
		</div>
		</>
  )
}

export default SuperAdminDropdown