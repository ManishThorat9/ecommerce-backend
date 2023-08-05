const users = require('../model/user')
const express = require('express');
const bcrypt = require('bcryptjs')
const userotp = require('../model/userOtp')
const nodemailer = require("nodemailer")

// email config
const tarnsporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

exports.userregister = async (req, res) => {
  try {
    const { name, email, phone_no, role, password } = req.body;

    // all field required
    if (!(name && email && phone_no && role && password)) {
      res.status(400).send('All field are required')
    } else {
      console.log(`User ${email}, registered successfully!`);
    }
    // check user is present in db or not
    const existingUserE = await users.findOne({ email }) //PROMISE
    const existingUserM = await users.findOne({ phone_no })

    if (existingUserE || existingUserE) {
      res.status(401).send('User already exists!');
    }
    const myEncPassword = await bcrypt.hash(password, 16)

    const userregister = new users({
      name,
      email: email.toLowerCase(),
      phone_no,
      role,
      password: myEncPassword,
    });

    // const storeData = await user.save();
    const storeData = await userregister.save();
    return res.status(201).json(storeData);

  } catch (error) {
    res.status(400).json({ error: "Invalid Details ", error })

  }
};

//user sent otp

exports.userOtpSent = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: "Please enter your Email" })
  }
  try {
    const existingUserE = await users.findOne({ email }) //PROMISE

    if (existingUserE) {

      const OTP = Math.floor(100000 + Math.random() * 900000)


      //check email presence
      const existEmail = await userotp.findOne({ email: email });

      // if user already exist with email and otp update otp
      if (existEmail) {
        const updateData = await userotp.findByIdAndUpdate({ _id: existEmail._id }, {
          otp: OTP
        }, { new: true }
        );

        await updateData.save();

        // mail body
        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Sending Email For Otp Validation",
          text: `OTP:-${OTP}`
        }

        tarnsporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error", error);
            res.status(400).json({ error: "email not sent" })
          } else {
            console.log("Email sent", info.response);
            res.status(200).json({ message: "Email sent successfully" })
          }
        })


      } else {
        // if user not present in db then add email and otp 
        const saveOtpData = new userotp({
          email, otp: OTP
        });
        await saveOtpData.save();
      }


    } else {
      res.status(401).send('User already exists!');
    }
  } catch (error) {
    res.status(400).json({ error: "Invalid Details ", error })

  }
}
