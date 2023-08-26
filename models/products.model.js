const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

let productSchema = new Schema(
  {
    product: {
      type: String,
      unique: true,
      required: [true, "Product name is required"],
      trim: true,
      lowercase: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      lowercase: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "products",
    timestamps: true,
  }
);

productSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Products", productSchema);
