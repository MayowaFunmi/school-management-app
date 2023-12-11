import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './components/SignUp';
import Login from './components/Login';
import List from './components/List';
import { useAppSelector } from './hooks/useTypedSelector';

const App: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        {isAuthenticated ? (
          <>
            <Route path='/list' element={<List />} />
          </>
        ) : (
          <>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
          </>
        )}
      </Routes>
      <ToastContainer theme="dark" />
    </BrowserRouter>
  );
}

export default App;