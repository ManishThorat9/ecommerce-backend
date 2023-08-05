const express = require('express');
const router = new express.Router();
const controllers = require('../controllers/userControllers')


// Routes //
// Register
router.post("/user/register", controllers.userregister);

//Otpsent
router.post("/user/sendotp", controllers.userOtpSent);


module.exports = router;