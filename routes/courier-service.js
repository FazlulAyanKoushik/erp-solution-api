// Main Module Required..
const express = require('express');

// Created Require Files..
const controller = require('../controller/courier-service');

const router = express.Router();

/**
 * /courier-service
 * http://localhost:3000/api/courier-service
 */


router.post('/add-courier-service', controller.addCourierService);
router.get('/get-all-courier-services', controller.getAllCourierServices);
router.get('/get-courier-service-by-courier-service-id/:courier-serviceId', controller.getCourierServiceByCourierServiceId);
router.get('/get-single-courier-service-by-slug/:slug', controller.getSingleCourierServiceBySlug);
router.put('/edit-courier-service-by-courier-service', controller.editCourierServiceData);
router.delete('/delete-courier-service-by-id/:courier-serviceId', controller.deleteCourierServiceByCourierServiceId);

// Export All router..
module.exports = router;