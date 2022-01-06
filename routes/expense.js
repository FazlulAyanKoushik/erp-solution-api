// Main Module Required..
const express = require('express');

// Created Require Files..
const controller = require('../controller/expense');

const router = express.Router();

/**
 * /expense
 * http://localhost:3000/api/expense
 */


router.post('/add-expense', controller.addExpense);
router.get('/get-all-expenses', controller.getAllExpenses);
router.get('/get-expense-by-expense-id/:expenseId', controller.getExpenseByExpenseId);
router.get('/get-single-expense-by-slug/:slug', controller.getSingleExpenseBySlug);
router.put('/edit-expense-by-expense', controller.editExpenseData);
router.delete('/delete-expense-by-id/:expenseId', controller.deleteExpenseByExpenseId);

// Export All router..
module.exports = router;