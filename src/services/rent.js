import axios from 'axios';
import { setRented, deleteFromRented, deleteFromRentedError } from '../app/productsSlice';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Rented`,
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return config;
});

export const GetRented = async (dispatch, email) => {
    try {
        //api call
        const {data} = await axiosInstance.get('',{ params: { email } });
        dispatch(setRented(data));

    } catch {
        console.log("Error")
    }
}

export const DeleteFromRented = async (dispatch, email, product) => {
    try {
        await axiosInstance.delete(`?email=${email}&product=${product.id}`)
        dispatch(deleteFromRented(product));
    } catch {
        dispatch(deleteFromRentedError())
    }
}