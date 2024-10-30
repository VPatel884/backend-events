const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    hostedBy: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startingTime: {
      type: String,
      required: true,
    },
    endingTime: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    posterImgUrl: {
      type: String,
      reuired: true,
    },
    venue: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    tag: [{ type: String, required: true }],
    speakers: [
      {
        name: String,
        role: String,
        speakerImgUrl: String,
      },
    ],
    dressCode: {
      type: String,
    },
    ageRestriction: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
