// Main Module Required..
const express = require('express');

// Created Require Files..
const controller = require('../controller/payment-method');

const router = express.Router();

/**
 * /payment-method
 * http://localhost:3000/api/payment-method
 */


router.post('/add-payment-method', controller.addPaymentMethod);
router.get('/get-all-payment-method', controller.getAllPaymentMethods);
router.get('/get-payment-method-by-payment-method-id/:paymentMethodId', controller.getPaymentMethodByPaymentMethodId);
router.get('/get-single-payment-method-by-slug/:slug', controller.getSinglePaymentMethodBySlug);
router.put('/edit-payment-method-by-payment-method', controller.editPaymentMethodData);
router.delete('/delete-payment-method-by-id/:paymentMethodId', controller.deletePaymentMethodByPaymentMethodId);

// Export All router..
module.exports = router;