require("dotenv").config();
require('./config/database').connect()
const express = require('express');

const app = express();
const cors = require('cors');
const router = require('./routes/router.js');



//middleware
app.use(express.json());
app.use((cors()));
app.use(router);




app.get('/', (req, res) => {
  res.send("<h1>hello firends!</h1>");
})


module.exports = app;