// Main Module Required..
const express = require('express');

// Created Require Files..
const controller = require('../controller/equity');

const router = express.Router();

/**
 * /equity
 * http://localhost:3000/api/equity
 */


router.post('/add-equity', controller.addEquity);
router.get('/get-all-equitys', controller.getAllEquitys);
router.get('/get-equity-by-equity-id/:equityId', controller.getEquityByEquityId);
router.get('/get-single-equity-by-slug/:slug', controller.getSingleEquityBySlug);
router.put('/edit-equity-by-equity', controller.editEquityData);
router.delete('/delete-equity-by-id/:equityId', controller.deleteEquityByEquityId);

// Export All router..
module.exports = router;