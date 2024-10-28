const express = require('express');
const difusionController = require('../controllers/difusionController');

const router = express.Router();

// Rutas para destinatarios
router.get('/getDif', difusionController.getDifusion);
router.get('/getDetDif/:idCampana', difusionController.getDetalleDifusion);
router.post('/CrearDif/:idCampana', difusionController.crearDifusion);
router.put('/delDif/:idCampana', difusionController.deleteDifusion);

module.exports = router;
