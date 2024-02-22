import { useSelector } from "react-redux";
import LoginPage from "../pages/LoginPage";

const AuthHOC = (WrappedComponent) => {
  const WithAuth = (props) => {
    const user = useSelector((state) => state.auth.user);

    if (!user) {
      return <LoginPage />;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default AuthHOC;
