const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const settingsSchema = mongoose.Schema(
  {
    value: {
      type: String,
      trim: true,
      required: true,
    },
    replace_with: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },

);

// add plugin that converts mongoose to json
tagsSchema.plugin(toJSON);
tagsSchema.plugin(paginate);

/**
 * @typedef Settings
 */
const Settings = mongoose.model('settings', settingsSchema);

module.exports = Settings;
