// Main Module Required..
const express = require('express');

// Created Require Files..
const controller = require('../controller/mobile-bank');

const router = express.Router();

/**
 * /mobile-bank
 * http://localhost:3000/api/mobile-bank
 */


router.post('/add-mobile-bank', controller.addMobileBank);
router.get('/get-all-mobile-banks', controller.getAllMobileBanks);
router.get('/get-mobile-bank-by-mobile-bank-id/:mobileBankId', controller.getMobileBankByMobileBankId);
router.get('/get-single-mobile-bank-by-slug/:slug', controller.getSingleMobileBankBySlug);
router.put('/edit-mobile-bank-by-mobile-bank', controller.editMobileBankData);
router.delete('/delete-mobile-bank-by-id/:mobileBankId', controller.deleteMobileBankByMobileBankId);

// Export All router..
module.exports = router;