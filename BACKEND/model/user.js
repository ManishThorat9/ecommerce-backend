const mongoose = require('mongoose')
const validator = require('validator')
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "manish",
  },
  email: {
    type: String,
    unique: true,
    required: true,
    default: "wwww.gmail.com",
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email")
      }
    }
  },
  phone_no: {
    type: String,
    unique: true,
    required: true,
    // minlength:10,
    default: "+918075463256"

  },
  role: {
    type: String,
    default: "admin"
  },
  password: {
    type: String,
    unique: true,
    required: true,
    minlength: 8,
    default: "pass-the-word"
  }
  //     token:{
  //           type: String,
  //     },
});

module.exports = mongoose.model('user', userSchema)