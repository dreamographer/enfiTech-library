import { Navigate, Outlet } from "react-router-dom";

type Props={
    isLoggedIn:boolean;
    children:React.ReactNode
}
// Protected Route for autherisation
const Protected = ({isLoggedIn,children}:Props) => {
  return isLoggedIn ? children  : <Navigate to="/register" replace />;
};

export default Protected;
