import { setMyProfile, editMyProfile, editMyProfilePasswordError } from "../app/userSlice";
import axios from "axios";


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
                console.error('Invalid password. Please try again.');
                dispatch(editMyProfilePasswordError());
            } else if (responseData.error === 'EmailAlreadyExists') {
                console.error('Email already exists.');
            } else if (responseData.error === 'UsernameAlreadyExists') {
                console.error('Username already exists.');
            } else {
                console.error('An error occurred while editing the profile:', error);
            }
        } else {
            console.error('An unexpected error occurred:', error);
        }
    }
}
