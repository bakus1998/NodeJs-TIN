const express = require('express');
const router = express.Router();

const carController = require('../controllers/carController');

router.get('/', carController.showCarList);
router.get('/add',carController.showCarForm);
router.post('/add',carController.addCar);
router.get('/details/:carId',carController.showCarInfo);
router.get('/edit/:carId',carController.showCarEdit);
router.post('/edit',carController.updateCarEdit);
router.get('/delete/:carId',carController.deleteMechanic);


module.exports=router;