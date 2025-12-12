import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
    const isAuth = document.cookie.includes("jwt=");

    return isAuth ? children : <Navigate to="/login" />;
};
