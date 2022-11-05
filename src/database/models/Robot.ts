import mongoose from "mongoose";

const robotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  features: {
    speed: {
      type: Number,
      required: true,
    },
    endurance: {
      type: Number,
      required: true,
    },
    dateOfCreation: {
      type: Date,
      required: true,
    },
  },
});

// eslint-disable-next-line @typescript-eslint/naming-convention
const Robot = mongoose.model("Robot", robotSchema, "robots");

export default Robot;
