const { AuthenticationError } = require("apollo-server-express");
const { User, Property, Review } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    properties: async () => Property.find(),
    property: async (parent, { id }) =>
      Property.findById(id).populate("property"),
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("property");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("But who are you!?");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("That is not it!");
      }

      const token = signToken(user);

      return { token, user };
    },
    addReview: async (parent, { reviewContent }, context) => {
      if (context.user) {
        const review = await Review.create({
          reviewContent,
          reviewAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { reviews: review._id } }
        );

        return review;
      }
      throw new AuthenticationError("You gotta log in!");
    },
    addComment: async (parent, { reviewId, commentText }, context) => {
      if (context.user) {
        return Review.findOneAndUpdate(
          { _id: reviewId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw new AuthenticationError("You gotta log in!");
    },
    removeReview: async (parent, { reviewId }, context) => {
      if (context.user) {
        const review = await Review.findOneAndDelete({
          _id: reviewId,
          reviewAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { reviews: review._id } }
        );

        return review;
      }
      throw new AuthenticationError("You gotta log in!");
    },
    removeComment: async (parent, { reviewId, commentId }, context) => {
      if (context.user) {
        return Review.findOneAndUpdate(
          { _id: reviewId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError("You gotta log in!");
    },
    updateProperty: async (parent, { id, totalUnits }) => {
      const decrement = Math.abs(totalUnits) * -1;

      return Property.findByIdAndUpdate(
        id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
