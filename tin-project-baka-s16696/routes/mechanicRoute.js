const express = require('express');
const router = express.Router();

const mechanicController = require('../controllers/mechanicController');

router.get('/', mechanicController.showMechanicList);
router.get('/add',mechanicController.showMechanicForm);
router.post('/add',mechanicController.addEmployee);
router.get('/details/:mechanicId',mechanicController.showMechanicInfo);
router.get('/edit/:mechanicId',mechanicController.showMechanicEdit);
router.post('/edit',mechanicController.updateMechanicEdit);
router.get('/delete/:mechanicId',mechanicController.deleteMechanic);

module.exports=router;