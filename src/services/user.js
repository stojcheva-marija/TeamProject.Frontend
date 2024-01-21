import { setMyProfile, editMyProfile, editMyProfilePasswordError, successPasswordChange, invalidOldPasswordError, passwordChangeError, passwordsDoNotMatchError } from "../app/userSlice";
import axios from "axios";
import { logout } from '../app/authenticationSlice';
import { toast } from 'react-toastify';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/User`,
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return config;
});

export const GetMyProfile = async (dispatch) => {
    try {
        const {data} = await axiosInstance.get();
        dispatch(setMyProfile(data));
    } catch {
        console.log("Error from get my profile service")
    }
}

export const EditMyProfile = async (dispatch, profile, password) => {
    try {
        const requestBody = {
            UserDTO: profile,
            Password: password
        };
        await axiosInstance.put('', requestBody);
        dispatch(editMyProfile(profile));
    } catch (error) {
        if (error.response && error.response.status === 400) {
            const responseData = error.response.data;
            if (responseData.error === 'InvalidPassword') {
                dispatch(editMyProfilePasswordError());
            } else {
                console.error('An error occurred while editing the profile:', error);
            }
        } else {
            console.error('An unexpected error occurred:', error);
        }
    }
}

export const ChangePassword = async (dispatch, oldPassword, newPassword, repeatNewPassword) => {
    try {
        const requestBody = {
          OldPassword: oldPassword,
          NewPassword: newPassword,
          RepeatNewPassword: repeatNewPassword,
        };

        await axiosInstance.post('', requestBody);
        dispatch(successPasswordChange())
        dispatch(logout());
      } catch (error) {
        if (error.response && error.response.status === 400) {
          const responseData = error.response.data;
          console.log(responseData.message)
          if (responseData.message === 'Invalid old password.') {
            dispatch(invalidOldPasswordError())
          } else if (responseData.message === 'New passwords do not match.') {
            dispatch(passwordsDoNotMatchError())
          } else {
            dispatch(passwordChangeError())
          }
        } else {
          console.error('An unexpected error occurred:', error);
        }
      }
}
