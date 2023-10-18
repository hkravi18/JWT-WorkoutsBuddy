require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

//express app 
const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

//middleware
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use((req, res, next) => {
    console.log(req.headers);
    next();
})

app.use('/api/workouts', workoutRoutes);
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