const difusionService = require('../services/difusionService');

exports.getDifusion = async (req, res) => {
    try {
        const data = await difusionService.getDifusion();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getDetalleDifusion = async (req, res) => {
    const { idCampana } = req.params;
    try {
        const data = await difusionService.getDetalleDifusion(idCampana);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.crearDifusion = async (req, res) => {
    const { idCampana } = req.params;
    const { ruts } = req.body;
    try {
        const data = await difusionService.crearDifusion(ruts, idCampana)
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteDifusion = async (req, res) => {
    const { idCampana } = req.params;
    const { rut } = req.body;
    try {
        const data = await difusionService.deleteDifusion(rut, idCampana)
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
