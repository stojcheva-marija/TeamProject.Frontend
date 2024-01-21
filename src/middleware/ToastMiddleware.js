import { logout, userAuthenticated, userAuthenticatedError} from '../app/authenticationSlice';
import { newProduct, editProduct, clearCart, setProductsError, deleteProduct, newProductError, deleteProductError, editProductError, addToCart, deleteFromShoppingCart, deleteFromShoppingCartError, addToCartError,  setShoppingCartError, addToFavourites, addToFavouritesError, deleteFromFavourites, deleteFromFavouritesError} from '../app/productsSlice';
import { toast } from 'react-toastify';
import { editMyProfilePasswordError, editMyProfile, editMyProfileError, successPasswordChange, invalidOldPasswordError, passwordChangeError, passwordsDoNotMatchError } from '../app/userSlice';

// function in function
// next --> we pass to the next middles in the pipeline, we return next, so we give it to the next
const ToastMiddleware = () => next => action => {
    switch(action.type) {
        case newProduct.type:
            toast.success('New product added successfully');
            break;
        case editProduct.type:
            toast.success('Product edited successfully');
            break;
        case deleteProduct.type:
            toast.success('Product deleted successfully');
            break;
        case addToCart.type:
            toast.success('Product added to cart successfully');
            break;
        case deleteFromShoppingCart.type:
            toast.success('Product deleted from cart successfully');   
            break;        
        case setProductsError.type:
            toast.error('Error loading products');
            break;
        case newProductError.type:
            toast.error('Error adding new product');
            break;
        case editProductError.type:
            toast.error('Error editing product');
            break;
        case deleteProductError.type:
            toast.error('Error deleting product');
            break; 
        case setShoppingCartError.type:
            toast.error('Error loading cart');
            break;
        case deleteFromShoppingCartError.type:
            toast.error('Error deleting product from shopping cart');
            break;
        case addToCartError.type:
            toast.error('Error adding product to cart')
            break;
        case userAuthenticated.type:
            toast.success("Logged in successfully");
            break;
        case logout.type:
            toast.success("Logged out");
            break;
        case userAuthenticatedError.type:
            toast.error("User authentication failed");
            break;     
        case addToFavourites.type:
            toast.success("Product added to favourites successfully");
            break;
        case addToFavouritesError.type:
            toast.error("Product adding to favourites failed");
            break;
       case deleteFromFavourites.type:
            toast.success("Product deleted from favourites successfully");
            break;
        case deleteFromFavouritesError.type:
            toast.error("Product deleted from favourites error");
            break;             
        case clearCart.type:
            toast.success("Ordered successfully");
            break;   
        case editMyProfile.type:
            toast.success("User profil edited successfully");
            break;                
        case editMyProfileError.type:
            toast.error("Error while editing the profile");
            break;  
        
        case editMyProfilePasswordError.type:
            toast.error("Incorrect password");
            break; 
            
        case successPasswordChange.type:
            toast.success('Password changed successfully');
            break;  

        case invalidOldPasswordError.type:
            toast.error('Invalid old password');
            break;

        case passwordsDoNotMatchError.type:
            toast.error('New passwords do not match');
            break;

        case passwordChangeError.type:
            toast.error('An error occurred while changing the password');
            break;
        
        default:
            break;
    }
    return next(action);
}

export default ToastMiddleware;
