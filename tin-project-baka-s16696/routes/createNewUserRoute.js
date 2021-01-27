const express = require('express');
const router = express.Router();

const mechanicController = require('../controllers/mechanicController');

router.get('/add',mechanicController.showMechanicFormUser);
router.post('/add',mechanicController.addEmployeeUser);

module.exports=router;