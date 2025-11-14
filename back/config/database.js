/**
 * Configuración de conexión a MongoDB
 */

const { MongoClient } = require('mongodb');
require('dotenv').config();

// Configuración de MongoDB
const MONGODB_HOST = process.env.MONGODB_HOST || 'localhost';
const MONGODB_PORT = process.env.MONGODB_PORT || 27017;
const MONGODB_DATABASE = process.env.MONGODB_DATABASE || 'portafolio_db';
const MONGODB_USER = process.env.MONGODB_USER || '';
const MONGODB_PASS = process.env.MONGODB_PASS || '';

// Construir cadena de conexión
let connectionString = `mongodb://${MONGODB_HOST}:${MONGODB_PORT}`;

if (MONGODB_USER && MONGODB_PASS) {
    connectionString = `mongodb://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_HOST}:${MONGODB_PORT}`;
}

let client = null;
let db = null;

/**
 * Conecta a MongoDB
 * @returns {Promise<MongoClient>}
 */
async function connectMongo() {
    try {
        if (!client) {
            client = new MongoClient(connectionString);
            await client.connect();
            console.log('Conectado a MongoDB');
        }
        return client;
    } catch (error) {
        console.error('Error de conexión a MongoDB:', error.message);
        throw error;
    }
}

/**
 * Obtiene la base de datos
 * @returns {Promise<MongoDB.Db>}
 */
async function getDatabase() {
    try {
        if (!db) {
            const client = await connectMongo();
            db = client.db(MONGODB_DATABASE);
        }
        return db;
    } catch (error) {
        console.error('Error al obtener la base de datos:', error.message);
        throw error;
    }
}

/**
 * Cierra la conexión a MongoDB
 */
async function closeConnection() {
    if (client) {
        await client.close();
        client = null;
        db = null;
        console.log('Conexión a MongoDB cerrada');
    }
}

module.exports = {
    connectMongo,
    getDatabase,
    closeConnection,
    MONGODB_DATABASE
};

