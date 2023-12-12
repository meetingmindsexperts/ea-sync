const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const BigMarkerSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true,
        },
    // Add other properties based on the BigMarker API response
    },
    {
        timestamps: true,
    }
);

// Add plugin that converts mongoose to JSON
BigMarkerSchema.plugin(toJSON);
BigMarkerSchema.plugin(paginate);

/**
 * @typedef BigMarkerConference
 */
const BigMarkerConference = mongoose.model('BigMarkerConference', BigMarkerSchema);

module.exports = BigMarkerConference;
