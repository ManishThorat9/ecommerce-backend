const users = require('../model/user')
const express = require('express');
const bcrypt = require('bcryptjs')




exports.userregister = async(req, res) =>{
  try {
    const {name, email, phone_no, role, password} = req.body;

    // all field required
    if(!(name && email && phone_no && role && password)) {
        res.status(400).send('All field are required') 
    }else{
      console.log(`User ${email}, registered successfully!`);
    }
    // check user is present in db or not
    const existingUserE = await users.findOne({ email }) //PROMISE
    const existingUserM = await users.findOne({ phone_no })
    
    if(existingUserE || existingUserE ){
        res.status(401).send('User already exists!');
    }
      const myEncPassword = await bcrypt.hash(password,16)

        const userregister = new users({ 
          name,
          email: email.toLowerCase(),
          phone_no,
          role,
          password:myEncPassword,
        });
      
        // const storeData = await user.save();
        const storeData = await userregister.save(); 
        return res.status(201).json(storeData);
    
      }catch (error) {
        res.status(400).json({ error:"Invalid Details ", error})
        
      }
  }

