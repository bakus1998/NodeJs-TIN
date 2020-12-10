const express = require('express');
const router = express.Router();

const mechanicController = require('../../api/MechanicApi');

router.get('/', mechanicController.getMechanics);
router.delete('/:mechanicId', mechanicController.deleteMechanic);
router.post('/', mechanicController.createMechanic);
router.get('/:mechanicId',mechanicController.getMechanicById);
router.put('/:mechanicId', mechanicController.updateMechanic);

module.exports = router;