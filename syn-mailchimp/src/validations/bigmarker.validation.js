const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getBigMarkerConferences = {
  query: Joi.object().keys({
    conference_id: Joi.string().required(),
    id: Joi.string(),
    title: Joi.string(),
    type: Joi.string(),
    copy_webinar_id: Joi.string(),
    master_webinar_id: Joi.string(),
    start_time: Joi.string(),
    duration: Joi.number(),
    conference_address: Joi.string(),
  }),
};

module.exports = {
  getBigMarkerConferences,
};
