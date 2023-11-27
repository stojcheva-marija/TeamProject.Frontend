import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetMyProducts } from '../services/products';
import { Button, Modal } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import ProductEdit from './ProductEdit';
import { EditProduct, DeleteProduct } from '../services/products';

const MyProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.productsSlice.myProducts);

  console.log(products)

  useEffect(() => {
    GetMyProducts(dispatch);
    console.log("getMyProductsCalled")
  }, []);

  return products.map(p => (
    <div key={p.id} style={{ margin: '1rem' }}>
      <ListRow product={p} dispatch={dispatch} />
    </div>
  ));
};

const ListRow = ({ product, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleSave = (editedProduct) => {
    EditProduct(dispatch, { id: editedProduct.id, productColor: editedProduct.productColor, productSizeNumber: editedProduct.productSizeNumber, productName: editedProduct.productName, productPrice: editedProduct.productPrice, productType: editedProduct.productType, productSubcategory: editedProduct.productSubcategory, productSize: editedProduct.productSize, productDescription: editedProduct.productDescription, productMeasurements: editedProduct.productMeasurements, productImage: editedProduct.productImage, productMaterial: editedProduct.productMaterial, productBrand: editedProduct.productBrand, productCondition: editedProduct.productCondition, productSex: editedProduct.productSex, productDescription: editedProduct.productDescription, productMeasurements: editedProduct.productMeasurements, productAvailablity: editedProduct.productAvailablity  });
    setIsEditing(false);
  };

  const handleDeleteConfirmation = product => {
    setItemToDelete(product);
  };

  const handleDelete = () => {
    DeleteProduct(dispatch, itemToDelete);
    setItemToDelete(null);
  };

  const styles = `

.sold-product {
  opacity: 0.6; /* Reduce opacity for sold products */
}

.sold-message {
  color: red;
  font-weight: bold;
}
  `;

  return (
        <div>
          <style>{styles}</style>
      {isEditing ? (
        <ProductEdit product={product} onSave={handleSave} onCancel={() => setIsEditing(false)} />
      ) : (
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
                        <Button variant="dark" onClick={() => {
                setIsEditing(true);
              }}>Edit</Button>
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
      )}
      {/* Delete Modal */}
      <Modal show={!!itemToDelete} onHide={() => setItemToDelete(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <b>{itemToDelete?.productName}</b> from your products?
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

export default MyProducts;
