import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

interface Props {
  role: "owner" | "employe";
  children: ReactNode;
}

const ProtectedRoute = ({ role, children }: Props) => {
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Call backend to verify JWT
        const response = await axios.get(
          `http://localhost:3000/api/${role}/auth/me`,
          { withCredentials: true }
        );

        // JWT verified successfully
        if (response.data.user?.role === role) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (err) {
        setIsAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [role]);

  if (loading) return <div>Loading...</div>;
  return isAuthorized ? <>{children}</> : <Navigate to={`/${role}/login`} replace />;
};

export default ProtectedRoute;
