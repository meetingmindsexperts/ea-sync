const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const tagsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
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
 * @typedef Tags
 */
const Tags = mongoose.model('tag', tagsSchema);

module.exports = Tags;
