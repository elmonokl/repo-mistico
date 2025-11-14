# Portafolio Personal

Portafolio web profesional desarrollado con Node.js, Express y MongoDB. Sistema completo de gestión de portafolio con interfaz moderna y paleta de colores pastel.

## 🚀 Características

- **Frontend moderno**: HTML5, CSS3 con diseño responsive y paleta de colores pastel
- **Backend robusto**: API REST con Node.js y Express
- **Base de datos**: MongoDB para almacenamiento de datos
- **Secciones**: Perfil, Proyectos, Experiencia, Certificaciones, CV y Carta de Presentación
- **Gestión de archivos**: Subida y visualización de CV en PDF
- **Interfaz editable**: Sistema de edición en línea para actualizar información

## 🛠️ Tecnologías

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Base de datos**: MongoDB, Mongoose
- **Estilos**: CSS Variables, Gradientes, Animaciones

## 📦 Instalación

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

## 📁 Estructura del Proyecto

```
├── front/                 # Frontend
│   ├── assets/
│   │   ├── css/          # Estilos (paleta pastel)
│   │   ├── js/           # JavaScript (portfolio.js, edit.js, main.js)
│   │   └── images/       # Imágenes
│   └── index.html        # Página principal
├── back/                  # Backend
│   ├── config/           # Configuración MongoDB
│   ├── controllers/      # Controladores
│   ├── routes/           # Rutas API
│   ├── middleware/       # Middleware (upload)
│   └── utils/            # Utilidades
└── README.md
```

## 🔌 API Endpoints

- `GET /api/personal` - Datos personales
- `PUT /api/personal` - Actualizar datos personales
- `GET /api/proyectos` - Lista de proyectos
- `GET /api/experiencia` - Experiencia laboral
- `GET /api/servicios` - Servicios ofrecidos
- `GET /api/certificaciones` - Certificaciones
- `GET /api/curriculum` - Curriculum completo
- `POST /api/curriculum/upload` - Subir CV PDF
- `GET /api/carta` - Carta de presentación
- `PUT /api/carta` - Actualizar carta

## 🎨 Paleta de Colores

- **Gris pastel**: `#B8B8B8`
- **Naranja pastel**: `#FFB896`, `#FFC9A8`
- **Celeste pastel**: `#A8D5E2`, `#B8E0ED`

## 📝 Scripts Disponibles

- `npm start` - Modo producción
- `npm run dev` - Modo desarrollo
- `npm run init-data` - Inicializar datos en MongoDB

## 🔧 Requisitos

- Node.js 16+
- MongoDB 4.0+
- MongoDB Compass (opcional, para gestión visual)

## 📄 Licencia

Proyecto personal - Todos los derechos reservados
