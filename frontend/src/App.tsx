import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import Home from './components/pages/Home';
import UpdateUserRole from './components/auth/UpdateUserRole';
import Organization from './components/admin/Organization';
import OrganizationsList from './components/admin/OrganizationsList';
import Zones from './components/admin/Zones';

const App: React.FC = () => {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<div>Home content</div>} />
          <Route path="add-role-to-user" element={<UpdateUserRole />} />
          <Route path='create-organization' element={<Organization />} />
          <Route path='show-all-organizations' element={<OrganizationsList />} />
        </Route>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <ToastContainer theme="dark" />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;