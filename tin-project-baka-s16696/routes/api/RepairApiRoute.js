const express = require('express');
const router = express.Router();

const repairController = require('../../api/repairApi');

router.get('/', repairController.getRepairs);
router.delete('/:repairId', repairController.deleteRepair);
router.get('/:repairId',repairController.getRepairById);
router.put('/:repairId', repairController.updateRepair);

module.exports = router;