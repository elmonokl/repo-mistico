/**
 * Helper para manejo de rutas y errores
 */

/**
 * Wrapper para manejar errores en rutas asíncronas
 * @param {Function} handler - Función handler de la ruta
 * @param {string} errorMessage - Mensaje de error personalizado
 * @returns {Function} - Handler de Express
 */
function asyncHandler(handler, errorMessage = 'Error en la solicitud') {
    return async (req, res, next) => {
        try {
            await handler(req, res, next);
        } catch (error) {
            console.error(`${errorMessage}:`, error);
            res.status(500).json({
                success: false,
                message: errorMessage,
                error: error.message
            });
        }
    };
}

/**
 * Helper para respuestas exitosas GET
 * @param {Function} dataFn - Función que retorna los datos
 * @param {string} errorMessage - Mensaje de error
 * @returns {Function} - Handler de Express
 */
function getHandler(dataFn, errorMessage) {
    return asyncHandler(async (req, res) => {
        const data = await dataFn();
        res.json({ success: true, data });
    }, errorMessage);
}

/**
 * Helper para respuestas exitosas PUT/POST/DELETE
 * @param {Function} actionFn - Función que realiza la acción
 * @param {string} successMessage - Mensaje de éxito
 * @param {string} errorMessage - Mensaje de error
 * @returns {Function} - Handler de Express
 */
function actionHandler(actionFn, successMessage, errorMessage) {
    return asyncHandler(async (req, res) => {
        const result = await actionFn(req);
        res.json({
            success: true,
            message: successMessage,
            data: result
        });
    }, errorMessage);
}

module.exports = {
    asyncHandler,
    getHandler,
    actionHandler
};

