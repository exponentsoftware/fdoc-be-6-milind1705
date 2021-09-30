const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ratingSchema = Schema({
    user:{
        type: String,
    },
    rating:{
        type: Number,
        min:[1, "Rating should not less than 1"],
        max:[5, "Rating not Exceed than 5"]
    },
    comment:{
        type: String
    },
    todo:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"todo"
    }
})

module.exports = mongoose.model("Rating", ratingSchema);