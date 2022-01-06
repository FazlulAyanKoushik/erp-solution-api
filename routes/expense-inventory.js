// Main Module Required..
const express = require('express');

// Created Require Files..
const controller = require('../controller/expense-inventory');

const router = express.Router();

/**
 * /expense-inventory
 * http://localhost:3000/api/expense-inventory
 */


router.post('/add-expense-inventory', controller.addExpenseInventory);
router.get('/get-all-expense-inventory', controller.getAllExpenseInventorys);
router.get('/get-expense-inventory-by-expense-inventory-id/:expenseInventoryId', controller.getExpenseInventoryByExpenseInventoryId);
router.get('/get-single-expense-inventory-by-slug/:slug', controller.getSingleExpenseInventoryBySlug);
router.put('/edit-expense-inventory-by-expense-inventory', controller.editExpenseInventoryData);
router.delete('/delete-expense-inventory-by-id/:expenseInventoryId', controller.deleteExpenseInventoryByExpenseInventoryId);

// Export All router..
module.exports = router;