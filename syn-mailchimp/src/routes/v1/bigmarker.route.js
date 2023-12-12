const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const bigMarkerValidation = require('../../validations/bigmarker.validation'); // Import BigMarker validation if needed
const bigMarkerController = require('../../controllers/bigmarker.controller');

const router = express.Router();

router
  .route('/conferences')
  .get(auth('manageBigMarkerConferences'), validate(bigMarkerValidation.getBigMarkerConferences), bigMarkerController.getBigMarkerConferences);

// Add more routes as needed for other BigMarker-related operations

module.exports = router;
