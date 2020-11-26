const express = require('express');
const router = express.Router();

const mechanicController = require('../controllers/mechanicController');

router.get('/', mechanicController.showMechanicList);
router.get('/add',mechanicController.showMechanicForm);
router.get('/details/:mechanicId',mechanicController.showMechanicInfo);
router.get('/edit/:mechanicId',mechanicController.showMechanicEdit);

module.exports=router;