import { setMyProfile } from "../app/userSlice";
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
