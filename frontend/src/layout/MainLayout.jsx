import { Navigate, Outlet } from "react-router-dom";
import Loading from "../ui/Loading";
import { useAuth } from "../hooks/useAuth";
import Navbar from "./Navbar";

export default function MainLayout() {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <>
      <Navbar />
      <div className="pb-10">
        <Outlet />
      </div>
    </>
  );
}
