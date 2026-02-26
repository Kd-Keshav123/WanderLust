const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const revSchema = new Schema({
    name:String,
    comment: String,
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    createdAt: {
      type:String,
      default: new Date().toLocaleDateString(),           // Current System Date // Many more methods in date.js 
    },
    author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
})

// We always export model not Schema..
module.exports = model("Review",revSchema);