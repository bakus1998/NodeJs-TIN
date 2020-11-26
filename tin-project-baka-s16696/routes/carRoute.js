const express = require('express');
const router = express.Router();

const carController = require('../controllers/carController');

router.get('/', carController.showCarList);
router.get('/add',carController.showCarForm);
router.get('/details/:carId',carController.showCarInfo);
router.get('/edit/:carId',carController.showCarEdit);

module.exports=router;