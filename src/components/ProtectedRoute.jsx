import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
  const { currentUser, role, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!currentUser) return <Navigate to="/login" replace />;

  if (requiredRole && role !== requiredRole) return <Navigate to="/" replace />;

  return children;
}
