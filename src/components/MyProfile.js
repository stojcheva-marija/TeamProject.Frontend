import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, FormLabel, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { GetMyProfile } from '../services/user';
import { NavLink } from 'react-router-dom';
import { EditMyProfile } from '../services/user';

const MyProfile = () => {
  const myProfile = useSelector((state) => state.userSlice.myProfile);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  const [password, setPassword] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile({ ...myProfile }); 
  };

    const openConfirmationModal = () => {
      setShowConfirmationModal(true);
    };
  
    const closeConfirmationModal = () => {
      setShowConfirmationModal(false);
    };

  const handleEditSave = () => {
    openConfirmationModal();
  }

  const handleSave = () => {
    if (showConfirmationModal) {
      EditMyProfile(dispatch, editedProfile, password);
      setIsEditing(false);
      closeConfirmationModal();
    }
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'password') {
      setPassword(value); 
    } else {
      setEditedProfile({
        ...editedProfile,
        [name]: value,
      });
    }
  };


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

  const openCommentModal = () => {
    setShowCommentModal(true);
  };

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
          <p>Postal code: {myProfile.postalCode}</p>
          <p>Rating: {renderStars(myProfile.rating)} ({myProfile.rating})</p>
          <p>Rated by: {myProfile.ratingCount} users</p>
          <Button variant="dark" onClick={handleEdit}>Edit Profile</Button>
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

<Modal show={isEditing} onHide={() => setIsEditing(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Edit Profile</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {/* Input fields for editing profile */}
    {editedProfile && (
      <>
        <FormLabel>Username</FormLabel>
        <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip><span>Required field</span></Tooltip>}
                >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px', color: 'red' }}>*</span>
                </OverlayTrigger>
        <Form.Control
          type="text"
          name="username"
          placeholder="Username"
          value={editedProfile.username}
          disabled
        />
        <FormLabel>Email</FormLabel>
        <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip><span>Required field</span></Tooltip>}
                >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px', color: 'red' }}>*</span>
                </OverlayTrigger>
        <Form.Control
          type="email"
          name="email"
          value={editedProfile.email}
          onChange={handleInputChange}
          disabled
        />
        <FormLabel>Name</FormLabel>
        <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip><span>Required field</span></Tooltip>}
                >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px', color: 'red' }}>*</span>
                </OverlayTrigger>
        <Form.Control
          type="text"
          name="name"
          value={editedProfile.name}
          onChange={handleInputChange}
        />
        <FormLabel>Surname</FormLabel>
        <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip><span>Required field</span></Tooltip>}
                >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px', color: 'red' }}>*</span>
                </OverlayTrigger>
        <Form.Control
          type="text"
          name="surname"
          value={editedProfile.surname}
          onChange={handleInputChange}
        />
        <FormLabel>Phone</FormLabel>
        <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip><span>Required field</span></Tooltip>}
                >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px', color: 'red' }}>*</span>
                </OverlayTrigger>
        <Form.Control
          type="tel"
          name="phone"
          value={editedProfile.phone}
          onChange={handleInputChange}
        />
        <FormLabel>Address</FormLabel>
        <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip><span>Required field</span></Tooltip>}
                >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px', color: 'red' }}>*</span>
                </OverlayTrigger>
        <Form.Control
          type="text"
          name="address"
          value={editedProfile.address}
          onChange={handleInputChange}
        />
        <FormLabel>Postal Code</FormLabel>
        <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip><span>Required field</span></Tooltip>}
                >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px', color: 'red' }}>*</span>
                </OverlayTrigger>
        <Form.Control
          type="text"
          name="postalCode"
          value={editedProfile.postalCode}
          onChange={handleInputChange}
        />
        <FormLabel style={{ color: 'red'}}>Enter your password to confirm the changes</FormLabel>
        <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip><span>Required field</span></Tooltip>}
                >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px', color: 'red' }}>*</span>
                </OverlayTrigger>
        <Form.Control
          type="password"
          name="password"
          onChange={handleInputChange}
        />
      </>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="dark" onClick={handleEditSave}>
      Save Changes
    </Button>
    <Button variant="secondary" onClick={() => setIsEditing(false)}>
      Cancel
    </Button>
  </Modal.Footer>
</Modal>

 {/* Confirmation Modal */}
 <Modal show={showConfirmationModal} onHide={closeConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to save the changes?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleSave}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={closeConfirmationModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

    
  
  );
};

export default MyProfile;