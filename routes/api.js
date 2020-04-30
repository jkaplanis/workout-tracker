const router = require("express").Router();

const db = require("../models");

// TODO: and add code to the routes so that the app functions correctly

// Creates a workout using data in the request body.
router.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(({ message }) => {
      console.log(message);
    });
});

// Respond with workout for id url parameter. This should
// respond with the updated workout json
router.put("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        exercises: req.body
      }
    },
    {
      new: true
    },
    (error, edited) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(edited);
        res.send(edited);
      }
    }
  );
});

// Respond with json for all the workouts in an array.
router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// Respond with json array containing the last 7 workouts
router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    //decending order of days
    .sort({ day: -1 })
    .limit(7)
    .then(dbWorkout => {
      //reverse to original order(ascending) bc stats page expects that order
      res.json(dbWorkout.reverse());
    })
    .catch(err => {
      res.json(err);
    });
});

// Delete workout with id matching id in the request body.
router.delete("/api/workouts", (req, res) => {
  db.Workout.findByIdAndDelete(req.body.id)
    .then(deleted => {
      res.json(deleted);
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
