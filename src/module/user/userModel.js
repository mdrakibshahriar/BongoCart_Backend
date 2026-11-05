const mongoose = require("mongoose");

const peopleSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["Admin", "User"],
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: Number,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("People", peopleSchema);
