const { AuthenticationError } = require("apollo-server-express");
const { User, Property, Review } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    properties: async () => {
      return await Property.find({}).populate('reviews');
    },
    property: async (parent, { _id }) => {
      return await Property.findById(_id).populate("property");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("reviews");
      }
      throw new AuthenticationError("You gotta log in!");
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
    addReview: async (parent, { propertyId, reviewContent }, context) => {
      if (context.user) {
        const review = await Review.create({
          _id: propertyId,
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
    removeReview: async (parent, { _id }, context) => {
      if (context.user) {
        const review = await Review.findOneAndDelete({
          _id,
          reviewAuthor: context.user.username,
        });

        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { reviews: review._id } }
        );

        return updatedUser;
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
    updateProperty: async (parent, { _id, totalUnits }, context) => {
      const decrement = Math.abs(totalUnits) * -1;

      if (context.user) {
        const updatedProperty = await Property.findByIdAndUpdate(
          _id,
          { $inc: { totalUnits: decrement } },
          { new: true }
        );
        return updatedProperty;
      }
      throw new AuthenticationError("You gotta log in!");
    },
  },
};

module.exports = resolvers;
