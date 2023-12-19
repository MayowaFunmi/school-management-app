import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import List from './components/List';
import { AuthProvider } from './context/AuthContext';
import Page2 from './components/admin/Page2';
import Page3 from './components/admin/Page3';
import SignUp from './components/auth/SignUp';
import Login from './components/auth/Login';
import Home from './components/pages/Home';
import UpdateUserRole from './components/auth/UpdateUserRole';

const App: React.FC = () => {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<div>Home content</div>} />
          <Route path="add-role-to-user" element={<UpdateUserRole />} />
          <Route path="page2" element={<Page2 />} />
          <Route path="page3" element={<Page3 />} />
        </Route>
          <Route path='/list' element={<List />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <ToastContainer theme="dark" />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;