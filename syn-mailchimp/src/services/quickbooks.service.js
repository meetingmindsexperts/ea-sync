const httpStatus = require('http-status');
const { Eventsair } = require('../models');
const ApiError = require('../utils/ApiError');


// services/quickbooks.service.js
const QuickBooksModel = require('../models/quickbooks.model');

class QuickBooksService {
  constructor() {
    this.quickBooksModel = new QuickBooksModel();
  }

  async syncDataToQuickBooks(eventsAirData) {
    // Implement logic to transform and send data to QuickBooks.
    return this.quickBooksModel.createCustomer(customerData);
  }
}

module.exports = QuickBooksService;
