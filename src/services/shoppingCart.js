import axios from 'axios';
import { setShoppingCart, deleteFromShoppingCart, setShoppingCartError, deleteFromShoppingCartError, clearCart } from '../app/productsSlice';
import { newOrder } from '../app/userSlice';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/ShoppingCart`,
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return config;
});

export const GetShoppingCart = async (dispatch, email) => {
    try {
        //api call
        const {data} = await axiosInstance.get('',{ params: { email } });
        dispatch(setShoppingCart(data));
    } catch {
        dispatch(setShoppingCartError());
    }
}

export const DeleteFromShoppingCart = async (dispatch, email, product) => {
    try {
        await axiosInstance.delete(`?email=${email}&product=${product.id}`)
        dispatch(deleteFromShoppingCart(product));
    } catch {
        dispatch(deleteFromShoppingCartError());
    }
}

export const OrderNow = async (dispatch, email, deliveryType, deliveryAddress, deliveryPhone, deliveryCity, deliveryPostalCode) => {
    try {
        const order = await axiosInstance.get(`\Order?email=${email}&deliveryType=${deliveryType}&deliveryAddress=${deliveryAddress}&deliveryPhone=${deliveryPhone}&deliveryCity=${deliveryCity}&deliveryPostalCode=${deliveryPostalCode}`);
        dispatch(clearCart());
    } catch {
        console.log("Error ordering")
    }
}