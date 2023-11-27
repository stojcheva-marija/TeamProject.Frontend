import { createSlice, createAction } from '@reduxjs/toolkit';

export const userAuthenticatedError = createAction('userAuthenticatedError');

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    token: sessionStorage.getItem('token') || '',
    email: sessionStorage.getItem('email') || '',
    isLoggedIn: Boolean(sessionStorage.getItem('token')),
  },
  reducers: {
    userAuthenticated: (state, action) => {
      sessionStorage.setItem('token', action.payload.token);
      sessionStorage.setItem('email', action.payload.email);
      return {
        ...state,
        token: action.payload.token,
        email: action.payload.email,
        isLoggedIn: true,
      };
    },
    logout: () => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('email');
      return {
        token: '',
        email: '',
        isLoggedIn: false,
      };
    },
  },
});


export const { userAuthenticated, logout } = authenticationSlice.actions;

export default authenticationSlice.reducer;
