const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  fname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
});

var studentdata = mongoose.model("studentdata", studentSchema);
module.exports = studentdata;
