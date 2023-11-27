import { setProducts,setProductSubcategories, deleteProduct, 
    editProduct,setProductSizes, newProduct, newProductError, 
    setProductsError, editProductError,setMyProducts,
    deleteProductError, addToCart, addToCartError, setProductTypes, addToFavourites ,setProductConditions, setProductSex, addToFavouritesError } from '../app/productsSlice';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BASE_URL}/Products`,
})

axiosInstance.interceptors.request.use((config) => {
    config.headers = { authorization: 'Bearer ' + sessionStorage.getItem('token') };
    return config;
});

//dispatch - action that triggers state change
export const GetProducts = async (dispatch, type, sex, subcategory, searchTerm, colorFilter, sizeFilter, conditionFilter, sortByPrice, sortByUserRating,shoeNumberRange) => {
    try {
        //api call
        if (colorFilter.startsWith("#")) {
            colorFilter = encodeURIComponent(colorFilter);
        }
        const { data } = await axiosInstance.get(`?type=${type}&sex=${sex}&subcategory=${subcategory}&searchTerm=${searchTerm}&colorFilter=${colorFilter}&sizeFilter=${sizeFilter}&conditionFilter=${conditionFilter}&sortByPrice=${sortByPrice}&sortByUserRating=${sortByUserRating}&shoeNumberRange=${shoeNumberRange}`);
        dispatch(setProducts(data));
        return data;
    } catch {
        dispatch(setProductsError());
    }
}

export const GetMyProducts = async (dispatch) => {
    try {
        //api call
        const {data} = await axiosInstance.get("/myProducts");
        dispatch(setMyProducts(data));
    } catch {
        dispatch(setProductsError());
    }
}

export const GetProductTypes = async (dispatch) => {
    try {
        //api call
        const {data} = await axiosInstance.get("/productTypes");
        dispatch(setProductTypes(data));
    } catch {
        console.log("Error product types")
    }
}

export const GetProductSex = async (dispatch) => {
    try {
        //api call
        const {data} = await axiosInstance.get("/productSex");
        dispatch(setProductSex(data));
    } catch {
        console.log("Error product sex")
    }
}


export const GetProductSizes = async (dispatch) => {
    try {
        //api call
        const {data} = await axiosInstance.get("/productSizes");
        dispatch(setProductSizes(data));
    } catch {
        console.log("Error product sizes")
    }
}
export const GetProductConditions = async (dispatch) => {
    try {
        //api call
        const {data} = await axiosInstance.get("/productConditions");
        dispatch(setProductConditions(data));
    } catch {
        console.log("Error product Conditions")
    }
}

export const GetProductSubcategories = async (dispatch) => {
    try {
        //api call
        const {data} = await axiosInstance.get("/productSubcategory");
        dispatch(setProductSubcategories(data));
    } catch {
        console.log("Error product subcategories")
    }
}

export const NewProduct = async (dispatch, product) => {
    try {
        const {data} = await axiosInstance.post('',product);
        dispatch(newProduct(data));
    } catch {
        dispatch(newProductError());
    }
}

export const EditProduct = async (dispatch, product) => {
    try {
        // api call
        await axiosInstance.put('',product);
        dispatch(editProduct(product));
    } catch {
        dispatch(editProductError());
    }
}

export const DeleteProduct = async (dispatch, product) => {
    try {
        // api call
        await axiosInstance.delete('',{data:{...product}})
        dispatch(deleteProduct(product));
    } catch {
        dispatch(deleteProductError());
    }
}

export const AddToCart = async (dispatch, product, email) => {
    try {
        // api call
        await axiosInstance.post('/AddToCart', {product, email});
        dispatch(addToCart(product));
    } catch {
        dispatch(addToCartError());
    }
}

export const AddToFavourites = async (dispatch, product, email) => {
    try {
        // api call
        await axiosInstance.post('/AddToFavourites', {product, email});
        dispatch(addToFavourites(product));
    } catch {
        dispatch(addToFavouritesError())
    }
}

export const GetProduct = async (productId) => {
    try {
      const response = await axiosInstance.get(`/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product details:', error);
      throw error;
    }
  };

