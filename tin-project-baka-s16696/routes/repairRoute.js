const express = require('express');
const router = express.Router();

const repairController = require('../controllers/repairController');

router.get('/', repairController.showRepairList);
router.get('/add',repairController.showRepairForm);
router.get('/details/:idrepair',repairController.showRepairInfo);
router.get('/edit/:idrepair',repairController.showRepairEdit);

module.exports=router;