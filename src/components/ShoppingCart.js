import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  Button, Modal } from 'react-bootstrap';
import { GetShoppingCart, DeleteFromShoppingCart, OrderNow } from '../services/shoppingCart';
import { useNavigate } from 'react-router-dom';
import { FaTrash,  FaArrowLeft } from 'react-icons/fa';
import { GetMyProfile } from '../services/user';
import { NavLink } from 'react-router-dom';

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.productsSlice.cart);
  const totalPrice = useSelector(state => state.productsSlice.totalPrice);
  const email = useSelector((state) => state.authenticationSlice.email);
  const [selectedShippingOption, setSelectedShippingOption] = useState('REGULAR');
  const myProfile = useSelector((state) => state.userSlice.myProfile)
  console.log(myProfile)
  const defaultAddress = useSelector((state) => state.userSlice.myProfile.address);
  const defaultPhone = useSelector((state) => state.userSlice.myProfile.phone);
  const defaultCity = useSelector((state) => state.userSlice.myProfile.city);
  const defaultPostalCode = useSelector((state) => state.userSlice.myProfile.postalCode);
  const [useDefaultAddress, setUseDefaultAddress] = useState(true);
  const [newAddress, setNewAddress] = useState('');
  const [useDefaultPhone, setUseDefaultPhone] = useState(true);
  const [newPhone, setNewPhone] = useState('');
  const [useDefaultCity, setUseDefaultCity] = useState(true);
  const [newCity, setNewCity] = useState('');
  const [useDefaultPostalCode, setUseDefaultPostalCode] = useState(true);
  const [newPostalCode, setNewPostalCode] = useState('');
  const [step, setStep] = useState(1);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    GetShoppingCart(dispatch, email);
    GetMyProfile(dispatch, email);
  }, [dispatch, email]);


  const confirmOrder = () => {
    OrderNow(dispatch, email, selectedShippingOption, useDefaultAddress ? defaultAddress : newAddress, useDefaultPhone ? defaultPhone : newPhone, useDefaultCity ? defaultCity : newCity, useDefaultPostalCode ? defaultPostalCode : newPostalCode);
    navigate('/myOrders');
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleDeleteConfirmation = (product) => {
    setItemToDelete(product);
  };

  const handleDelete = (product) => {
    DeleteFromShoppingCart(dispatch, email, product);
    setItemToDelete(null);
  };

  const getStepCircleClassName = (circleIndex) => {
    if (circleIndex + 1 === step) {
      return 'step-circle active';
    } else if (circleIndex + 1 < step) {
      return 'step-circle completed';
    } else {
      return 'step-circle';
    }
  };

  const styles = `
  body{
    min-height: 100%;
    vertical-align: middle;
    font-family: sans-serif;
    font-size: 0.8rem;
    font-weight: bold;
}
.title{
    margin-bottom: 5vh;
}
.card{
    margin: auto;
    margin-top: 30px;
    width: 80%;
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 1rem;
    border: transparent;
}


.cart{
    background-color: rgba(255, 255, 255, 0.7);
    padding: 4vh 5vh;
    border-bottom-left-radius: 1rem;
    border-top-left-radius: 1rem;
}
.summary{
    background-color: #ddd;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
    padding: 4vh;
    color: rgb(65, 65, 65);
}
.summary .col-2{
    padding: 0;
}
.summary .col-10
{
    padding: 0;
}.row{
    margin: 0;
}
.title b{
    font-size: 1.5rem;
}
.main{
    margin: 0;
    padding: 2vh 0;
    width: 100%;
}
.col-2, .col{
    padding: 0 1vh;
}
a{
    padding: 0 1vh;
}
.close{
    margin-left: auto;
    font-size: 0.7rem;
}
img{
    width: 3.5rem;
}
.back-to-shop{
    margin-top: 4.5rem;
}
h5{
    margin-top: 4vh;
}
hr{
    margin-top: 1.25rem;
}
form{
    padding: 2vh 0;
}
select{
    border: 1px solid rgba(0, 0, 0, 0.137);
    padding: 1.5vh 1vh;
    margin-bottom: 4vh;
    outline: none;
    width: 100%;
    background-color: rgb(247, 247, 247);
}
input{
    border: 1px solid rgba(0, 0, 0, 0.137);
    padding: 1vh;
    margin-bottom: 4vh;
    outline: none;
    width: 100%;
    background-color: rgb(247, 247, 247);
}
input:focus::-webkit-input-placeholder
{
      color:transparent;
}
.btn{
    background-color: #000;
    border-color: #000;
    color: white;
    width: 100%;
    font-size: 0.7rem;
    padding: 1vh;
    border-radius: 0;
}
.btn:focus{
    box-shadow: none;
    outline: none;
    box-shadow: none;
    color: white;
    -webkit-box-shadow: none;
    -webkit-user-select: none;
    transition: none; 
}
.btn:hover{
    color: white;
}
a{
    color: black; 
}
a:hover{
    color: black;
    text-decoration: none;
}
 #code{
    background-image: linear-gradient(to left, rgba(255, 255, 255, 0.253) , rgba(255, 255, 255, 0.185)), url("https://img.icons8.com/small/16/000000/long-arrow-right.png");
    background-repeat: no-repeat;
    background-position-x: 95%;
    background-position-y: center;
}

/* Step 2 and Step 3 */
.preview-order-step,
.address-phone-step,
.confirm-order {
  /* ... (other styles) */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 100px auto;
  padding: 20px;
  width: 80%; /* Adjust the width as needed */
  max-width: 800px; /* Optional: Use max-width for larger screens */
  text-align: center; /* Center the content */
  background-color: #f8f9fa; /* Add background color */
  border-radius: 10px; /* Add border radius */
  box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19); /* Add box shadow */
}

.title {
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.default-option {
  display: flex;
  align-items: center;
}

.checkbox-label {
  margin-right: 10px;
}

.custom-address,
.custom-phone,
.custom-city,
.custom-postal-code {
  margin-top: 20px;
}

/* Step 3 specific styles */
.order-items {
  width: 100%;
  margin: 20px 0;
}

.order-items,
.delivery-info,
.total-info,
.user-info {
  width: 100%;
  margin: 10px 0;
  padding: 20px; /* Add padding to content */
}

.btn {
  padding: 10px 20px;
  border-radius: 30px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.btn.previous {
  background-color: #ccc;
  border-color: #ccc;
  color: #000;
}

.btn.previous:hover {
  background-color: #eee;
  border-color: #eee;
}

.btn.next {
  background-color: #000;
  border-color: #000;
  color: white;
}

.btn.next:hover {
  background-color: #333;
  border-color: #333;
}

.narrow-button {
  width: 150px;
  margin-right: 50px;
  margin-left: 50px;
}

.button-container {
  display: flex;
  justify-content: space-between;
  align-items: center; /* Center the content vertically */
  width: 100%;
  margin-top: 20px;
}

.steps-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* Center the circles vertically */
  margin-top: 20px;
}

.step-circle {
  width: 50px;
  height: 50px;
  margin: 10px 0;
  background-color: white;
  color: black;
  border-radius: 50%;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.step-circle.active {
  background-color: #C2A4C8;
}

.step-circle.completed {
  background-color: black;
  color: white;
  border: 1px solid white;
}
`;

  return (
<div className="d-flex">
{cartItems.length !==0 && (
<div className="flex-shrink-0 p-3 bg-light" style={{ width: '150px', position: 'relative' }}>
    <h5 className="title text-center"><b>Steps</b></h5>
    <div className="steps-container">
      {Array.from({ length: 4 }, (_, index) => (
        <div
          key={index}
          className={getStepCircleClassName(index)}
          onClick={() => setStep(index + 1)}
        >
          {index + 1}
        </div>
      ))}
    </div>
  </div>
)}

    <div className="flex-grow-1 p-3">
    <style>{styles}</style>
    
    {step === 1 && (
      <>
        <div className="card">
          <div className="row">
            <div className="col-md-8 cart">
              <div className="title">
                <div className="row">
                  <div className="col"><h4><b>Shopping Cart</b></h4></div>
                  <div className="col align-self-center text-right text-muted">{cartItems.length} items</div>
                </div>
              </div>
  
              {cartItems.length === 0 ? (
                <h5><b>Your shopping cart is empty</b></h5>
              ) : (
                <>
                  {cartItems.map((product) => (
                    <div className="row border-top border-bottom" key={product.productId}>
                      <div className="row main align-items-center">
                        <div className="col-2"><img src={product.productImage} alt={product.productName} /></div>
                        <div className="col">
                          <div className="row text-muted">{product.productName}</div>
                        </div>
                        <div className="col">{product.productPrice} MKD</div>
                        <div
                      className="col"
                      onClick={() => handleDeleteConfirmation(product)}
                      style={{ cursor: 'pointer' }}
                    >
                      <FaTrash className="trash-icon" />
                    </div>
                        <div className="col">
                      
                        <div className="btn btn-dark">
               <NavLink variant='link' to={`/product/${product.id}`} style={{color: 'white', textDecoration: 'none', display: 'block'}}>View product</NavLink>
           </div>
                        </div>
                      </div>
                    </div>
                  ))}    
                </>
              )}
  
        <div className='btn back-to-shop col-4'>
          <NavLink variant='link' to="/products" style={{color: 'white', textDecoration: 'none', display: 'block'}}><FaArrowLeft/> Back to shopping</NavLink>
          </div>
            </div>
  
        {cartItems.length !== 0 && (
          <div className="col-md-4 summary">
            <div><h5><b>Summary</b></h5></div>
            <hr />
            <div className="row">
              <div className="col" style={{ paddingLeft: '0' }}>ITEMS {cartItems.length}</div>
              <div className="col text-right">{totalPrice} MKD</div>
            </div>
            <form>
              <p>SHIPPING</p>
              <select value={selectedShippingOption} onChange={(e) => setSelectedShippingOption(e.target.value)}>
                <option value="REGULAR">Regular-Delivery - 150 MKD</option>
                <option value="FAST">Fast-Delivery - 250 MKD</option>
              </select>
              <p>COUPON CODE</p>
              <input id="code" placeholder="Enter your code" />
            </form>
            <div className="row" style={{ borderTop: '1px solid rgba(0,0,0,.1)', padding: '2vh 0' }}>
              <div className="col">TOTAL PRICE</div>
              <div className="col text-right">{totalPrice + (selectedShippingOption === 'REGULAR' ? 150 : 250)} MKD</div>
            </div>
            <button className="btn" onClick={() => setStep(2)}>Next</button>
          </div>
        )}
        </div>
        </div>
      </>
    )}


{step === 2 && (
 <div className="address-phone-step">
 <h5 className="title"><b>Address and Phone for the Order</b></h5>
 <div className="content">
   <div className="default-option">
     <label className="checkbox-label">
       Use Default Address: {defaultAddress}
       <input
         type="checkbox"
         checked={useDefaultAddress}
         onChange={() => setUseDefaultAddress(!useDefaultAddress)}
       />
     </label>
   </div>
   {!useDefaultAddress && (
     <div className="custom-address">
       <label className="input-label">New Address:</label>
       <input
         type="text"
         placeholder="Enter additional address for this order"
         value={newAddress}
         onChange={(e) => setNewAddress(e.target.value)}
       />
     </div>
   )}
    <div className="default-option">
     <label className="checkbox-label">
       Use Default City: {defaultCity}
       <input
         type="checkbox"
         checked={useDefaultCity}
         onChange={() => setUseDefaultCity(!useDefaultCity)}
       />
     </label>
   </div>
  {!useDefaultCity && (
     <div className="custom-city">
       <label className="input-label">New City:</label>
       <input
         type="text"
         placeholder="Enter additional city for this order"
         value={newCity}
         onChange={(e) => setNewCity(e.target.value)}
       />
     </div>
   )}
    <div className="default-option">
     <label className="checkbox-label">
       Use Default Postal Code: {defaultPostalCode}
       <input
         type="checkbox"
         checked={useDefaultPostalCode}
         onChange={() => setUseDefaultPostalCode(!useDefaultPostalCode)}
       />
     </label>
   </div>
  {!useDefaultPostalCode && (
     <div className="custom-postal-code">
       <label className="input-label">New Postal Code:</label>
       <input
         type="text"
         placeholder="Enter additional postal code for this order"
         value={newPostalCode}
         onChange={(e) => setNewPostalCode(e.target.value)}
       />
     </div>
   )}




   <div className="default-option">
     <label className="checkbox-label">
       Use Default Phone: {defaultPhone}
       <input
         type="checkbox"
         checked={useDefaultPhone}
         onChange={() => setUseDefaultPhone(!useDefaultPhone)}
       />
     </label>
   </div>
  {!useDefaultPhone && (
     <div className="custom-phone">
       <label className="input-label">New Phone:</label>
       <input
         type="text"
         placeholder="Enter additional phone for this order"
         value={newPhone}
         onChange={(e) => setNewPhone(e.target.value)}
       />
     </div>
   )}
   {/* Similar structure for phone */}
 </div>
 <div className="button-container">
   <button className="btn previous narrow-button" onClick={() => handlePreviousStep()}>Previous</button>
   <button className="btn next narrow-button" onClick={() => handleNextStep()}>Next</button>
 </div>
</div>

)}



{/* Step 3: Preview Order */}
{step === 3 && (
  <div className="preview-order-step">
    <h5 className="title"><b>Preview Order</b></h5>
    <div className="order-items">
      {cartItems.map((product, index) => (
        <div key={index} className="row border-top border-bottom">
          <div className="row main align-items-center">
            <div className="col-2"><img src={product.productImage} alt={product.productName} /></div>
            <div className="col">
              <div className="row text-muted">{product.productName}</div>
            </div>
            <div className="col">{product.productPrice} MKD</div>
          </div>
        </div>
      ))}
    </div>
    <div className="delivery-info">
      <div className="row border-top border-bottom">
        Delivery : {selectedShippingOption === 'REGULAR' ? 'Regular Delivery' : 'Fast Delivery'} - {selectedShippingOption === 'REGULAR' ? '150' : '250'} MKD
      </div>
    </div>
    <div className="total-info">
      <div className="row border-top border-bottom">
        Total Price: {totalPrice + (selectedShippingOption === 'REGULAR' ? 150 : 250)} MKD
      </div>
    </div>
    <div className="user-info">
      <div className="row border-top border-bottom text-left">
        <p>User: {myProfile.name} {myProfile.surname}</p>
        <p>Delivery address: {useDefaultAddress ? defaultAddress : newAddress}</p>  
        <p>City:  {useDefaultCity ? defaultCity : newCity}</p>
        <p>Postal Code:  {useDefaultPostalCode ? defaultPostalCode : newPostalCode}</p>
        <p>Phone number: {useDefaultPhone ? defaultPhone : newPhone}</p>
      </div>
    </div>
    <div className="button-container">
      <button className="btn previous narrow-button" onClick={() => handlePreviousStep()}>Previous</button>
      <button className="btn next narrow-button" onClick={() => setStep(4)}>Order</button>
    </div>
  </div>
)}

{step === 4 && (
  <div class='confirm-order'>
     <h5 className="title"><b>Confirm Order</b></h5>
     <b>  Are you sure you want to place the order?</b>
  <div className="button-container">
  <button className="btn previous narrow-button" onClick={() => setStep(1)}>Cancel</button>
  <button className="btn next narrow-button" onClick={() => confirmOrder()}>Confirm</button>
  </div>
  </div>
)}

   </div>
         {/* Delete Confirmation Modal */}
         <Modal show={!!itemToDelete} onHide={() => setItemToDelete(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <b>{itemToDelete?.productName}</b> from shopping cart?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setItemToDelete(null)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => handleDelete(itemToDelete)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
   </div>
  );
}


export default ShoppingCart;
