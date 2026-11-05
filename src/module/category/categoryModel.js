const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    category: {
      type: String,
      unique: true,
      required: true,
      collation: { locale: "en", strength: 2 },
    },
    categoryImg: String,
  },
  { timeStamps: true },
);

module.exports = new mongoose.model("Category", categorySchema);
