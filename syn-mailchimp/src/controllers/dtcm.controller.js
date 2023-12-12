const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { dtcmServices } = require('../services');
const axios = require('axios');
const config = require('../config/config');

const generateDTCMCode = catchAsync(async (req, res) => {
  const tag = await dtcmServices.createBarCode(req.body);
  res.status(httpStatus.CREATED).send(tag);
});


module.exports = {
  generateDTCMCode
};
