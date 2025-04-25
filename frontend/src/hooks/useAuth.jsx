// hooks/useAuth.ts
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/slices/userAuthSlice";
import axios from "axios";

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    axios
      .post(`${import.meta.env.VITE_API_URL}/auth/validateToken`, { token })
      .then((res) => dispatch(setUser(res.data.userData)))
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false));
  }, [dispatch, token]);

  return { user, loading };
}
