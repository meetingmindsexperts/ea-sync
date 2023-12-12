// routes/quickbooks.route.js
const express = require('express');
const QuickBooksController = require('../controllers/quickbooks.controller');

const router = express.Router();
const quickBooksController = new QuickBooksController();

router.post('/sync', quickBooksController.syncData);

module.exports = router;
