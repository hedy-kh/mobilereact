const express = require('express');
const { Mongoose } = require('mongoose');
const userRouter = require('./routes/user');
const cors= require("cors");
require ('dotenv').config();
require ('./db');
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use('/api/user',userRouter)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
