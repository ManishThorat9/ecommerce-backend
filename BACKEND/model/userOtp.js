const mongoose = require('mongoose')
const validator = require('validator')

const userOtpSchema = new mongoose.Schema({
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
  otp: {
    type: String,
    required: true
  }
})

// user otp model
const userotp = new mongoose.model("userotps", userOtpSchema);

module.exports = userotp;