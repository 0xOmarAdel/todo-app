import { Outlet } from "react-router-dom";
import AuthHOC from "../components/AuthHOC";
import Navbar from "./Navbar";

const MainLayout = () => {
  const AuthenticatedLayout = AuthHOC(() => (
    <>
      <Navbar />
      <Outlet />
    </>
  ));

  return <AuthenticatedLayout />;
};

export default MainLayout;
