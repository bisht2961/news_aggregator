import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
  isLoggedIn: false,
  user: null,
  token: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    // Login reducers
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Signup reducers
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Logout reducer
    logout: (state) => {
      return initialAuthState;
    }
  }
});

export const { loginStart, loginSuccess, loginFailure, signupStart, signupSuccess, signupFailure, logout } = authSlice.actions;
export default authSlice.reducer;