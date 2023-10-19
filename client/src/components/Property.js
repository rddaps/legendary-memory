import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_PROPERTY } from "../utils/queries";
import { UPDATE_PROPERTY, ADD_REVIEW, ADD_COMMENT } from "../utils/mutations";

import Auth from '../utils/auth';

const Property = () => {
  const { propertyId } = useParams();
  const [newReview, setNewReview] = useState('');
  const [newComment, setNewComment] = useState('');

    const { loading, data } = useQuery(QUERY_PROPERTY, {
      variables: { propertyId: propertyId },
    });

    const property = data?.property || [];
    const [addReview] = useMutation(ADD_REVIEW);
    const [addComment] = useMutation(ADD_COMMENT);

    const [updateProperty, { error }] = useMutation(UPDATE_PROPERTY);

    const handleUpdateProperty = async (propertyId, totalUnits) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
    
        if (!token) {
          return false;
        }
    
        try {
          await updateProperty({
            variables: { propertyId: propertyId, totalUnits: totalUnits },
          });
        } catch (err) {
          console.error(err);
        }
      };


      const handleReviewSubmit = async (reviewContent) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        
        if (!token) {
          return false;
        }

        try {
          await addReview({
            variables: { propertyId, reviewContent: reviewContent }
          });
        } catch (err) {
          console.error(err);
        }
      };

      const handleCommentSubmit = async (reviewId, commentText) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        
        if (!token) {
          return false;
        }
        
        try {
          await addComment({
            variables: { reviewId, commentText: commentText }
          });
        } catch (err) {
          console.error(err);
        }
      };

      if (!loading) {
        return <h2>LOADING...</h2>;
      }

      return (
        <div className="property-details">
          <h2>{property.name}</h2>
          <p>Address: {property.address}</p>
          <p>Unit Styles: {property.unitStyles}</p>
          <p>Total Units: {property.totalUnits}</p>
          <p>Image: {property.image}</p>
          <h3>Reviews</h3>
          <ul>
            {property.reviews.map(review => (
              <li key={review.id}>
                <p>{review.reviewContent}</p>
                <p>{review.reviewAuthor}</p>
                <p>{review.createdAt}</p>
                <h4>Comments</h4>
                <ul>
                  {review.comments.map(comment => (
                    <li key={comment.id}>
                      <p>{comment.commentText}</p>
                      <p>{comment.commentAuthor}</p>
                      <p>{comment.createdAt}</p>
                    </li>
                  ))}
                </ul>
                { }
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment"
                />
                <button onClick={() => handleCommentSubmit(review.id)}>Add Comment</button>
              </li>
            ))}
          </ul>
    
          { }
          <input
            type="text"
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            placeholder="Write a review"
          />
          <button onClick={handleReviewSubmit}>Add Review</button>
        </div>
      );
};

export default Property;
