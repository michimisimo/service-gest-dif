const express = require('express');
const difusionController = require('../controllers/difusionController');

const router = express.Router();

// Rutas para destinatarios
router.get('/getDif', difusionController.getDifusion);
router.get('/getDetDif/:idCampana', difusionController.getDetalleDifusion);
router.post('/createDif/:idCampana', difusionController.crearDifusion);
router.put('/delDif/:idCampana', difusionController.deleteDifusion);
router.get('/getDestDif/:idCampana', difusionController.getDestDifusion);

module.exports = router;
