import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

import { QUERY_ME } from "../utils/queries";
import { REMOVE_REVIEW, REMOVE_COMMENT } from "../utils/mutations";

import Auth from "../utils/auth";

const myLiving = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_ME : null, {
    variables: { username: userParam },
  });

  const user = data?.me || {};

  const [removeReview, { error }] = useMutation(REMOVE_REVIEW);
  const [removeComment, { error }] = useMutation(REMOVE_COMMENT);

  if (Auth.loggedIn() && Auth.getMyLiving().data.username === userParam) {
    return <Navigate to="/my" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You cannot just be trying to see this. Use the links above to sign up or
        log in!
      </h4>
    );
  }

  const handleDeleteReview = async (reviewId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeReview({
        variables: { reviewId: reviewId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteComment = async (reviewId, commentId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeComment({
        variables: { reviewId: reviewId, commentId: commentId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="myLiving-page">
      <h2>Your Reviews</h2>
      {user.reviews.map((review) => (
        <>
          <ReviewList
            key={review._id}
            _id={review._id}
            name={review.reviewContent}
            address={review.reviewAuthor}
            unitStyles={review.property.name}
            totalUnits={review.createdAt}
          />
          <Button
            className="btn-block btn-danger"
            onClick={() => handleDeleteReview(review._id, comment._id)}
          >
            Take it back!
          </Button>
        </>
      ))}
      <h2>Your Comments</h2>
      <ul>
        {user.reviews.comments.map((comment) => (
          <li key={comment._id}>
            <p>{comment.commentText}</p>
            <p>{comment.commentAuthor}</p>
            <p>{comment.createdAt}</p>
          </li>
        ))}
        <Button
          className="btn-block btn-danger"
          onClick={() => handleDeleteComment(review._id)}
        >
          Take it back!
        </Button>
      </ul>
    </div>
  );
};

export default myLiving;
