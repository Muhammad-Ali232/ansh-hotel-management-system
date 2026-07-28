import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./ContextApi";

const PrivateRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, loading, user } = useAuth();
    const location = useLocation();

    if (loading) {
        return <h3>Loading...</h3>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user?.roleName)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;