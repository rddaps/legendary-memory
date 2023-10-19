import React from 'react';

const ReviewList = ({
  reviews
}) => {
  if (!reviews.length) {
    return <h3>No Reviews Yet</h3>;
  };

};

  export default ReviewList;
