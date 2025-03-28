import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoutes = () => {
   
    const isLoggedIn = useSelector((state) => state.token);
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;

}
export default ProtectedRoutes;