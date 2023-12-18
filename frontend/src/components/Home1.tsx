import { Link, Outlet, Route, Routes } from "react-router-dom";

const Home1: React.FC = () => {
	return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: '200px', backgroundColor: '#f0f0f0' }}>
        <ul>
          <li>
            <Link to="/page1">Page 1</Link>
          </li>
          <li>
            <Link to="/page2">Page 2</Link>
          </li>
          <li>
            <Link to="/page3">Page 3</Link>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '20px' }}>
				<Outlet />
      </div>
    </div>
  );
}

export default Home1;