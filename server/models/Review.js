const { Schema, model } = require("mongoose");
const User = require("./User");

const reviewSchema = new Schema({
  reviewContent: {
    type: String,
    required: true,
    minlength: 1
  },
  reviewAuthor: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
    },
  ],
});

const Review = model("Review", reviewSchema);

module.exports = Review;
