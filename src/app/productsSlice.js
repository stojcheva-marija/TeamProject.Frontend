import { createSlice, createAction } from '@reduxjs/toolkit';

export const setProductsError = createAction('setProductsError');
export const newProductError = createAction('newProductError');
export const editProductError = createAction('editProductError');
export const deleteProductError = createAction('deleteProductError');
export const addToCartError = createAction('addToCartError');
export const addToFavouritesError = createAction('addToFavouritesError');
export const addToRentedError = createAction('addToRentedError');
export const setShoppingCartError = createAction('setShoppingCartError');
export const deleteFromShoppingCartError = createAction('deleteFromShoppingCartError');
export const deleteFromFavouritesError = createAction('deleteFromFavouritesCartError');
export const deleteFromRentedError = createAction('deleteFromRentedError');

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        myProducts: [],
        cart : [],
        favourites: [],
        rented: [],
        productTypes:[],
        productSizes:[],
        productSubcategories:[],
        productConditions :[],
        productSex : [],
        totalPrice: 0,
        selectedType: '',
        selectedSex: '',
        selectedSubcategory: '',
    },
    reducers: {
        setProductTypes:(state,action) => 
        {
            return {...state, productTypes: [...action.payload]};
        },
        setProductSex:(state,action) => 
        {
            return {...state, productSex: [...action.payload]};
        },
        setProductSizes:(state,action)=>
        {
            return {...state, productSizes: [...action.payload]};
        },
        setProductSubcategories:(state,action)=>
        {
            return {...state, productSubcategories: [...action.payload]};
        },
        setProductConditions:(state,action)=>
        {
            return {...state, productConditions: [...action.payload]};
        },
        setProducts: (state, action) => {
            return {...state, products: [...action.payload]};
        },
        setMyProducts: (state, action) => {
            return {...state, myProducts: [...action.payload]};
        },
        newProduct: (state, action) => {
            return {...state, products: [action.payload,...state.products]};
        },
        editProduct: (state, action) => {
            const products=state.products.map( p => {if(p.id === action.payload.id) {p = action.payload;} return p;});
            const myProducts=state.myProducts.map( p => {if(p.id === action.payload.id) {p = action.payload;} return p;});  
            return {...state, products :[...products], myProducts :[...myProducts],};
        },
        deleteProduct: (state, action) => {
            const products = state.products.filter(p => p.id!== action.payload.id); 
            const myProducts = state.myProducts.filter(p => p.id!== action.payload.id); 
            return {...state, products :[...products], myProducts :[...myProducts]};
        },
        addToCart: (state, action) => {
            const updatedTotalPrice = state.totalPrice + action.payload.productPrice;
            return {...state, cart: [action.payload,...state.cart], totalPrice: updatedTotalPrice};
        },
        addToFavourites: (state, action) => {
            return {...state, favourites: [action.payload,...state.favourites]};
        },
        addToRented: (state, action) => {
            return {...state, rented: [action.payload,...state.favourites]};
        },
        setShoppingCart: (state, action) => {
            const products = action.payload.productsInShoppingCart.map(p => p.product);
            return {...state, cart: [...products], totalPrice: action.payload.totalPrice};
        },
        deleteFromShoppingCart : (state, action) => {
            const cart = state.cart.filter(c => c.id!== action.payload.id); 
            const updatedTotalPrice = state.totalPrice - action.payload.productPrice;
            return {...state, cart :[...cart], totalPrice: updatedTotalPrice};
        },
        setFavourites: (state, action) => {
            const products = action.payload.map(p => p.product);
            return {...state, favourites: [...products]};
        },
        deleteFromFavourites : (state, action) => {
            const favourites = state.favourites.filter(f => f.id!== action.payload.id); 
            return {...state, favourites :[...favourites]};
        },
        setRented: (state, action) => {
            const products = action.payload.map(p => p.product);
            return {...state, rented: [...products]};
        },
        deleteFromRented : (state, action) => {
            const rented = state.rented.filter(f => f.id!== action.payload.id); 
            return {...state, rented :[...rented]};
        },
        clearCart: (state) => {
            state.cart = [];
            state.totalPrice = 0;
        },
        setSelectedFilters: (state, action) => {
            return {
              ...state,
              selectedType: action.payload.type,
              selectedSex: action.payload.sex,
              selectedSubcategory: action.payload.subcategory,
            };
        },
    }
});

export const { setProducts, newProduct, editProduct, addToRented, setRented, deleteFromRented,
     deleteProduct, addToCart, setShoppingCart,setProductSizes, setProductSex, setSelectedFilters,
      deleteFromShoppingCart, setProductTypes,setProductSubcategories, setMyProducts, setFavourites, deleteFromFavourites, addToFavourites, clearCart, setProductConditions } = productsSlice.actions;

export default productsSlice.reducer;
