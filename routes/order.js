const express = require('express');

// Imports
const controller = require('../controller/order');
const checkAuth = require('../middileware/check-user-auth');
const checkAdminAuth = require('../middileware/check-admin-auth');

// Get Express Router Function..
const router = express.Router();

/**
 * /api/order
 * http://localhost:3000/api/order
 */

// USER

router.post('/place-order', checkAuth, controller.placeOrder);
router.get('/get-all-orders-by-user', checkAuth, controller.getAllOrdersByUser);
router.get('/get-order-details/:id', controller.getOrderDetailsById);
router.get('/get-all-transactions-by-user', checkAuth, controller.getAllTransactionByUser);
router.get("/get-single-order-by-user/:orderId", checkAuth, controller.getSingleOrderByUser);
router.get("/get-single-order-by-user-admin/:orderId", checkAdminAuth, controller.getSingleOrderByUser);
router.put('/cancel-order-by-user/:orderId', checkAuth, controller.cancelOrderByUser);


// ADMIN

router.get("/get-single-order-by-admin/:orderId", checkAdminAuth, controller.getSingleOrderByAdmin);
router.post('/get-all-orders-by-admin', checkAdminAuth, controller.getAllOrdersByAdmin);
router.get('/get-all-transaction-by-admin', checkAdminAuth, controller.getAllTransactionByAdmin);
router.get("/get-all-orders-by-userId/:userId", checkAdminAuth, controller.getUserOrdersByAmin);
router.get('/get-all-canceled-orders', checkAdminAuth, controller.getAllCanceledOrdersByAdmin);
router.get('/get-all-orders-by-admin-no-paginate', checkAdminAuth, controller.getAllOrdersByAdminNoPaginate);
router.put('/change-order-status', checkAdminAuth, controller.changeDeliveryStatus);
router.delete('/delete-order-by-admin/:orderId', checkAdminAuth, controller.deleteOrderByAdmin);
router.post('/get-orders-by-filter-data/:deliveryStatus', checkAdminAuth, controller.filterByDynamicFilters);
router.post('/get-orders-by-date-range-data/:startDate/:endDate', checkAdminAuth, controller.filterByDateRange);


// Export router class..
module.exports = router;
