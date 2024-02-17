import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { GetFavourites, DeleteFromFavourites } from '../services/favourites';
import { AddToCart } from '../services/products';
import { FaTrash,  FaArrowLeft } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import "./styles/Favourites.css"

const Favourites = () => {
  const dispatch = useDispatch();
  const favourites = useSelector(state => state.productsSlice.favourites);
  const email = useSelector((state) => state.authenticationSlice.email);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(()=>{
      GetFavourites(dispatch, email);
  }, [dispatch, email]);

  const handleDeleteConfirmation = (product) => {
    setItemToDelete(product);
  };

  const handleDelete = (product) => {
    DeleteFromFavourites(dispatch, email, product);
    setItemToDelete(null);
  };


  return (
    <div class="card">
            <div class="row">
                <div class="cart">
                    <div class="title">
                        <div class="row">
                            <div class="col"><h4><b>Favourites</b></h4></div>
                            <div class="col align-self-center text-right text-muted">{favourites.length} items</div>
                        </div>
                    </div>    

                    {favourites.length === 0 ? (
        <h5><b>Your favourites is empty</b></h5>
      ) : (
        <>
          {favourites.map((product) => (
                     <div class="row border-top border-bottom">
                        <div class="row main align-items-center">
                            <div class="col-2"><img src={product.productImage}/></div>
                            <div class="col">
                                <div class="row text-muted">{product.productName}</div>
                            </div>
                            <div class="col">{product.productPrice} MKD</div>
                    <div
                      className="col"
                      onClick={() => handleDeleteConfirmation(product)}
                      style={{ cursor: 'pointer' }}
                    >
                      <FaTrash className="trash-icon" />
                    </div>
                    <div class="col" onClick={() => AddToCart(dispatch, product, email)} style={{ cursor: 'pointer'}}>
                    <i className="fa fa-shopping-cart"></i>
                    </div>
                    <div className="btn btn-dark col">
               <NavLink variant='link' to={`/product/${product.id}`} style={{color: 'white', textDecoration: 'none', display: 'block'}}>View product</NavLink>
           </div>
                        </div>
                    </div>           
          ))}
          
        </>
        
      )}

        <div className='btn back-to-shop col-2'>
          <NavLink variant='link' to="/products" style={{color: 'white', textDecoration: 'none', display: 'block'}}><FaArrowLeft/> Back to shopping</NavLink>
          </div>

            </div>
            </div>

             {/* Delete Confirmation Modal */}
      <Modal show={!!itemToDelete} onHide={() => setItemToDelete(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <b>{itemToDelete?.productName}</b> from favorites?
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

export default Favourites;