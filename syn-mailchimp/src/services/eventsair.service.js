const httpStatus = require('http-status');
const { Eventsair } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const eventsairCreateItem = async (userBody) => {
 return Eventsair.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryEventsairItems = async (filter, options) => {
  // const users = await Eventsair.find({}).sort({_id:-1}).populate('tags');
  const users = Eventsair.aggregate([
    {
      $lookup: {
        from: "registrations",
        let: { eventid: "$_id" },
        pipeline: [{ $match: { $expr: { $in: ["$$eventid", "$events"] } } }],
        as: "registration_count",
      },
    },
    { $addFields: { registration_count: { $size: "$registration_count" } } },
    {$sort: {createdAt:-1}}
  ])
  return users;
};

const queryEventsairItemsWithoutFilter = async () => {
  const users = await Eventsair.find({}).sort('-id');
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getEventsairById = async (id) => {
  return Eventsair.findById(id).populate('tags');
};


/**
 * Update user by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateEventsairById = async (id, updateBody) => {
  const eventsair = await getEventsairById(id);
  if (!eventsair) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }
  // return eventsair;
  Object.assign(eventsair, updateBody);
  await eventsair.save();
  return eventsair;
};

/**
 * Delete user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const deleteEventsairById = async (id) => {
  const eventsair = await getEventsairById(id);
  if (!eventsair) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }
  await eventsair.remove();
  return eventsair;
};

module.exports = {
  eventsairCreateItem,
  queryEventsairItems,
  getEventsairById,
  updateEventsairById,
  deleteEventsairById,
  queryEventsairItemsWithoutFilter,
};
