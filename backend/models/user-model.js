const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    role: {
      type: String,
      enum: ["user", "owner", "admin"],
      default: "user",
    },
    orders: {
      type: Array,
      default: [],
    },
    contact: Number,
    picture: {
      type: String,
      default:
        "https://res.cloudinary.com/dz1qj3x8h/image/upload/v1698858700/avatars/default-avatar.png",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
