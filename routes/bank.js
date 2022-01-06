// Main Module Required..
const express = require('express');

// Created Require Files..
const controller = require('../controller/bank');

const router = express.Router();

/**
 * /bank
 * http://localhost:3000/api/bank
 */


router.post('/add-bank', controller.addBank);
router.get('/get-all-banks', controller.getAllBanks);
router.get('/get-bank-by-bank-id/:bankId', controller.getBankByBankId);
router.get('/get-single-bank-by-slug/:slug', controller.getSingleBankBySlug);
router.put('/edit-bank-by-bank', controller.editBankData);
router.delete('/delete-bank-by-id/:bankId', controller.deleteBankByBankId);

// Export All router..
module.exports = router;