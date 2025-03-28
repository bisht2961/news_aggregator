import mainApi from "../middleware/mainApi";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logout,
} from "../../slices/auth/authSlice";

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());

    const response = await mainApi.post("/auth/login", credentials);
    const { user, token } = response.data;

    // Store token in localStorage
    localStorage.setItem("token", token);

    dispatch(loginSuccess({ user, token }));

    return { success: true };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Login failed";
    dispatch(loginFailure(errorMessage));
    return { success: false, error: errorMessage };
  }
};

// Register action creator
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch(signupStart());

    const response = await mainApi.post("/auth/register", userData);
    const { user, token } = response.data;

    localStorage.setItem("token", token);

    dispatch(signupSuccess({ user, token }));

    return { success: true };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Registration failed";
    dispatch(signupFailure(errorMessage));
    return { success: false, error: errorMessage };
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(logout());
};
