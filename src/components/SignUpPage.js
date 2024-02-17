import React, { useState } from 'react';
import { Form, Button, Row, Col, FormLabel, FormControl, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { SignUp } from '../services/authentication';
import { useDispatch } from 'react-redux';
import './styles/SignUpPage.css'

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const formatFieldName = (fieldName) => {
    return fieldName
      .replace(/([A-Z])/g, ' $1')
      .split(/(?=[A-Z])/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const clearErrors = () => {
    setErrors({});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    clearErrors();

    const mandatoryFields = {
      username,
      name,
      surname,
      phone,
      address,
      city,
      postalCode,
      email,
      password,
      confirmPassword
    };

    const newErrors = {};
    Object.keys(mandatoryFields).forEach((field) => {
        console.log(mandatoryFields[field])
      if (!mandatoryFields[field]) {
        let fieldName = formatFieldName(field);
        console.log("fieldname")
        console.log(fieldName)
        newErrors[field] = `${fieldName} is required.`;
      }
    });

    if (password !== "" && confirmPassword !== "" && password !== confirmPassword) {
      newErrors['confirmPassword'] = "Passwords do not match.";
    }

    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      SignUp(dispatch, {
        username,
        name,
        surname,
        phone,
        address,
        email,
        password,
        city,
        postalCode
      });
  };

  return (
    <div style={{ width: '30rem', margin: 'auto', padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '30px' }}>
        <style></style>
      <Form onSubmit={handleSubmit}>
        <h4 style={{ textAlign: 'center' }}>Create an account</h4>
        <Row className="input-field">
            <Col>
              <FormLabel>Username
              <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip><span>Required field</span></Tooltip>}
                >
                      <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px', color: 'red' }}>*</span>
                </OverlayTrigger>
              </FormLabel>
                <FormControl placeholder='Enter username'
                                      type="text"
                                      value = {username}
                    onChange={event => setUsername(event.target.value)}  />
            </Col>
            </Row>
          
            <Row className="input-field">
            <Col>
              <FormLabel>Name
              <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip><span>Required field</span></Tooltip>}
                >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px', color: 'red' }}>*</span>
                </OverlayTrigger>
              </FormLabel>
                <FormControl placeholder='Enter name'
                    onChange={event => setName(event.target.value)}   />
            </Col>
            </Row>
           
            <Row className="input-field">
            <Col>
              <FormLabel>Surname
              <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip><span>Required field</span></Tooltip>}
                >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px', color: 'red' }}>*</span>
                </OverlayTrigger>
              </FormLabel>
                <FormControl placeholder='Enter surname'
                    onChange={event => setSurname(event.target.value)} 
                     />
            </Col>
            </Row>

            <Row className="input-field">
            <Col>
              <FormLabel>Phone  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip><span>Required field</span></Tooltip>}
                >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px', color: 'red' }}>*</span>
                </OverlayTrigger>
             </FormLabel>
             <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Example for the phone input: (389) 70 123 456</Tooltip>}
                >
                <FormControl placeholder='Enter phone'
                    onChange={event => setPhone(event.target.value)} 
                     />
             </OverlayTrigger>
            </Col>
            </Row>

            <Row className="input-field">
            <Col>
              <FormLabel>Address
              <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip><span>Required field</span></Tooltip>}
                >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px', color: 'red' }}>*</span>
                </OverlayTrigger>
              </FormLabel>
                <FormControl placeholder='Enter address'
                    onChange={event => setAddress(event.target.value)} 
                />
            </Col>
            </Row>

            <Row className="input-field">
            <Col>
              <FormLabel>City
              <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip><span>Required field</span></Tooltip>}
                >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px', color: 'red' }}>*</span>
                </OverlayTrigger>
              </FormLabel>
                <FormControl placeholder='Enter city'
                    onChange={event => setCity(event.target.value)} 
                 />
            </Col>
            </Row>

            <Row className="input-field">
            <Col>
              <FormLabel>Postal Code
              <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip><span>Required field</span></Tooltip>}
                >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px', color: 'red' }}>*</span>
                </OverlayTrigger>
              </FormLabel>
                <FormControl placeholder='Enter postal code'
                    onChange={event => setPostalCode(event.target.value)} 
                />
            </Col>
            </Row>

            <Row className="input-field">
            <Col>
              <FormLabel>Email
              <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip><span>Required field</span></Tooltip>}
                >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px', color: 'red' }}>*</span>
                </OverlayTrigger>
              </FormLabel>
                <FormControl placeholder='Enter email'
                    onChange={event => setEmail(event.target.value)} 
               />
            </Col>
            </Row>

            <Row className="input-field">
            <Col>
              <FormLabel>Password
              <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip><span>Required field</span></Tooltip>}
                >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px', color: 'red' }}>*</span>
                </OverlayTrigger>
              </FormLabel>
              <FormControl placeholder='Enter password' type='password'
                    onChange={event => setPassword(event.target.value)} 
                 />
            </Col>
            </Row>

            <Row className="input-field">
            <Col>
              <FormLabel>Confirm Password
                 <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip><span>Required field</span></Tooltip>}
                >
                 <span style={{ fontSize: '18px', cursor: 'pointer', marginLeft: '10px', color: 'red' }}>*</span>
                </OverlayTrigger>
              </FormLabel>
              <FormControl placeholder='Enter confirm password' type='password'
                    onChange={event => setConfirmPassword(event.target.value)} 
                 />
            </Col>
            </Row>
        <Row>
          <Col>
            <div className="error-container  font-weight-bold">
              {Object.keys(errors).map((field) => (
                <div key={field} className="error-message">
                  {errors[field]}
                </div>
              ))}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type="submit" variant="dark" style={{ margin: 'auto', display: 'block', width: '10rem' }}>
              Sign Up
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SignUpPage;
