import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { currentUser, role, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!currentUser || role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
