import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const initialState = {
  user: null,
};

export const signup = createAsyncThunk(
  "auth/register",
  async (registrationData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        registrationData
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
      }

      return response.data.user;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue({ error: error.response.data.msg });
      } else {
        return rejectWithValue({
          error: "An error occurred while registering.",
        });
      }
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        credentials
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
      }
      return response.data.user;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue({ error: error.response.data.msg });
      } else {
        return rejectWithValue({
          error: "An error occurred while logging in.",
        });
      }
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (updateData, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/auth/update`,
        updateData
      );

      return response.data.user;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue({ error: error.response.data.msg });
      } else {
        return rejectWithValue({
          error: "An error occurred while updating the profile.",
        });
      }
    }
  }
);

const userAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { setUser, logout } = userAuthSlice.actions;

export default userAuthSlice.reducer;
