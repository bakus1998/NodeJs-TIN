const express = require('express');
const router = express.Router();

const carController = require('../../api/carAPI');


router.get('/', carController.getCars);
router.delete('/:carId', carController.deleteCar);
router.post('/', carController.createCar);
router.get('/:carId',carController.getCarById);
router.put('/:carId', carController.updateCar);


module.exports = router;