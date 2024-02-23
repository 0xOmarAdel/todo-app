import { Outlet } from "react-router-dom";
import AuthHOC from "../components/AuthHOC";
import Navbar from "./Navbar";

const MainLayout = () => {
  const AuthenticatedLayout = AuthHOC(() => (
    <>
      <Navbar />
      <div className="pb-10">
        <Outlet />
      </div>
    </>
  ));

  return <AuthenticatedLayout />;
};

export default MainLayout;
