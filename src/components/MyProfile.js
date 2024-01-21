import React, { useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, FormLabel, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { GetMyProfile } from '../services/user';
import { NavLink } from 'react-router-dom';
import { EditMyProfile, ChangePassword } from '../services/user';

const MyProfile = () => {
  const myProfile = useSelector((state) => state.userSlice.myProfile);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  const [showEditConfirmationModal, setShowEditConfirmationModal] = useState(false);
  const [showChangePasswordConfirmationModal, setShowChangePasswordConfirmationModal] = useState(false);
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [hasValidationErrorEditProfile, sethasValidationErrorEditProfile] = useState(false);
  const [hasValidationErrorChangePassword, sethasValidationErrorChangePassword] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile({ ...myProfile }); 
  };

    const openEditConfirmationModal = () => {
      setShowEditConfirmationModal(true);
    };
  
    const closeEditConfirmationModal = () => {
      setShowEditConfirmationModal(false);
    };

  const handleConfirmEditSave = () => {
    if(editedProfile.username!=="" && editedProfile.email!=="" & editedProfile.name!=="" & editedProfile.surname!=="" & editedProfile.phone!=="" & editedProfile.address!=="" & editedProfile.postalCode!=="" & password!=="")
    {openEditConfirmationModal();
      sethasValidationErrorEditProfile(false);}
    else{
      sethasValidationErrorEditProfile(true);
    }
  }

  const handleEditSave = () => {
    if (showEditConfirmationModal) {
      EditMyProfile(dispatch, editedProfile, password);
      setIsEditing(false);
      closeEditConfirmationModal();
    }
  }

  const handleChangePassword = () => {
    setIsChangingPassword(true);
    setCurrentPassword('');
    setNewPassword('');
    setRepeatNewPassword('');
  };

  const openChangePasswordConfirmationModal = () => {
    setShowChangePasswordConfirmationModal(true);
  };

  const closeChangePasswordConfirmationModal = () => {
    setShowChangePasswordConfirmationModal(false);
  };

const handleConfirmChangePasswordSave = () => {
  if(currentPassword !== "" && newPassword !== "" && repeatNewPassword !== "")
 {openChangePasswordConfirmationModal();
  sethasValidationErrorChangePassword(false);;}
  else
  sethasValidationErrorChangePassword(true);
}

const handleChangePasswordSave = () => {
  if (showChangePasswordConfirmationModal) {
    ChangePassword(dispatch, currentPassword, newPassword, repeatNewPassword);
    setIsChangingPassword(false);
    closeChangePasswordConfirmationModal();
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
          <Button onClick={handleEdit} className="m-2 btn btn-dark">Edit Profile</Button>
          <Button onClick={handleChangePassword} className="m-2 btn btn-dark">Change password</Button>
          {myProfile.comments && myProfile.comments.length > 0 && (
    <div style={{margin: 'auto', textAlign: 'center'}}>
      <Button className="btn btn-dark" onClick={openCommentModal}>
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
    <Button variant="dark" onClick={handleConfirmEditSave}>
      Save Changes
    </Button>
    <Button variant="secondary" onClick={() => setIsEditing(false)}>
      Cancel
    </Button>
    {hasValidationErrorEditProfile && (
          <div style={{ color: 'red', fontWeight: 'bold', marginTop: '10px'}}>
            Please fill all the required fields.
          </div>
        )}
  </Modal.Footer>
</Modal>

 {/* Confirmation Edit Modal */}
 <Modal show={showEditConfirmationModal} onHide={closeEditConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to save the changes?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleEditSave}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={closeEditConfirmationModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

    {/* Change Password Modal */}
         <Modal show={isChangingPassword} onHide={() => setIsChangingPassword(false)}>
         <Modal.Header closeButton>
           <Modal.Title>Change Password</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <FormLabel>Current Password</FormLabel>
           <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip><span>Required field</span></Tooltip>}
                >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px', color: 'red' }}>*</span>
                </OverlayTrigger>
           <Form.Control
             type="password"
             name="currentPassword"
             value={currentPassword}
             onChange={(e) => setCurrentPassword(e.target.value)}
           />
           <FormLabel>New Password</FormLabel>
           <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip><span>Required field</span></Tooltip>}
                >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px', color: 'red' }}>*</span>
                </OverlayTrigger>
           <Form.Control
             type="password"
             name="newPassword"
             value={newPassword}
             onChange={(e) => setNewPassword(e.target.value)}
           />
           <FormLabel>Repeat New Password</FormLabel>
           <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip><span>Required field</span></Tooltip>}
                >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px', color: 'red' }}>*</span>
                </OverlayTrigger>
           <Form.Control
             type="password"
             name="repeatNewPassword"
             value={repeatNewPassword}
             onChange={(e) => setRepeatNewPassword(e.target.value)}
           />
         </Modal.Body>
         <Modal.Footer>
        <Button variant="dark" onClick={handleConfirmChangePasswordSave}>
          Save Changes
        </Button>
        <Button variant="secondary" onClick={() => setIsChangingPassword(false)}>
          Cancel
        </Button>
        {hasValidationErrorChangePassword && (
          <div style={{ color: 'red', fontWeight: 'bold', marginTop: '10px' }}>
            Please fill all the required fields.
          </div>
        )}
      </Modal.Footer>
       </Modal>

       <Modal show={showChangePasswordConfirmationModal} onHide={closeChangePasswordConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to save the changes?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleChangePasswordSave}>
            Confirm
          </Button>
          <Button variant="secondary" onClick={closeChangePasswordConfirmationModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>


     </div>
  );
};

export default MyProfile;