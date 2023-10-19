import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from "../utils/auth";

const SignUpForm = () => {
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
  
    const handleInputChange = (event) => {
      const { username, value } = event.target;
      setUserFormData({ ...userFormData, [username]: value });
    };
  
    const [addUser, { error }] = useMutation(ADD_USER);
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
  
      try {
        const { data } = await addUser({
          variables: { ...userFormData },
        });
        Auth.login(data.login.token);
      } catch (err) {
        console.error(err);
        setShowAlert(true);
      }
  
      setUserFormData({
        username: '',
        email: '',
        password: '',
      });
    };

    return (
        <>
          {}
          <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
            {}
            <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
              Something ain't right with your signup!
            </Alert>
    
            <Form.Group className='mb-3'>
              <Form.Label htmlFor='username'>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Your username'
                name='username'
                onChange={handleInputChange}
                value={userFormData.username}
                required
              />
              <Form.Control.Feedback type='invalid'>You'll want a username!</Form.Control.Feedback>
            </Form.Group>
    
            <Form.Group className='mb-3'>
              <Form.Label htmlFor='email'>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Your email'
                name='email'
                onChange={handleInputChange}
                value={userFormData.email}
                required
              />
              <Form.Control.Feedback type='invalid'>You need an email address!</Form.Control.Feedback>
            </Form.Group>
    
            <Form.Group className='mb-3'>
              <Form.Label htmlFor='password'>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Your password'
                name='password'
                onChange={handleInputChange}
                value={userFormData.password}
                required
              />
              <Form.Control.Feedback type='invalid'>You definitely need a password!</Form.Control.Feedback>
            </Form.Group>
            <Button
              disabled={!(userFormData.username && userFormData.email && userFormData.password)}
              type='submit'
              variant='success'>
              Submit
            </Button>
          </Form>
        </>
      );

};

export default SignUpForm;