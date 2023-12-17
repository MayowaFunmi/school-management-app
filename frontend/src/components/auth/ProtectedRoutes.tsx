// import { Navigate, Route, RouteProps } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// interface ProtectedRouteWrapperProps {
//     requiredRoles?: string[];
//     redirectPath?: string;
// }

// const ProtectedRouteWrapper: React.FC<ProtectedRouteWrapperProps> = ({ 
//     requiredRoles,
//     redirectPath = '/',
//     ...routeProps
//  }) => {
//     const { isAuthenticated } = useAuth();
  
//     if (!isAuthenticated) {
//       // Redirect to the login page or any other page if not authenticated
//       return <Navigate to="/login" />;
//     }
  
//     // Render the original route with its props
//     return <Route {...routeProps} />;
//   };
  
//   export default ProtectedRouteWrapper;
export {}