const express = require('express');
const router = express.Router();

const {
    getWorkout,
    getWorkouts,
    createWorkout,
    deleteWorkout,
    updateWorkout
} = require('../Controllers/workoutController');

const requireAuth = require('../middleware/requireAuth');

//auth middleware 
router.use(requireAuth);

//GET all workouts 
router.get("/", getWorkouts);

//GET a single workout
router.get("/:id", getWorkout);

//POST all workouts 
router.post("/", createWorkout);

//DELETE a single workout
router.delete("/:id", deleteWorkout);

//UPDATE a single workout
router.patch("/:id", updateWorkout);

module.exports = router;