const express = require('express');
const router = express.Router();

const repairController = require('../controllers/repairController');

router.get('/', repairController.showRepairList);
router.get('/add',repairController.showRepairForm);
router.post('/add',repairController.addRepair);
router.get('/details/:repairId',repairController.showRepairInfo);
router.get('/edit/:repairId',repairController.showRepairEdit);
router.post('/edit/:repairId',repairController.updateRepairEdit);
router.get('/delete/:repairId',repairController.deleteRepair);

module.exports=router;