// Main Module Required..
const express = require('express');

// Created Require Files..
const controller = require('../controller/revenue');

const router = express.Router();

/**
 * /revenue
 * http://localhost:3000/api/revenue
 */


router.post('/add-revenue', controller.addRevenue);
router.get('/get-all-revenues', controller.getAllRevenues);
router.get('/get-revenue-by-revenue-id/:revenueId', controller.getRevenueByRevenueId);
router.get('/get-single-revenue-by-slug/:slug', controller.getSingleRevenueBySlug);
router.put('/edit-revenue-by-revenue', controller.editRevenueData);
router.delete('/delete-revenue-by-id/:revenueId', controller.deleteRevenueByRevenueId);

// Export All router..
module.exports = router;