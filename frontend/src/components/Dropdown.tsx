import React from 'react'
import { Link } from 'react-router-dom'

const Dropdown: React.FC = () => {
  return (
    <>
			<div className="nav-item text-nowrap">
				<div className="dropdown">
					<button className="btn text-white dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						Dropdown
					</button>
					<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
						<Link className="dropdown-item" to="#">Action</Link>
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

export default Dropdown