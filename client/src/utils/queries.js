import { gql } from "@apollo/client";

export const QUERY_PROPERTIES = gql`
  {
    properties {
      _id
      name
      address
      unitStyles
      totalUnits
      image
    }
  }
`;

export const QUERY_PROPERTY = gql`
  {
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
`;

export const QUERY_ME = gql`
  query me {
    _id
    username
    email
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
`;
