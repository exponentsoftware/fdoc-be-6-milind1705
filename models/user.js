const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      unique: [true, "This email is alredy registered with us"],
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      minlength: [10, "Number Should not less than 10 characher"],
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
    todo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo",
      },
    ],
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
