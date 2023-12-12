const mongoose = require('mongoose');
const validator = require('validator');
const Eventsair = require('./eventsair.model');
const { toJSON, paginate } = require('./plugins');
const { string } = require('joi');

const registrationsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    first_name: {
      type: String,
      trim: true,
    },
    last_name: {
      type: String,
      trim: true,
    },
    position: {
      type: String,
      trim: true,
    },
    organization: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    registration_type: {
      type: String,
      trim: true,
    },
    mobile_number: {
      type: String,
      trim: true,
    },
    ea_id: {
      type:String,
      trim:true,
    },
    events:[{type: mongoose.Schema.Types.ObjectId, ref: 'Eventsair'}],
    tags:[{type: mongoose.Schema.Types.ObjectId, ref: 'tag'}],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
registrationsSchema.plugin(toJSON);
registrationsSchema.plugin(paginate);

/**
 * @typedef Registration
 */
const Registrations = mongoose.model('registration', registrationsSchema);

module.exports = Registrations;
