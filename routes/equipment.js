// Main Module Required..
const express = require('express');

// Created Require Files..
const controller = require('../controller/equipment');

const router = express.Router();

/**
 * /equipment
 * http://localhost:3000/api/equipment
 */


router.post('/add-equipment', controller.addEquipment);
router.get('/get-all-equipments', controller.getAllEquipments);
router.get('/get-equipment-by-equipment-id/:equipmentId', controller.getEquipmentByEquipmentId);
router.get('/get-single-equipment-by-slug/:slug', controller.getSingleEquipmentBySlug);
router.put('/edit-equipment-by-equipment', controller.editEquipmentData);
router.delete('/delete-equipment-by-id/:equipmentId', controller.deleteEquipmentByEquipmentId);

// Export All router..
module.exports = router;