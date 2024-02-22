import { Outlet } from "react-router-dom";
import AuthHOC from "../components/AuthHOC";

const MainLayout = () => {
  const AuthenticatedLayout = AuthHOC(() => (
    <>
      <Outlet />
    </>
  ));

  return <AuthenticatedLayout />;
};

export default MainLayout;
