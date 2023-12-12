const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const batchesSchema = mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    event_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Eventsair'
    },
    batch_id: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    total_operations: {
      type: Number,
      required: true,
    },
    finished_operations: {
      type: Number,
      required: true,
    },
    errored_operations: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },

);

// add plugin that converts mongoose to json
batchesSchema.plugin(toJSON);
batchesSchema.plugin(paginate);

/**
 * @typedef Batches
 */
const Batches = mongoose.model('batches', batchesSchema);

module.exports = Batches;
