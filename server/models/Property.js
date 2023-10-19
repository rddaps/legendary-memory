const { Schema, model } = require("mongoose");

const propertySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
  },
  unitStyles: {
    type: String,
    required: true,
  },
  totalUnits: {
    type: Number,
    required: true,
  },
  image: {
    type: String
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Property = model("Property", propertySchema);

module.exports = Property;
