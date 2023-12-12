const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { batchesServices } = require('../services');
const axios = require('axios');
const config = require('../config/config');
const mailchimp = require('@mailchimp/mailchimp_marketing');


const getBatches = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const getPending = await batchesServices.getPendingStatusItems();

  mailchimp.setConfig({
    apiKey: config.mailchimpKey,
    server: config.mailchimpPrefix
  });

  if(getPending.length > 0){
    getPending.map((v) => {
      async function run() {
        const response = await mailchimp.batches.status(v.batch_id);
        console.log(response.status);
        const r = batchesServices.updateItemById(v.id,{status:response.status})
      }
      run();
    });
  }

    const result = await batchesServices.queryItems(filter, options);
    res.send(result);
  }
);

const getBatch = catchAsync(async (req, res) => {
  const item = await batchesServices.getItemById(req.params.id);
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }
  res.send(item);
});


const updateBatch = catchAsync(async (req, res) => {
  const item = await batchesServices.updateItemById(req.params.id, req.body);
  res.send(item);
});

const deleteBatch = catchAsync(async (req, res) => {
  await batchesServices.deleteItemById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send({"message":"Item Deleted Successfully"});
});

module.exports = {
  getBatches,
  getBatch,
  updateBatch,
  deleteBatch
};
