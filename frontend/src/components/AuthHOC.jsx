import { Navigate } from "react-router-dom";

const AuthHOC = (WrappedComponent) => {
  const WithAuth = (props) => {
    const user = true;

    if (!user) {
      return <Navigate to="/" />;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default AuthHOC;
