const mongoose = require("mongoose");

const brandSchema = mongoose.Schema(
  {
    brand: {
      type: String,
      unique: true,
      required: true,
      collation: { locale: "en", strength: 2 },
    },
    brandImg: String,
  },
  { timestamps: true },
);

module.exports = new mongoose.model("Brand", brandSchema);
