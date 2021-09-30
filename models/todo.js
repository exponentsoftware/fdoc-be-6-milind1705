const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    username: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    discription: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Work", "Task", "Hobby"],
      required: true,
      default: "Work",
    },
    completedStatus: {
      type: String,
      enum: ["todo", "inProgress", "completed"],
      default: "todo",
    },
    like: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    rating:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rating"
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
