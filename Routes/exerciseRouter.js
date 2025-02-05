import express from "express";
import { Exercise } from "../models/exerciseModel.js";
import jwt from "jsonwebtoken";
import { json } from "express";

const router = express.Router();

//Route for add a new workout
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.load || !req.body.reps) {
      return res.status(400).send({ message: "All fields required" });
    }
    const newexercise = {
      title: req.body.title,
      load: req.body.load,
      reps: req.body.reps,
    };
    const workouts = await Exercise.create(newexercise);
    res.status(201).send({
      message: "WorkOut added successfully",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route for dispalying all added exercises
router.get("/", async (req, res) => {
  try {
    const workouts = await Exercise.find({});
    return res.status(200).json({ workouts });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route for deleting an exercise
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const workoutTobeDeleted = await Exercise.findByIdAndDelete(id);
    console.log(workoutTobeDeleted);

    if (!workoutTobeDeleted) {
      return res.status(200).send({ message: "workout deleted successfully" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
