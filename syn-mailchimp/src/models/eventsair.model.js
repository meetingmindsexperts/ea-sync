const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');


const EventsairSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
      tags:[
        { type: mongoose.Schema.Types.ObjectId,
         ref: 'tag'}
        ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
EventsairSchema.plugin(toJSON);
EventsairSchema.plugin(paginate);


/**
 * @typedef User
 */
const Eventsair = mongoose.model('Eventsair', EventsairSchema);

module.exports = Eventsair;
