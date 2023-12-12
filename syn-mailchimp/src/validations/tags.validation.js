const Joi = require('joi');
const {objectId } = require('./custom.validation');


const createTag = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    status: Joi.required(),
  }),
};

const getTags = {
  query: Joi.object().keys({
    title: Joi.string(),
  }),
};

const getTag = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const retrieveTags = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateTag = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().required()
    })
    .min(1),
};

const deleteTag = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createTag,
  getTags,
  getTag,
  updateTag,
  deleteTag,
  retrieveTags
};
