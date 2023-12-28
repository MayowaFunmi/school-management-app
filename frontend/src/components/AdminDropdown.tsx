import React from 'react'
import { Link } from 'react-router-dom'

const AdminDropdown: React.FC = () => {
  return (
    <>
			<div className="nav-item text-nowrap">
				<div className="dropdown">
					<button className="btn text-white dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Admin
					</button>
					<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
						<Link className="dropdown-item" to="/create-organization">Organization</Link>
						<div className="dropdown-divider"></div>
						<Link className="dropdown-item" to="#">Separated link</Link>
					</div>
				</div>
			</div>
		</>
  )
}

export default AdminDropdown