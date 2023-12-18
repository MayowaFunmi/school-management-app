import React from 'react'
import './Home.css';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
	const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return (
    <>

			{/* start toggle theme */}
      
			{/* start toggle theme */}

			{/* start header */}
			<header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
				<Link className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 text-white" to="#">Company name</Link>

				<ul className="navbar-nav flex-row d-md-none">
					<li className="nav-item text-nowrap">
						<button className="nav-link px-3 text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSearch" aria-controls="navbarSearch" aria-expanded="false" aria-label="Toggle search">
							<svg className="bi"><use xlinkHref="#search"/></svg>
						</button>
					</li>
					<li className="nav-item text-nowrap">
						<button className="nav-link px-3 text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
							<svg className="bi"><use xlinkHref="#list"/></svg>
						</button>
					</li>
				</ul>

				<div id="navbarSearch" className="navbar-search w-100 collapse">
					<input className="form-control w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search" />
				</div>
			</header>
			{/* end header  */}

			{/* start main content */}
			<div className="container-fluid">
				<div className="row">
					<div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
						<div className="offcanvas-md offcanvas-end bg-body-tertiary" tabIndex={-1} id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
							<div className="offcanvas-header">
								<h5 className="offcanvas-title" id="sidebarMenuLabel">Company name</h5>
								<button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
							</div>
							<div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
								<ul className="nav flex-column">
									<li className="nav-item">
										<Link className="nav-link d-flex align-items-center gap-2 active" aria-current="page" to="#">
											<svg className="bi"><use xlinkHref="#house-fill"/></svg>
											Dashboard
										</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link d-flex align-items-center gap-2" to="#">
											<svg className="bi"><use xlinkHref="#file-earmark"/></svg>
											Orders
										</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link d-flex align-items-center gap-2" to="#">
											<svg className="bi"><use xlinkHref="#cart"/></svg>
											Products
										</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link d-flex align-items-center gap-2" to="#">
											<svg className="bi"><use xlinkHref="#people"/></svg>
											Customers
										</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link d-flex align-items-center gap-2" to="#">
											<svg className="bi"><use xlinkHref="#graph-up"/></svg>
											Reports
										</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link d-flex align-items-center gap-2" to="#">
											<svg className="bi"><use xlinkHref="#puzzle"/></svg>
											Integrations
										</Link>
									</li>
								</ul>

								<h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
									<span>Saved reports</span>
									<Link className="link-secondary" to="#" aria-label="Add a new report">
										<svg className="bi"><use xlinkHref="#plus-circle"/></svg>
									</Link>
								</h6>
								<ul className="nav flex-column mb-auto">
									<li className="nav-item">
										<Link className="nav-link d-flex align-items-center gap-2" to="#">
											<svg className="bi"><use xlinkHref="#file-earmark-text"/></svg>
											Current month
										</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link d-flex align-items-center gap-2" to="#">
											<svg className="bi"><use xlinkHref="#file-earmark-text"/></svg>
											Last quarter
										</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link d-flex align-items-center gap-2" to="#">
											<svg className="bi"><use xlinkHref="#file-earmark-text"/></svg>
											Social engagement
										</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link d-flex align-items-center gap-2" to="#">
											<svg className="bi"><use xlinkHref="#file-earmark-text"/></svg>
											Year-end sale
										</Link>
									</li>
								</ul>

								<hr className="my-3" />

								<ul className="nav flex-column mb-auto">
									<li className="nav-item">
										<Link className="nav-link d-flex align-items-center gap-2" to="#">
											<svg className="bi"><use xlinkHref="#gear-wide-connected"/></svg>
											Settings
										</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link d-flex align-items-center gap-2" to="#">
											<svg className="bi"><use xlinkHref="#door-closed"/></svg>
											Sign out
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
						<div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
							<h1 className="h2">Dashboard</h1>
							<div className="btn-toolbar mb-2 mb-md-0">
								<div className="btn-group me-2">
									<button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
									<button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
								</div>
								<button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1">
									<svg className="bi"><use xlinkHref="#calendar3"/></svg>
									This week
								</button>
							</div>
						</div>

						{/* main content here */}

					</main>
				</div>
			</div>
			{/* end main content */}
    </>
  )
}

export default Home