import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
    const token = localStorage.getItem("token");

    return token ? <Navigate to="/blogs" /> : <Outlet />;
};

export default PublicRoute;
