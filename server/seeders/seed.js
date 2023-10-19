const db = require("../config/connection");
const { User, Property, Review } = require("../models");
const userSeeds = require("./userSeeds.json");
const propertySeeds = require("./propertySeeds.json");
const reviewSeeds = require("./reviewtSeeds.json");

db.once("open", async () => {
  try {
    await Review.deleteMany({});
    await User.deleteMany({});
    await Property.deleteMany({});

    await User.create(userSeeds);

    const reviews = await Review.create(reviewSeeds);
    const properties = await Property.create(propertySeeds);

    for (newReview of reviews) {
      const tempProperty =
        properties[Math.floor(Math.random() * properties.length)];
      tempProperty.reviews.push(newReview._id);
      await tempProperty.save();
    }

    for (let i = 0; i < reviewSeeds.length; i++) {
      const { _id, reviewAuthor } = await Review.create(reviewSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: reviewAuthor },
        {
          $addToSet: {
            reviews: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("finit!");
  process.exit(0);
});
