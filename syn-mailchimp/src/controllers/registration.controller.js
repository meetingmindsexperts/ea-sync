const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { registrationServices } = require('../services');
const axios = require('axios');
const config = require('../config/config');
const getUniqueListBy = require('../utils/getUniqueListBy');

const createRegistration = catchAsync(async (req, res) => {
  const tag = await registrationServices.createItem(req.body);
  res.status(httpStatus.CREATED).send(tag);
});



const SendSMS = catchAsync(async (req, res) => {
  const data = await registrationServices.SendSMS(req.body);
  res.status(httpStatus.CREATED).send(data);
});


const sendWhatsappMessage = catchAsync(async (req, res) => {
  var data = registrationServices.getTextMessageInput("971565546190", 'Welcome to the Movie Ticket Demo App for Node.js!');

  registrationServices.sendWhatsappMessage(data)
    .then(function (response) {
      res.status(httpStatus.CREATED).send(response);
      return;
    })
    .catch(function (error) {
      console.log(error);
      console.log(error.response.data);
      res.sendStatus(500);
      return;
    });

  // const data = await registrationServices.sendWhatsappMessage(req.body);
  // res.status(httpStatus.CREATED).send(data);
});






const getRegistrations = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await registrationServices.queryItems(filter, options);

  res.send(getUniqueListBy(result,email));
});



const GetRegistratedMobileNumbers = catchAsync(async (req, res) => {
  const result = await registrationServices.GetRegistratedMobileNumbers(req.body);
  res.send(result);
});





const getRegistration = catchAsync(async (req, res) => {
  const item = await registrationServices.getItemByEventId(req.params.id);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }
  res.send(item);
});

const getSearchResults = catchAsync(async (req, res) => {
  const result = await registrationServices.searchQuery(req.body);
  if(!result){
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }

  res.send(getUniqueListBy(result,'email'));
});


const updateRegistration = catchAsync(async (req, res) => {
  const item = await eventsairService.updateEventsairById(req.params.id, req.body);
  res.send(item);
});




module.exports = {
  createRegistration,
  getRegistrations,
  getRegistration,
  updateRegistration,
  getSearchResults,
  GetRegistratedMobileNumbers,
  SendSMS,
  sendWhatsappMessage
};
