const mongoose = require('mongoose');
const Workout = require('../models/workoutModel');

//get all workout 
const getWorkouts = async(req, res) => {
    const user_id = req.user._id;
    try {
        const workouts = await Workout.find({ user_id }).sort({createdAt: -1});
        res.status(200).json(workouts);
    } catch (err) {
        res.status(500).json(err);
    }
};

// get a single workout
const getWorkout = async(req, res) => {
    try {
        const {id} = req.params;
        
        //id is not valid ObjectId 
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "No Such Workout Found"});
        }
        
        const workout = await Workout.findById(id);
        
        if (!workout) {
            return res.status(404).json({error: "No Such Workout Found"});
        }
        
        res.status(200).json(workout);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

// create a new workout
const createWorkout = async(req, res) => {
    const {title, reps, loads} = req.body;
    
    let emptyFields = [];
    if (!title) {
        emptyFields.push('title');
    }
    if (!loads) {
        emptyFields.push('loads');
    } 
    if (!reps) {
        emptyFields.push('reps');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({error: "Please fill in all the fields", emptyFields})
    }

    try {
        const user_id = req.user._id;
        const workout = await Workout.create({title, reps, loads, user_id});
        res.status(200).json(workout);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

// delete a single workout
const deleteWorkout = async(req, res) => {
    try {
        const {id} = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "No Such Workout Found"});
        }
        
        const workout = await Workout.findOneAndDelete({_id: id});

        if (!workout) {
            return res.status(404).json({error: "No Such Workout Found"});
        }

        res.status(200).json(workout);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

// update a single workout
const updateWorkout = async(req, res) => {
    try {
        const {id} = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({error: "No Such Workout Found"});
        }

        const workout = await Workout.findOneAndUpdate({_id: id}, {
            ...req.body
        });

        if (!workout) {
            return res.status(404).json({error: "No Such Workout Found"});
        }

        res.status(200).json(workout);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};


module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}    