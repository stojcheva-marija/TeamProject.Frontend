import axios from 'axios';
import {setMyOrders } from '../app/userSlice';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Order`,
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return config;
});

export const GetMyOrders = async (dispatch, email) => {
    try {
        const {data} = await axiosInstance.get('/myOrders',{ params: { email } });
        dispatch(setMyOrders(data));

    } catch {
        console.log("Error my orders");
    }
}
