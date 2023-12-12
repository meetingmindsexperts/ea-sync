const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { tagsServices } = require('../services');
const axios = require('axios');
const config = require('../config/config');

const createTag = catchAsync(async (req, res) => {
  const tag = await tagsServices.createItem(req.body);
  res.status(httpStatus.CREATED).send(tag);
});

const getTags = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await tagsServices.queryItems(filter, options);
  res.send(result);
});

const getTag = catchAsync(async (req, res) => {
  const item = await tagsServices.getItemById(req.params.id);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }
  res.send(item);
});


const updateTag = catchAsync(async (req, res) => {
  const item = await tagsServices.updateItemById(req.params.id, req.body);
  res.send(item);
});

const deleteTag = catchAsync(async (req, res) => {
  await eventsairService.deleteEventsairById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send({"message":"Item Deleted Successfully"});
});

module.exports = {
  createTag,
  getTags,
  getTag,
  updateTag,
  deleteTag,
  deleteTag
};
