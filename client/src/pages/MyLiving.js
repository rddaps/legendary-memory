import React from 'react';
import {
    Container,
    Card,
    Button,
    Row,
    Col
  } from 'react-bootstrap';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';

import { QUERY_ME } from '../utils/queries';
import { REMOVE_REVIEW, REMOVE_COMMENT } from '../utils/mutations';

import Auth from '../utils/auth';

const myLiving = () => {
    const { username: userParam } = useParams();
  
    const { loading, data } = useQuery(userParam ? QUERY_ME, {
      variables: { username: userParam },
    });
  
    const user = data?.me || data?.user || {};
    if (Auth.loggedIn() && Auth.getUser().data.username === userParam) {
      return <Navigate to="/my" />;
    }
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!user?.username) {
      return (
        <h4>
          You cannot just be trying to see this. Use the links above to
          sign up or log in!
        </h4>
      );
    }

    return (

    );
};

export default MyLiving;

