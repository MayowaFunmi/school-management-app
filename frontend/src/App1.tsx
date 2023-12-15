// import React, { useEffect, useState } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './components/Home';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import SignUp from './components/SignUp';
// import Login from './components/Login';
// import List from './components/List';
// import { useAppSelector } from './hooks/useTypedSelector';
// import { useJwt } from 'react-jwt';
// import { baseUrl } from './config/Config';
// import { isAdminRole } from './utils/isAdminRole';

// const App: React.FC = () => {
//   interface DecodedToken {
//     userId: string;
//     roles: string[];
//     iat: number;
//     exp: number;
//   }

//   const [userId, setUserId] = useState<string>("");
//   const [roleIds, setRoleIds] = useState<string[]>([]);
//   const [tokenExpired, setTokenExpired] = useState(Boolean);
//   const [isAdminRoleExists, setIsAdminRoleExists] = useState<boolean | null>(null);

//   const { isAuthenticated, token } = useAppSelector((state) => state.user);
//   const { decodedToken, isExpired } = useJwt(token);

//   useEffect(() => {
//     if (decodedToken) {
//       const { roles, userId } = decodedToken as DecodedToken;
//       setUserId(userId);
//       setRoleIds(roles);
//       setTokenExpired(isExpired)
//     };
//     const rolesApiEndpoint = `${baseUrl}/api/roles/show-all-roles`;
//     const fetchData = async () => {
//       const isAdmin = await isAdminRole({ roleIds }, rolesApiEndpoint, token);
//       setIsAdminRoleExists(isAdmin);
//     }
//     console.log(roleIds);
//     fetchData();
//   }, [decodedToken, roleIds, userId, isExpired, tokenExpired, token, isAdminRoleExists])

//   return (
//     <BrowserRouter>
//       <Navbar isAuthenticated={isAuthenticated} isAdminRoleExists={isAdminRoleExists} />
//       <Routes>
//         <Route path='/' element={<Home />} />
//         <Route path='/list' element={<List />} />
//         <Route path='/signup' element={<SignUp />} />
//         <Route path='/login' element={<Login />} />
//       </Routes>
//       <ToastContainer theme="dark" />
//     </BrowserRouter>
//   );
// }

// export default App;
export {}