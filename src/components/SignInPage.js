import React, {useState } from 'react';
import { Form, Button, FormControl, Row, FormLabel, Col } from 'react-bootstrap';
import { SignIn } from '../services/authentication';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles/SignInPage.css'

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh', 
      }}>
    <div style={{ width: '30rem', margin: 'auto', padding: '10px', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: '30px' }}>
        <style></style>
        <Form
        onSubmit={event => {
          event.preventDefault();
          SignIn(dispatch, { email, password })
            .then(() => {
              // Redirect back to the previous location or a default page
              const fromLocation = location.state?.from;
              if (fromLocation) {
                navigate(fromLocation);
              } else {
                navigate('/'); // Replace with the appropriate default page
              }
            })
            .catch(error => {
              // Handle sign-in error
            });
        }}
      >
            <h4 style={{ textAlign: 'center' }}>Welcome back</h4>
            <Row className="input-field">
            <Col>
              <FormLabel>Email</FormLabel>
                <FormControl placeholder='Enter email'
                    onChange={event => setEmail(event.target.value)} />
            </Col>
            </Row>
          
            <Row className="input-field">
            <Col>
              <FormLabel>Password</FormLabel>
                <FormControl placeholder='Enter password' type='password'
                   onChange={event => setPassword(event.target.value)} />
            </Col>
            </Row>
            <Button type='submit' variant='dark' style={{ margin: 'auto', display: 'block', width: '10rem' }}  className='btn'>Sign In</Button>
        </Form>
    </div>
    </div>);
};

export default SignInPage;
