require('dotenv').config();
const axios = require('axios');
const difusionRepository = require('../repositories/difusionRepository');

exports.getDifusion = async () => {
    const data = await difusionRepository.getDifusion();
    return data;
};

//Devuelve arreglo de tipo destinatario[] de una campaña
exports.getDetalleDifusion = async (idCampana) => {
    try {
        const destinatarios = await obtenerDestinatarios();
        const difusion = await difusionRepository.getDetalleDifusion(idCampana);

        const destinatariosFiltrados = destinatarios.filter(dest => difusion.some(dif => dest.rut === dif.rut)
        );

        return destinatariosFiltrados;

    } catch (error) {
        console.error('Error al obtener detalles de la difusión:', error);
        throw error;
    }
};

async function obtenerDestinatarios() {
    try {
        const response = await axios.get('http://service-gest-dest:3000/getDest');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los destinatarios:', error);
        throw error;
    }
}

exports.crearDifusion = async (ruts, idCampana) => {
    const resultados = [];

    for (const rut of ruts) {
        const difusion = { "rut": rut, "id_campana": idCampana };
        try {
            const data = await difusionRepository.crearDifusion(difusion);
            if (data) {
                crearEnvio(data)
                resultados.push(data);
            }
        } catch (error) {
            console.error('Error al crear difusión:', error);
        }
    }
    return resultados;
};

exports.deleteDifusion = async (rut, idCampana) => {
    const data = await difusionRepository.deleteDifusion(rut, idCampana);
    return data;
};

//Devuelve arreglo de objetos de tipo difusion[] de una campaña (id_difusion, rut destinatario, id_campaña)
exports.getDestDifusion = async (idCampana) => {
    const data = await difusionRepository.getDetalleDifusion(idCampana);
    return data;
}

async function crearEnvio(idDif) {
    try {
        const response = await axios.post('http://service-env-email:3002/createEnv/' + idDif);
        return response.data;
    } catch (error) {
        console.error('error al crear envios desde difusion:', error);
        throw error;
    }
}