import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetRented, DeleteFromRented } from '../services/rent';
import { Button, Modal } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';


const MyRented = () => {

  const dispatch = useDispatch();
  const email = useSelector((state) => state.authenticationSlice.email);
  const products = useSelector(state => state.productsSlice.rented);

  console.log(products)

  useEffect(() => {
    GetRented(dispatch,email);
    console.log("getmyRentedCalled")
  }, [dispatch, email]);

  return products.map(p => (
    <div key={p.id} style={{ margin: '1rem' }}>
      <ListRow product={p} dispatch={dispatch} />
    </div>
  ));
};

const ListRow = ({ product, dispatch }) => {
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleDeleteConfirmation = product => {
    setItemToDelete(product);
  };

  const handleDelete = () => {
    DeleteFromRented(dispatch, itemToDelete);
    setItemToDelete(null);
  };

 
/*treba da se sredi ova so sold da ne bide vaka lolz kradeno od shopping cart*/
  return (
        <div>
     
     
        <div className={` ${!product.productAvailablity
          ? 'sold-product' : ''}`} key={product.id}>
                      <div className="row main align-items-center">
                        <div className="col-2"><img src={product.productImage} alt={product.productName} style={{width: '3.5rem'}}/></div>
                        <div className="col">
                          <div className="row text-muted">{product.productName}</div>
                        </div>
                        <div className="col">{product.productPrice} MKD</div>
                        {product.productAvailablity
 ? (
        <div className="col-2">
          <div className="row">
          <div className='col'>
              </div>
                        <div
                      className="col"
                      onClick={() => handleDeleteConfirmation(product)}
                      style={{ cursor: 'pointer' }}
                    >
                      <FaTrash className="trash-icon" />
                    </div>
                    </div>
        </div>
      ) : (
        <div className="col-2 sold-message">This product is sold</div>
      )}
                        
                        <div className="col">
                      
                        <div className="btn btn-dark">
               <NavLink variant='link' to={`/product/${product.id}`} style={{color: 'white', textDecoration: 'none', display: 'block'}}>View product</NavLink>
           </div>
                        </div>
                      </div>
                    </div>
      {/* Delete Modal */}
      <Modal show={!!itemToDelete} onHide={() => setItemToDelete(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to return <b>{itemToDelete?.productName}</b> from your rented?
          <br/>
         <span style={{color: 'red'}}><b>Once you click confirm this action will not be able to undo it!</b></span> 
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
};

export default MyRented;
