require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoutes = require('./routes/products');
const userRoutes = require('./routes/user');

//express app 
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);

//connecting to the database 
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connection established to db');
})
.catch(err => {
    console.log(err.message);
})

//listen on some port 
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
});