/**
 * Controladores para el portafolio
 */

const { getDatabase } = require('../config/database');
const { ObjectId } = require('mongodb');

/**
 * Helper para obtener una colección
 */
async function getCollection(collectionName) {
    const db = await getDatabase();
    return db.collection(collectionName);
}

/**
 * Helper para convertir string ID a ObjectId
 */
function toObjectId(id) {
    return new ObjectId(id);
}

/**
 * Obtiene los datos personales desde MongoDB
 * @returns {Promise<Object>}
 */
async function getPersonalData() {
    const collection = await getCollection('personal');
    const data = await collection.findOne({});
    return data || {};
}

/**
 * Obtiene los proyectos desde MongoDB
 * @returns {Promise<Array>}
 */
async function getProyectos() {
    const collection = await getCollection('proyectos');
    return await collection.find({}).sort({ fecha: -1 }).toArray();
}

/**
 * Obtiene la experiencia profesional desde MongoDB
 * @returns {Promise<Array>}
 */
async function getExperiencia() {
    const collection = await getCollection('experiencia');
    return await collection.find({}).sort({ fecha_inicio: -1 }).toArray();
}

/**
 * Obtiene los servicios desde MongoDB
 * @returns {Promise<Array>}
 */
async function getServicios() {
    const collection = await getCollection('servicios');
    return await collection.find({}).toArray();
}

/**
 * Obtiene las certificaciones desde MongoDB
 * @returns {Promise<Array>}
 */
async function getCertificaciones() {
    const collection = await getCollection('certificaciones');
    return await collection.find({}).sort({ fecha: -1 }).toArray();
}

/**
 * Obtiene el curriculum desde MongoDB
 * @returns {Promise<Object>}
 */
async function getCurriculum() {
    const collection = await getCollection('curriculum');
    const curriculum = await collection.findOne({});
    return curriculum || {};
}

/**
 * Obtiene la carta de presentación desde MongoDB
 * @returns {Promise<Object>}
 */
async function getCarta() {
    const collection = await getCollection('carta');
    const carta = await collection.findOne({});
    return carta || {};
}

/**
 * Actualiza los datos personales en MongoDB
 * @param {Object} data - Datos a actualizar
 * @returns {Promise<Object>}
 */
async function updatePersonalData(data) {
    const collection = await getCollection('personal');
    data.fecha_actualizacion = new Date();
    return await collection.updateOne({}, { $set: data }, { upsert: true });
}

/**
 * Actualiza un proyecto en MongoDB
 * @param {string} id - ID del proyecto
 * @param {Object} data - Datos a actualizar
 * @returns {Promise<Object>}
 */
async function updateProyecto(id, data) {
    const collection = await getCollection('proyectos');
    return await collection.updateOne({ _id: toObjectId(id) }, { $set: data });
}

/**
 * Crea un nuevo proyecto en MongoDB
 * @param {Object} data - Datos del proyecto
 * @returns {Promise<Object>}
 */
async function createProyecto(data) {
    const collection = await getCollection('proyectos');
    if (!data.fecha) {
        data.fecha = new Date();
    }
    return await collection.insertOne(data);
}

/**
 * Elimina un proyecto de MongoDB
 * @param {string} id - ID del proyecto
 * @returns {Promise<Object>}
 */
async function deleteProyecto(id) {
    const collection = await getCollection('proyectos');
    return await collection.deleteOne({ _id: toObjectId(id) });
}

/**
 * Actualiza la experiencia profesional en MongoDB
 * @param {string} id - ID de la experiencia
 * @param {Object} data - Datos a actualizar
 * @returns {Promise<Object>}
 */
async function updateExperiencia(id, data) {
    const collection = await getCollection('experiencia');
    return await collection.updateOne({ _id: toObjectId(id) }, { $set: data });
}

/**
 * Crea una nueva experiencia en MongoDB
 * @param {Object} data - Datos de la experiencia
 * @returns {Promise<Object>}
 */
async function createExperiencia(data) {
    const collection = await getCollection('experiencia');
    return await collection.insertOne(data);
}

/**
 * Elimina una experiencia de MongoDB
 * @param {string} id - ID de la experiencia
 * @returns {Promise<Object>}
 */
async function deleteExperiencia(id) {
    const collection = await getCollection('experiencia');
    return await collection.deleteOne({ _id: toObjectId(id) });
}

/**
 * Actualiza un servicio en MongoDB
 * @param {string} id - ID del servicio
 * @param {Object} data - Datos a actualizar
 * @returns {Promise<Object>}
 */
async function updateServicio(id, data) {
    const collection = await getCollection('servicios');
    return await collection.updateOne({ _id: toObjectId(id) }, { $set: data });
}

/**
 * Actualiza una certificación en MongoDB
 * @param {string} id - ID de la certificación
 * @param {Object} data - Datos a actualizar
 * @returns {Promise<Object>}
 */
async function updateCertificacion(id, data) {
    const collection = await getCollection('certificaciones');
    return await collection.updateOne({ _id: toObjectId(id) }, { $set: data });
}

/**
 * Actualiza el curriculum en MongoDB
 * @param {Object} data - Datos a actualizar
 * @returns {Promise<Object>}
 */
async function updateCurriculum(data) {
    const collection = await getCollection('curriculum');
    data.fecha_actualizacion = new Date();
    return await collection.updateOne({}, { $set: data }, { upsert: true });
}

/**
 * Actualiza la carta de presentación en MongoDB
 * @param {Object} data - Datos a actualizar
 * @returns {Promise<Object>}
 */
async function updateCarta(data) {
    const collection = await getCollection('carta');
    data.fecha_actualizacion = new Date();
    return await collection.updateOne({}, { $set: data }, { upsert: true });
}

module.exports = {
    getPersonalData,
    getProyectos,
    getExperiencia,
    getServicios,
    getCertificaciones,
    getCurriculum,
    getCarta,
    updatePersonalData,
    updateProyecto,
    createProyecto,
    deleteProyecto,
    updateExperiencia,
    createExperiencia,
    deleteExperiencia,
    updateServicio,
    updateCertificacion,
    updateCurriculum,
    updateCarta
};

