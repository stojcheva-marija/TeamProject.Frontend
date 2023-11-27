import { userAuthenticated, userAuthenticatedError } from '../app/authenticationSlice';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Authentication`,
})
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  });

export const SignUp = async (dispatch, credentials) => {
    try {
        // we sent credentials for sign in to backend as a result we get a token 
        // which we set with the dispatch(userAuthenticated(data)) to frontend
        const { data } = await axiosInstance.post('/signup', credentials);
        dispatch(userAuthenticated(data));
    } catch {
        dispatch(userAuthenticatedError());
    }
}

export const SignIn = async (dispatch, credentials) => {
    try {
        const { data } = await axiosInstance.post('/signin', credentials);
        dispatch(userAuthenticated(data));
    } catch {
        dispatch(userAuthenticatedError());
    }
}
