import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button, Modal, Form } from 'react-bootstrap';
import * as React from 'react';
import { GetMyOrders } from '../services/order';
import { AddComment } from '../services/comments';

export default () => {
  const dispatch = useDispatch();
  const myOrders = useSelector((state) => state.userSlice.myOrders);
  const email = useSelector((state) => state.authenticationSlice.email);

  useEffect(() => {
    GetMyOrders(dispatch, email);
  }, [myOrders]);

  return (
<div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <h4 style={{ marginBottom: '20px', marginLeft: '20px' }}><b>My Orders</b></h4>
  {myOrders.map((o) => (
    <div key={o.id} style={{ marginBottom: '2rem', width: '60%' }}>
      <OrderDetails order={o} />
    </div>
  ))}
</div>

  );
};

const OrderDetails = ({ order }) => {
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const email = useSelector((state) => state.authenticationSlice.email);
  const commenterUsername = email;
  const dispatch = useDispatch();

  const handleOpenCommentPopup = (productId) => {
    setSelectedProduct(productId);
    setShowCommentPopup(true);
  };

  const handleCommentSubmit = () => {
    const selectedProductItem = order.productsInOrder.find(
      (item) => item.product.id === selectedProduct
    );

    if (!selectedProductItem) {
      console.error('Selected product not found.');
      return;
    }

    const receiverUsername = selectedProductItem.product.shopApplicationUser.email;

    const commentData = {
      Content: comment,
      CommenterUsername: commenterUsername,
      ReceiverUsername: receiverUsername,
    };

    AddComment(dispatch, commentData, rating)
      .then((addedComment) => {
        setShowCommentPopup(false); 
      })
      .catch((error) => {
        console.error('Error adding comment:', error);
      });
  };

  const handleRatingSelect = (selectedRating) => {
    setRating(selectedRating);
  };

  const renderStarRating = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} onClick={() => handleRatingSelect(i)}>
          {i <= rating ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  };

  return ( 
  <div style={{ backgroundColor: '#C2A4C8', borderRadius: "30px", padding: '20px' }}>
    {order && order.productsInOrder && order.productsInOrder.length > 0 && (
      <div>
      <h5 style={{textAlign: 'center'}}>Order # {order.id}</h5>
      <hr/>
      <p>Date: {order.formattedDate} {order.formattedTime}</p>
      <table style={{ width: '100%' }}>
        <thead>
          <th></th>
          <th className='text-center'>Product Name</th>
          <th className='text-center'>Product Price</th>
          <th></th>
        </thead>
        <tbody>
          {order.productsInOrder.map((item, index) => (
            <tr key={index}>
              <td>
                <div className="d-flex mb-3">
                  <div className="flex-shrink-0">
                    <img
                      src={item.product.productImage}
                      alt="Product Image"
                      className="img-fluid"
                      style={{ width: '7rem', margin: '20px' }}
                    />
                  </div>
                </div>
              </td>
              <td className='text-center'>    
                        {item.product.productName}
            </td>
              <td className="text-end">{item.product.productPrice} MKD</td>
              <td className="text-end"> <Button
                variant="dark"
                onClick={() => handleOpenCommentPopup(item.product.id)}
              >
                Leave Review
              </Button></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Subtotal</td>
            <td className="text-end">{order.subtotal} MKD</td>
          </tr>
          <tr>
            <td colSpan="3">Shipping</td>
            <td className="text-end">  {order.deliveryType === 0 ? 'REGULAR DELIVERY (150 MKD)' : 'FAST DELIVERY (250 MKD)'}</td>
          </tr>
          <tr>
            <td colSpan="3">Discount (Code: )</td>
            <td className="text-danger text-end">-0.00 MKD</td>
          </tr>
          <tr className="fw-bold">
            <td colSpan="3">TOTAL</td>
            <td className="text-end">{order.total} MKD</td>
          </tr>
        </tfoot>
      </table>
      <hr/>
      <p><h6><b>User: {order.user.name} {order.user.surname}</b></h6></p>
        <p>Delivery address: {order.deliveryAddress} </p>  
        <p>City: {order.deliveryCity}</p>
        <p>Postal Code: {order.deliveryPostalCode} </p>
        <p>Phone number: {order.deliveryPhone}</p>
      </div>
    )}

      <Modal
        show={showCommentPopup && selectedProduct !== null}
        onHide={() => {
          setShowCommentPopup(false);
          setSelectedProduct(null);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Leave a Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
          <div>
            {renderStarRating()}
            {rating !== 0 && <p>Selected Rating: {rating}</p>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCommentPopup(false)}>
            Close
          </Button>
          <Button variant="dark" onClick={handleCommentSubmit}>
            Submit Comment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
