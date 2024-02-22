import LoginPage from "../pages/LoginPage";

const AuthHOC = (WrappedComponent) => {
  const WithAuth = (props) => {
    const user = true;

    if (!user) {
      return <LoginPage />;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default AuthHOC;
