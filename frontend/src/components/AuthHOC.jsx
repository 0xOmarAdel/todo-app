import { useDispatch, useSelector } from "react-redux";
import LoginPage from "../pages/LoginPage";
import { useEffect, useState } from "react";
import axios from "axios";
import { setUser } from "../store/slices/userAuthSlice";
import Loading from "../ui/Loading";

const AuthHOC = (WrappedComponent) => {
  const WithAuth = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    const user = useSelector((state) => state.auth.user);

    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    useEffect(() => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      const fetchToken = async () => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/auth/validateToken`,
            {
              token,
            }
          );
          dispatch(setUser(response.data.userData));
        } catch (error) {
          localStorage.removeItem("token");
        }
        setIsLoading(false);
      };
      fetchToken();
    }, [dispatch, token]);

    if (isLoading) return <Loading />;

    if (!user) return <LoginPage />;

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default AuthHOC;
