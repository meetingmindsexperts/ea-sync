const Joi = require('joi');
const {objectId } = require('./custom.validation');


const createItem = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    position: Joi.string().required(),
    organization: Joi.string().required(),
    country: Joi.string().required(),
    registration_type: Joi.string().required(),
    events: Joi.array().required(),
    mobile_number: Joi.array().required(),
    tags: Joi.array().required(),


  }),
};

const getItems = {
  query: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const getItem = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const retrieveItems = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateItem = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().required(),
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().required(),
      position: Joi.string().required(),
      organization: Joi.string().required(),
      country: Joi.string().required(),
      registration_type: Joi.string().required(),
      events: Joi.array().required(),
      mobile_number: Joi.array().required(),
      tags: Joi.array().required(),
    })
    .min(1),
};

const deleteItem = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};
const searchValidate = {};

module.exports = {
  createItem,
  getItems,
  getItem,
  updateItem,
  deleteItem,
  searchValidate
};
