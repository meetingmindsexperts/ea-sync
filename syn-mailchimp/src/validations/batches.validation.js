const Joi = require('joi');
const {objectId } = require('./custom.validation');



const getBatches = {
  query: Joi.object().keys({
    title: Joi.string(),
  }),
};

const getBatch = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const retrieveBatches = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const updateBatch = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string().required()
    })
    .min(1),
};

const deleteBatch = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  getBatches,
};
