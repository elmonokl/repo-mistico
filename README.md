# Portafolio Personal

Portafolio web desarrollado con Node.js, Express y MongoDB.

## Instalación Rápida

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar MongoDB (opcional: crear archivo .env)
# MONGODB_HOST=localhost
# MONGODB_PORT=27017
# MONGODB_DATABASE=portafolio_db
# PORT=3001

# 3. Inicializar datos de ejemplo
npm run init-data

# 4. Iniciar servidor
npm run dev
```

Accede a: **http://localhost:3001**

## MongoDB Compass

Conecta usando: `mongodb://localhost:27017` y selecciona la base de datos `portafolio_db`.

## Scripts

- `npm start` - Modo producción
- `npm run dev` - Modo desarrollo
- `npm run init-data` - Inicializar datos

## Estructura

- `front/` - Frontend (HTML, CSS, JS)
- `back/` - Backend (Node.js/Express/MongoDB)
- `back/config/` - Configuración MongoDB
- `back/routes/api.js` - Endpoints API

## API Endpoints

- `GET /api/personal` - Datos personales
- `GET /api/proyectos` - Proyectos
- `GET /api/experiencia` - Experiencia
- `GET /api/servicios` - Servicios
- `GET /api/certificaciones` - Certificaciones
- `GET /api/curriculum` - Curriculum
- `GET /api/carta` - Carta de presentación

## Requisitos

Node.js 16+, MongoDB 4.0+
