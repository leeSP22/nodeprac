const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    content: {
      type: String
    },
    date: {
      type: Date
    },
    _postid: {
        type:String
    }
  });



module.exports = mongoose.model("Comment", commentSchema);