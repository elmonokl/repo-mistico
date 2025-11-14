/**
 * Rutas de la API REST
 */

const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { getDatabase } = require('../config/database');
const upload = require('../middleware/upload');
const { getHandler, actionHandler } = require('../utils/routeHandler');
const { 
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
} = require('../controllers/portfolioController');

/**
 * GET /api/personal
 * Obtiene los datos personales
 */
router.get('/personal', getHandler(getPersonalData, 'Error al obtener datos personales'));

/**
 * GET /api/proyectos
 * Obtiene todos los proyectos
 */
router.get('/proyectos', getHandler(getProyectos, 'Error al obtener proyectos'));

/**
 * GET /api/experiencia
 * Obtiene la experiencia profesional
 */
router.get('/experiencia', getHandler(getExperiencia, 'Error al obtener experiencia'));

/**
 * GET /api/servicios
 * Obtiene los servicios ofrecidos
 */
router.get('/servicios', getHandler(getServicios, 'Error al obtener servicios'));

/**
 * GET /api/certificaciones
 * Obtiene las certificaciones y reconocimientos
 */
router.get('/certificaciones', getHandler(getCertificaciones, 'Error al obtener certificaciones'));

/**
 * GET /api/curriculum
 * Obtiene el curriculum vitae
 */
router.get('/curriculum', getHandler(getCurriculum, 'Error al obtener curriculum'));

/**
 * GET /api/carta
 * Obtiene la carta de presentación
 */
router.get('/carta', getHandler(getCarta, 'Error al obtener carta de presentación'));

/**
 * POST /api/curriculum/upload
 * Sube un archivo CV en PDF
 */
router.post('/curriculum/upload', upload.single('cv'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No se proporcionó ningún archivo'
            });
        }

        const db = await getDatabase();
        const collection = db.collection('curriculum');
        const filePath = `assets/documents/${req.file.filename}`;
        
        await collection.updateOne(
            {},
            {
                $set: {
                    url_cv_pdf: filePath,
                    fecha_actualizacion: new Date()
                }
            },
            { upsert: true }
        );
        
        res.json({
            success: true,
            message: 'CV subido exitosamente',
            file: {
                filename: req.file.filename,
                path: filePath,
                size: req.file.size
            }
        });
    } catch (error) {
        console.error('Error al subir CV:', error);
        res.status(500).json({
            success: false,
            message: 'Error al subir el archivo',
            error: error.message
        });
    }
});

/**
 * GET /api/curriculum/view
 * Visualiza el CV en el navegador
 */
router.get('/curriculum/view', async (req, res) => {
    try {
        const db = await getDatabase();
        const collection = db.collection('curriculum');
        const curriculum = await collection.findOne({});
        
        if (!curriculum?.url_cv_pdf) {
            return res.status(404).json({
                success: false,
                message: 'No hay CV disponible'
            });
        }
        
        const filePath = path.join(__dirname, '../../front', curriculum.url_cv_pdf);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                success: false,
                message: 'Archivo CV no encontrado'
            });
        }
        
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="cv-alvaro-guevara.pdf"');
        res.sendFile(filePath);
    } catch (error) {
        console.error('Error al visualizar CV:', error);
        res.status(500).json({
            success: false,
            message: 'Error al visualizar el CV',
            error: error.message
        });
    }
});

/**
 * PUT /api/personal
 * Actualiza los datos personales
 */
router.put('/personal', actionHandler(
    (req) => updatePersonalData(req.body),
    'Datos personales actualizados correctamente',
    'Error al actualizar datos personales'
));

/**
 * PUT /api/proyectos/:id
 * Actualiza un proyecto
 */
router.put('/proyectos/:id', actionHandler(
    (req) => updateProyecto(req.params.id, req.body),
    'Proyecto actualizado correctamente',
    'Error al actualizar proyecto'
));

/**
 * POST /api/proyectos
 * Crea un nuevo proyecto
 */
router.post('/proyectos', actionHandler(
    (req) => createProyecto(req.body),
    'Proyecto creado correctamente',
    'Error al crear proyecto'
));

/**
 * DELETE /api/proyectos/:id
 * Elimina un proyecto
 */
router.delete('/proyectos/:id', actionHandler(
    (req) => deleteProyecto(req.params.id),
    'Proyecto eliminado correctamente',
    'Error al eliminar proyecto'
));

/**
 * PUT /api/experiencia/:id
 * Actualiza una experiencia
 */
router.put('/experiencia/:id', actionHandler(
    (req) => updateExperiencia(req.params.id, req.body),
    'Experiencia actualizada correctamente',
    'Error al actualizar experiencia'
));

/**
 * POST /api/experiencia
 * Crea una nueva experiencia
 */
router.post('/experiencia', actionHandler(
    (req) => createExperiencia(req.body),
    'Experiencia creada correctamente',
    'Error al crear experiencia'
));

/**
 * DELETE /api/experiencia/:id
 * Elimina una experiencia
 */
router.delete('/experiencia/:id', actionHandler(
    (req) => deleteExperiencia(req.params.id),
    'Experiencia eliminada correctamente',
    'Error al eliminar experiencia'
));

/**
 * PUT /api/servicios/:id
 * Actualiza un servicio
 */
router.put('/servicios/:id', actionHandler(
    (req) => updateServicio(req.params.id, req.body),
    'Servicio actualizado correctamente',
    'Error al actualizar servicio'
));

/**
 * PUT /api/certificaciones/:id
 * Actualiza una certificación
 */
router.put('/certificaciones/:id', actionHandler(
    (req) => updateCertificacion(req.params.id, req.body),
    'Certificación actualizada correctamente',
    'Error al actualizar certificación'
));

/**
 * PUT /api/curriculum
 * Actualiza el curriculum
 */
router.put('/curriculum', actionHandler(
    (req) => updateCurriculum(req.body),
    'Curriculum actualizado correctamente',
    'Error al actualizar curriculum'
));

/**
 * PUT /api/carta
 * Actualiza la carta de presentación
 */
router.put('/carta', actionHandler(
    (req) => updateCarta(req.body),
    'Carta de presentación actualizada correctamente',
    'Error al actualizar carta'
));

/**
 * POST /api/contacto
 * Envía un mensaje de contacto
 */
router.post('/contacto', async (req, res) => {
    try {
        const { nombre, email, asunto, mensaje } = req.body;
        
        if (!nombre || !email || !asunto || !mensaje) {
            return res.status(400).json({
                success: false,
                message: 'Todos los campos son requeridos'
            });
        }
        
        // Aquí puedes agregar lógica para guardar en MongoDB o enviar email
        res.json({
            success: true,
            message: 'Mensaje recibido correctamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al procesar el mensaje',
            error: error.message
        });
    }
});

module.exports = router;

