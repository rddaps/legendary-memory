import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $user, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation addReview($reviewContent: String!) {
    addReview(reviewContent: $reviewContent) {
      review {
        _id
        reviewContent
        reviewAuthor
        property {
          name
        }
        createdAt
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($reviewId: ID!, $commentText: String!) {
    addComment(reviewId: $reviewId, commentText: $commentText) {
      review {
        _id
        reviewContent
        reviewAuthor
        property {
          name
        }
        createdAt
        comments {
          _id
          commentText
          commentAuthor
          createdAt
        }
      }
    }
  }
`;

export const REMOVE_REVIEW = gql`
  mutation removeReview($reviewId: ID!) {
    removeReview(reviewId: $reviewId) {
      user {
        _id
        username
        reviews {
          _id
          reviewContent
          reviewAuthor
          property {
            name
          }
          createdAt
        }
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment($reviewId: ID!, $commentId: ID!) {
    removeComment(reviewId: $reviewId, commentId: $commentId) {
      review {
        _id
        reviewContent
        reviewAuthor
        property {
          name
        }
        createdAt
        comments {
          _id
          commentText
          commentAuthor
          createdAt
        }
      }
    }
  }
`;

export const UPDATE_PROPERTY = gql`
  mutation updateProperty($propertyId: ID!, $totalUnits: Int!) {
    updateProperty(propertyId: $propertyId, totalUnits: $totalUnits) {
      property {
        _id
        name
        address
        unitStyles
        totalUnits
        image
        reviews {
          _id
          reviewContent
          reviewAuthor
          createdAt
          comments {
            _id
            commentText
            commentAuthor
            createdAt
          }
        }
      }
    }
  }
`;
