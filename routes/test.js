const express = require('express');

// Created Require Files..
const controller = require('../controller/test');

// Get Express Router Function..
const router = express.Router();

/**
 * /api/test
 * http://localhost:3000/api/test
 */
router.get('/get-array-field-pagination', controller.getArrayFieldData);
router.post('/remove-array-field-data', controller.removeArrayFieldData);
router.post('/add-dummy-data', controller.addTenKDummyData);
router.get('/get-explain-query', controller.getExplainQuery);
router.get('/get-text-query', controller.getSearchByText);

// Export All router..
module.exports = router;
