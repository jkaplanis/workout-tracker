const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  exercises: [
    {
      day: {
        type: Date,
        default: Date.now
      },
      type: {
        type: String,
        trim: true,
        required: "Workout type is required"
      },
      name: {
        type: String,
        trim: true,
        required: "Workout name is required"
      },
      duration: {
        type: Number,
        required: "You must enter a duration",
        min: 1
      },
      weight: {
        type: Number,
        required: "You must enter a weight",
        min: 1
      },
      reps: {
        type: Number,
        required: "You must enter a number of reps",
        min: 1
      },
      sets: {
        type: Number,
        required: "You must enter a number of sets",
        min: 1
      }
    }
  ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
