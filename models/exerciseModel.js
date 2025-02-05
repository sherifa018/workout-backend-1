import mongoose from "mongoose";

const exerciseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    reps: {
      type: String,
      required: true,
    },
  },
  { timesstamps: true }
);
export const Exercise = mongoose.model("Exercise", exerciseSchema);
