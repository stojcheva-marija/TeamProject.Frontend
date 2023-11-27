import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { GetMyProfile } from '../services/user';
import { NavLink } from 'react-router-dom';

const MyProfile = () => {
  const myProfile = useSelector((state) => state.userSlice.myProfile);
  const dispatch = useDispatch();

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
    GetMyProfile(dispatch);
  }, []);

  return (
    <div>
      {myProfile && (
      <div style={{ width: '30rem', margin: 'auto', backgroundColor: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', padding: '20px' }}>
          <h5 style={{textAlign: 'center'}}>My Profile</h5>
          <div class="col-12">
            <img src="https://cdn-icons-png.flaticon.com/512/666/666201.png" width="150px" height="170px" />
            </div>
          <p><b>Username : {myProfile.username}</b></p>
          <p>Name: {myProfile.name}</p>
          <p>Surname: {myProfile.surname}</p>
          <p>Email: {myProfile.email}</p>
          <p>Phone: {myProfile.phone}</p>
          <p>Address: {myProfile.address}</p>
          <p>Rating: {renderStars(myProfile.rating)} ({myProfile.rating})</p>
          <p>Rated by: {myProfile.ratingCount} users</p>
          {myProfile.comments && myProfile.comments.length > 0 && (
    <div style={{margin: 'auto', textAlign: 'center'}}>
      <Button variant="dark" style={{margin: '5px'}} onClick={openCommentModal}>
        View All Comments
      </Button>
      <NavLink  style={{margin: '5px'}}className="btn btn-dark" to={`/myProducts`}> View My Products</NavLink>
      </div>
  )}
        </div>
      )}

<Modal show={showCommentModal} onHide={closeCommentModal}>
        <Modal.Header closeButton>
          <Modal.Title>My Comments</Modal.Title>
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

export default MyProfile;