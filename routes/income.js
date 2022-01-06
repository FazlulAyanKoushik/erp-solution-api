// Main Module Required..
const express = require('express');

// Created Require Files..
const controller = require('../controller/income');

const router = express.Router();

/**
 * /income
 * http://localhost:3000/api/income
 */


router.post('/add-income', controller.addIncome);
router.get('/get-all-incomes', controller.getAllIncomes);
router.get('/get-income-by-income-id/:incomeId', controller.getIncomeByIncomeId);
router.get('/get-single-income-by-slug/:slug', controller.getSingleIncomeBySlug);
router.put('/edit-income-by-income', controller.editIncomeData);
router.delete('/delete-income-by-id/:incomeId', controller.deleteIncomeByIncomeId);

// Export All router..
module.exports = router;