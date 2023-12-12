const Joi = require('joi');
const {objectId } = require('./custom.validation');


const generateDTCMCode = {
  body: Joi.object().keys({
    title: Joi.string().required(),
  }),
};

module.exports = {
  generateDTCMCode
};
