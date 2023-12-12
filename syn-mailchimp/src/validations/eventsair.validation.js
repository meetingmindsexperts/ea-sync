const Joi = require('joi');
const {objectId } = require('./custom.validation');


const createEventsairItem = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    title: Joi.string().required(),
    url: Joi.string().required(),
    password: Joi.string().required(),
    tags: Joi.array().required()
  }),
};

const getEventsairItems = {
  query: Joi.object().keys({
    email: Joi.string(),
    title: Joi.string(),
    url: Joi.string(),
    password: Joi.string(),
  }),
};

const getEventairItem = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const retrieveEventsairUsers = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateEventairItem = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().email(),
      password: Joi.string(),
      url:Joi.string(),
      title: Joi.string(),
      tags:Joi.array().required()
    })
    .min(1),
};

const deleteEventsairItem = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createEventsairItem,
  getEventsairItems,
  getEventairItem,
  updateEventairItem,
  deleteEventsairItem,
  retrieveEventsairUsers
};
