import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
    return !!localStorage.getItem("auth_token");
};

const PrivateRoute = ({ children }) => {
    // return children;
    return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
