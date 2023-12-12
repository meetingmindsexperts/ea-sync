const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { dtcmServices } = require('../services');
const axios = require('axios');
const config = require('../config/config');
// controllers/quickbooks.controller.js
const QuickBooksService = require('../services/quickbooks.service');

class QuickBooksController {
  constructor() {
    this.quickBooksService = new QuickBooksService();
  }

  async syncData(req, res) {
    try {
      // Fetch data from EventsAir (not shown in this example).
      const eventsAirData = fetchEventsAirData();

      // Sync data to QuickBooks.
      const result = await this.quickBooksService.syncDataToQuickBooks(eventsAirData);

      res.status(200).json({ success: true, result });
    } catch (error) {
      console.error('Error syncing data to QuickBooks:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }
}

module.exports = QuickBooksController;
