const httpStatus = require('http-status');
const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const axios = require('axios');
// const config = require('../config/config');

module.exports = {
    getBigMarkerConferences: catchAsync(async (req, res) => {
        try {
            const bigMarkerApiKey = '9af970a428c7cf08596b'; // BigMarker API key
            const bigMarkerUrl = 'https://api.bigmarker.com/v1/conferences'; // Adjust the API endpoint as needed

            // Make the API call to fetch conferences
            const response = await axios.get(bigMarkerUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bigMarkerApiKey}`,
                },
            });

            // Process the response as needed
            const conferences = response.data;

            if (conferences.length > 0) {
                // Assuming you have a frontend template engine like EJS, you can render a view with the data
                res.render('conferences', { conferences, type: 'success' });
            } else {
                // Handle case when no conferences are available
                res.status(httpStatus.OK).json({ type: 'info', message: 'No conferences available' });
            }

            console.log(conferences);
        } catch (error) {
            console.error('Error fetching conferences from BigMarker:', error);
            res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ type: 'error', message: 'Error fetching conferences from BigMarker' });
        }
    }),
};
