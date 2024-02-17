import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GetProfile } from '../services/unauthorized';
import { useParams } from 'react-router-dom';
import { setProfile } from '../app/userSlice';
import { Modal, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './styles/Profile.css'

const Profile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const myProfile = useSelector((state) => state.userSlice.profile);
  
  console.log(myProfile)
  

  const renderStars = (rating) => {
    const filledStars = '★'.repeat(Math.floor(rating));
    const emptyStars = '☆'.repeat(5 - Math.floor(rating));

    return (
      <span>
        <span className="filled-stars">{filledStars}</span>
        <span className="empty-stars">{emptyStars}</span>
        </span>
    );
  };
  
  const [loading, setLoading] = useState(true);

  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Function to handle opening the product modal
  const openProductModal = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  // Function to handle closing the product modal
  const closeProductModal = () => {
    setSelectedProduct(null);
    setShowProductModal(false);
  };

  const [showCommentModal, setShowCommentModal] = useState(false);

  // Function to handle opening the comment modal
  const openCommentModal = () => {
    setShowCommentModal(true);
  };

  // Function to handle closing the comment modal
  const closeCommentModal = () => {
    setShowCommentModal(false);
  };


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await GetProfile(dispatch, username);
        dispatch(setProfile(profileData));
      } catch (error) {
        console.log("Error fetching profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [dispatch, username]);

  

  return (
    <div>
      <style></style>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <p>Loading...</p>
        </div>
      ) : myProfile ? (
        <div className='row' style={{margin: 'auto', padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.7)'}}>
            <h5 style={{textAlign: 'center'}}>{myProfile.username}`s Profile</h5>
          <div class="custom-font">
          </div>
          <div className="row">
            <div className='col-md-7'>
            <div style={{ width: '30rem', margin: 'auto', backgroundColor: '#C2A4C8', textAlign: 'center', padding: '20px' }}>
            {/* Display rating and rating count */}
            <div class="col-12">
            <img src="https://cdn-icons-png.flaticon.com/512/666/666201.png" width="150px" height="170px" />
            </div>
            <p> <b>Rating: {renderStars(myProfile.rating)} ({myProfile.rating})</b></p>
            <p><b>Rated by: {myProfile.ratingCount} users</b></p>
            <Button onClick={() => openProductModal(selectedProduct)} className='btn-dark'>View Products</Button>
            </div>
          </div>
            {/* Display comments */}
            <div className='col-md-5'>
            <h5 className='text-center'>Most Recent Comments</h5>
            {myProfile.comments && myProfile.comments.length > 0 ? (
               myProfile.comments.slice(0,5).map((comment)  => (
                <div class="card p-3 mt-2" key={comment.id}>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="user d-flex flex-row align-items-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/666/666201.png" width="30" class="user-img rounded-circle mr-2"/>
                    <span style={{color: '#000000'}}>
                      <small class="font-weight-bold">{comment.commenterUsername}:</small>
                      <small class="font-weight-bold text-secondary"> {comment.content} </small>
                    </span>
                  </div>
                  <div style={{display: 'flex', flexdirection: 'column'}}>
                    <small style={{color: '#000000'}}>{comment.formattedDate} {comment.formattedTime}</small>
                    <div style={{marginleft: '105px'}}></div> 
                  </div>
                </div>
              </div>
              
              ))
            ) : (
              <p>No comments for this user yet.</p>
            )}

{myProfile.comments && myProfile.comments.length > 0 && (
   <div style={{margin: 'auto', textAlign: 'center'}}>
    <Button variant="dark" style={{marginTop: '5px'}} onClick={openCommentModal}>
      View All Comments
    </Button>
    </div>
  )}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', display: 'flex', flexDirection: 'column' }}>
          <h2 className='text-center'>A user with username {username} does not exist !</h2>
        </div>
      )}

<Modal show={showProductModal} onHide={closeProductModal}>
        <Modal.Header closeButton>
          <Modal.Title>{myProfile.username}`s Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {myProfile.products && (
            <div>
  <table className="table align-items-center">
  
      <thead>
                                                <tr>
                                                  <th>Image</th>
                                                  <th scope="col">Name</th>
                                                  <th scope="col">Price</th>
                                                  <th scope='col'></th>
                                                </tr>
                                              </thead>
                                              <tbody className="product-table-body">
                                                {myProfile.products.map((product) => (
                  <tr>
                <td> <img src={product.productImage} alt={product.productName} style={{width: '3.5rem'}} /></td>
                <td>{product.productName}</td>
                <td>{product.productPrice} MKD</td>
                <td>
                <NavLink
  variant='link'
  to={`/product/${product.id}`}
  style={{
    textDecoration: 'none',
    display: 'inline-block',
    padding: '8px 16px', // Adjust padding as needed
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '4px', // Add rounded corners
    transition: 'background-color 0.3s ease-in-out', // Add a transition effect
  }}
>
  View product
</NavLink>
</td>
               </tr>
                  ))}  
                                              </tbody>
                                            </table>              
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeProductModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCommentModal} onHide={closeCommentModal}>
        <Modal.Header closeButton>
          <Modal.Title>All Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
  {myProfile.comments && myProfile.comments.length > 0 ? (
    myProfile.comments.map((comment) => (
      <div class="card p-3 mt-2" key={comment.id}>
        <div class="d-flex justify-content-between align-items-center">
          <div class="user d-flex flex-row align-items-center">
            <a href={`/profile/${comment.commenterUsername}`}>
              <img src="https://cdn-icons-png.flaticon.com/512/666/666201.png" width="30" class="user-img rounded-circle mr-2"/>
            </a>
            <span style={{color: '#000000'}}>
              <small class="font-weight-bold">
                <a href={`/profile/${comment.commenterUsername}`} style={{color: 'inherit', textDecoration: 'none'}}>
                  {comment.commenterUsername}:
                </a>
              </small>
              <small class="font-weight-bold text-secondary"> {comment.content} </small>
            </span>
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <small style={{color: '#000000'}}>{comment.formattedDate} {comment.formattedTime}</small>
            <div style={{marginLeft: '105px'}}></div> 
          </div>
        </div>
      </div>
    ))
  ) : (
    <p>No comments for this user yet.</p>
  )}
</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeCommentModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;