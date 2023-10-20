const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    reviews: [Review]!
  }

  type Property {
    _id: ID
    name: String!
    address: String!
    unitStyles: String!
    totalUnits: Int!
    image: String
    reviews: [Review]
  }

  type Review {
    _id: ID
    reviewContent: String!
    reviewAuthor: String!
    createdAt: String
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    properties: [Property]
    property(_id: ID!): Property
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addReview(propertyId: ID!, reviewContent: String!): Review
    addComment(reviewId: ID!, commentText: String!): Review
    removeReview(_id: ID!): User
    removeComment(reviewId: ID!, commentId: ID!): Review
    updateProperty(_id: ID!, totalUnits: Int!): Property
  }
`;

module.exports = typeDefs;
