/**
 * Script para inicializar datos de ejemplo en MongoDB
 * Ejecutar una vez para crear los datos iniciales
 * 
 * Uso: npm run init-data
 */

const { getDatabase, closeConnection } = require('./database');

async function initData() {
    try {
        const db = await getDatabase();
        
        // Colección de datos personales
        const personalCollection = db.collection('personal');
        
        // Datos personales - Portada Profesional
        const personalData = {
            // Portada Profesional
            nombre: 'Alvaro Ignacio Guevara Godoy',
            titulo: 'Estudiante de Ingeniería en Computación e Informática',
            carrera: 'Ingeniería en Computación e Informática',
            foto: 'assets/images/foto-perfil.jpg', // Opcional
            email: 'l.guevaragodoy@uandresbello.edu',
            telefono: '+56942103929',
            ubicacion: 'Santiago, Chile',
            linkedin: '', // Actualizar con tu LinkedIn si lo tienes
            github: 'https://github.com/elmonokl',
            website: '', // Opcional
            
            // Perfil Profesional
            descripcion: 'Estudiante de cuarto año de Ingeniería en Computación e Informática, actualmente cursando el último semestre de la carrera. Cuento con experiencia en desarrollo de páginas web, manejo de bases de datos y uso de máquinas virtuales. Me considero una persona responsable, adaptable y con gran interés por seguir aprendiendo nuevas tecnologías. Busco seguir creciendo en el área tecnológica, aportando soluciones prácticas y eficientes.',
            habilidades_tecnicas: [
                'Python', 'Java', 'C++', 'C', 'PHP', 'R',
                'HTML', 'CSS', 'JavaScript',
                'MySQL', 'MongoDB',
                'Postman', 'Thunder Client', 'VirtualBox', 'Visual Studio Code', 'Linux',
                'Pandas', 'NumPy', 'Matplotlib'
            ],
            habilidades_blandas: [
                'Desarrollo y mantenimiento de aplicaciones web',
                'Administración de bases de datos relacionales y no relacionales',
                'Virtualización de entornos y administración básica de Linux',
                'Análisis de datos y automatización de tareas',
                'Trabajo en equipo y resolución de problemas',
                'Capacidad para aprender rápidamente nuevas herramientas',
                'Adaptabilidad a distintos entornos tecnológicos'
            ],
            areas_interes: [
                'Desarrollo Web',
                'Bases de Datos',
                'Virtualización',
                'Análisis de Datos',
                'Automatización de Procesos',
                'Ciberseguridad'
            ],
            idiomas: [
                { idioma: 'Inglés', nivel: 'Avanzado' }
            ],
            
            fecha_actualizacion: new Date()
        };
        
        // Eliminar datos existentes e insertar nuevos
        await personalCollection.deleteMany({});
        await personalCollection.insertOne(personalData);
        console.log('Datos personales inicializados');
        
        // Colección de proyectos
        const proyectosCollection = db.collection('proyectos');
        
        // Proyectos de GitHub (https://github.com/elmonokl)
        const proyectos = [
            {
                titulo: 'Safedocs',
                descripcion: 'Aplicación web desarrollada en JavaScript para gestión segura de documentos. Sistema de almacenamiento y organización de documentos con funcionalidades de seguridad.',
                tecnologias: ['JavaScript', 'HTML', 'CSS', 'Node.js'],
                imagen: 'assets/images/proyecto-safedocs.jpg',
                url_demo: '',
                url_repositorio: 'https://github.com/elmonokl/Safedocs',
                fecha: new Date('2024-01-01'),
                categoria: 'Web Development',
                rol: 'Desarrollador Full Stack',
                resultados: 'Sistema de gestión de documentos implementado con funcionalidades de seguridad.',
                caracteristicas: [
                    'Gestión segura de documentos',
                    'Interfaz de usuario intuitiva',
                    'Sistema de almacenamiento organizado'
                ]
            },
            {
                titulo: 'HealthCloud Local',
                descripcion: 'Sistema de gestión de salud desarrollado en JavaScript. Aplicación local para gestión de información de salud y pacientes.',
                tecnologias: ['JavaScript', 'HTML', 'CSS', 'Node.js'],
                imagen: 'assets/images/proyecto-healthcloud.jpg',
                url_demo: '',
                url_repositorio: 'https://github.com/elmonokl/healthcloud-local',
                fecha: new Date('2024-02-01'),
                categoria: 'Web Development',
                rol: 'Desarrollador Full Stack',
                resultados: 'Sistema de gestión de salud funcional para uso local.',
                caracteristicas: [
                    'Gestión de información de salud',
                    'Sistema local funcional',
                    'Interfaz para gestión de pacientes'
                ]
            },
            {
                titulo: 'IBM Project',
                descripcion: 'Proyecto relacionado con tecnologías IBM. Desarrollo de soluciones utilizando herramientas y servicios de IBM Cloud.',
                tecnologias: ['JavaScript', 'Node.js', 'IBM Cloud'],
                imagen: 'assets/images/proyecto-ibm.jpg',
                url_demo: '',
                url_repositorio: 'https://github.com/elmonokl/ibm',
                fecha: new Date('2024-03-01'),
                categoria: 'Cloud Development',
                rol: 'Desarrollador',
                resultados: 'Integración con servicios de IBM Cloud.',
                caracteristicas: [
                    'Integración con IBM Cloud',
                    'Soluciones escalables',
                    'Uso de servicios cloud'
                ]
            },
            {
                titulo: 'Alo Project',
                descripcion: 'Proyecto de desarrollo web. Aplicación o sistema desarrollado como parte del aprendizaje y práctica de desarrollo.',
                tecnologias: ['JavaScript', 'HTML', 'CSS'],
                imagen: 'assets/images/proyecto-alo.jpg',
                url_demo: '',
                url_repositorio: 'https://github.com/elmonokl/alo',
                fecha: new Date('2024-04-01'),
                categoria: 'Web Development',
                rol: 'Desarrollador',
                resultados: 'Proyecto funcional desarrollado para aprendizaje.',
                caracteristicas: [
                    'Desarrollo web moderno',
                    'Práctica de tecnologías',
                    'Código bien estructurado'
                ]
            },
            {
                titulo: 'Prueba Project',
                descripcion: 'Proyecto de prueba y experimentación. Repositorio utilizado para testing y desarrollo de nuevas funcionalidades.',
                tecnologias: ['JavaScript', 'HTML', 'CSS'],
                imagen: 'assets/images/proyecto-prueba.jpg',
                url_demo: '',
                url_repositorio: 'https://github.com/elmonokl/prueba',
                fecha: new Date('2024-05-01'),
                categoria: 'Web Development',
                rol: 'Desarrollador',
                resultados: 'Repositorio de pruebas y experimentación funcional.',
                caracteristicas: [
                    'Testing de funcionalidades',
                    'Experimentación con tecnologías',
                    'Desarrollo iterativo'
                ]
            }
        ];
        
        // Eliminar proyectos existentes e insertar nuevos
        await proyectosCollection.deleteMany({});
        await proyectosCollection.insertMany(proyectos);
        console.log('Proyectos inicializados');
        
        // Colección de experiencia profesional
        const experienciaCollection = db.collection('experiencia');
        const experiencia = [
            {
                tipo: 'practica',
                empresa: 'Servicio Médico Legal (SML)',
                cargo: 'Práctica Profesional I',
                fecha_inicio: new Date('2024-12-01'),
                fecha_fin: new Date('2025-02-28'),
                descripcion: 'Práctica profesional en el Servicio Médico Legal, enfocada en desarrollo web, administración de bases de datos y gestión de infraestructura tecnológica.',
                actividades: [
                    'Desarrollo y mantenimiento de páginas web internas',
                    'Manejo y administración de bases de datos',
                    'Configuración y gestión de máquinas virtuales Linux',
                    'Apoyo en tareas de optimización de procesos tecnológicos'
                ],
                logros: [
                    'Implementación exitosa de mejoras en sistemas web internos',
                    'Optimización de procesos de gestión de datos',
                    'Configuración y mantenimiento de infraestructura virtual'
                ],
                aprendizajes: 'Desarrollo web en entornos corporativos, administración de bases de datos en producción, gestión de infraestructura con máquinas virtuales Linux, y optimización de procesos tecnológicos.'
            }
        ];
        await experienciaCollection.deleteMany({});
        await experienciaCollection.insertMany(experiencia);
        console.log('Experiencia profesional inicializada');
        
        // Colección de servicios
        const serviciosCollection = db.collection('servicios');
        const servicios = [
            {
                titulo: 'Desarrollo Web Full Stack',
                descripcion: 'Diseño y desarrollo de sitios web responsive, aplicaciones web empresariales y sistemas de gestión personalizados.',
                icono: '🌐',
                tecnologias: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express']
            },
            {
                titulo: 'Desarrollo de Aplicaciones Móviles',
                descripcion: 'Apps nativas y multiplataforma con integración de APIs, geolocalización y notificaciones push.',
                icono: '📱',
                tecnologias: ['React Native', 'Flutter', 'APIs', 'Firebase']
            },
            {
                titulo: 'Gestión de Bases de Datos',
                descripcion: 'Diseño y modelado de bases de datos, optimización de consultas SQL y migración de datos.',
                icono: '💾',
                tecnologias: ['MySQL', 'MongoDB', 'SQL', 'PostgreSQL']
            },
            {
                titulo: 'Soporte Técnico TI',
                descripcion: 'Resolución de problemas técnicos, instalación de software y mantenimiento de equipos y sistemas.',
                icono: '🔧',
                tecnologias: ['Windows', 'Linux', 'Redes', 'Hardware']
            },
            {
                titulo: 'Automatización de Procesos',
                descripcion: 'Scripts de automatización, integración de sistemas y optimización de flujos de trabajo.',
                icono: '⚡',
                tecnologias: ['Python', 'Scripts', 'APIs', 'Workflows']
            },
            {
                titulo: 'Análisis y Visualización de Datos',
                descripcion: 'Análisis estadístico, dashboards interactivos, reportes automatizados y Business Intelligence.',
                icono: '📊',
                tecnologias: ['Python', 'SQL', 'Excel', 'Power BI']
            }
        ];
        await serviciosCollection.deleteMany({});
        await serviciosCollection.insertMany(servicios);
        console.log('Servicios inicializados');
        
        // Colección de certificaciones
        const certificacionesCollection = db.collection('certificaciones');
        const certificaciones = [
            {
                titulo: 'Contabilidad General',
                institucion: 'Escuela de Contadores Auditores de Santiago',
                fecha: null,
                url_certificado: '',
                descripcion: 'Curso de contabilidad general'
            },
            {
                titulo: 'Microsoft: Programación, IoT, Big Data y Python',
                institucion: 'Microsoft',
                fecha: null,
                url_certificado: '',
                descripcion: 'Certificación en programación, IoT, Big Data y Python'
            },
            {
                titulo: 'Desarrollo Web y Diseño de Interfaces',
                institucion: '',
                fecha: null,
                url_certificado: '',
                descripcion: 'Curso de desarrollo web y diseño de interfaces'
            },
            {
                titulo: 'Fundamentos de Ciberseguridad',
                institucion: '',
                fecha: null,
                url_certificado: '',
                descripcion: 'Curso de fundamentos de ciberseguridad'
            },
            {
                titulo: 'Herramientas de Productividad Digital',
                institucion: '',
                fecha: null,
                url_certificado: '',
                descripcion: 'Curso de herramientas de productividad digital'
            }
        ];
        await certificacionesCollection.deleteMany({});
        await certificacionesCollection.insertMany(certificaciones);
        console.log('Certificaciones inicializadas');
        
        // Colección de curriculum
        const curriculumCollection = db.collection('curriculum');
        const curriculum = {
            educacion: [
                {
                    institucion: 'Escuela de Contadores Auditores de Santiago',
                    carrera: 'Contador Auditor',
                    estado: 'Completado (1 año)',
                    fecha_inicio: new Date('2021-03-01'),
                    fecha_fin: new Date('2022-02-28'),
                    logros: ['Estudios completados (1 año de carrera)']
                },
                {
                    institucion: 'Universidad Andrés Bello',
                    carrera: 'Ingeniería en Computación e Informática',
                    estado: 'Último semestre',
                    fecha_inicio: new Date('2022-03-01'),
                    fecha_fin: null,
                    logros: ['Cursando último semestre', 'Cuarto año de carrera']
                }
            ],
            experiencia_laboral: [
                {
                    empresa: 'Servicio Médico Legal (SML)',
                    cargo: 'Práctica Profesional I',
                    fecha_inicio: new Date('2024-12-01'),
                    fecha_fin: new Date('2025-02-28'),
                    descripcion: 'Práctica profesional en el Servicio Médico Legal',
                    logros: [
                        'Desarrollo y mantenimiento de páginas web internas',
                        'Manejo y administración de bases de datos',
                        'Configuración y gestión de máquinas virtuales Linux',
                        'Apoyo en tareas de optimización de procesos tecnológicos'
                    ]
                },
                {
                    empresa: 'Papa John\'s / McDonald\'s',
                    cargo: 'Operativo de tienda',
                    fecha_inicio: new Date('2023-11-01'),
                    fecha_fin: new Date('2024-01-31'),
                    descripcion: 'Trabajo en servicio al cliente y operaciones de tienda',
                    logros: [
                        'Atención en caja y servicio al cliente',
                        'Preparación de alimentos bajo normas de higiene',
                        'Trabajo en equipo y cumplimiento de metas diarias'
                    ]
                }
            ],
            actividades_extra: [
                'Voluntariados',
                'Trabajos adicionales',
                'Eventos Universidad',
                'Deportes',
                'Intercambios',
                'Emprendimientos'
            ],
            url_cv_pdf: null // Se actualizará cuando subas el archivo
        };
        await curriculumCollection.deleteMany({});
        await curriculumCollection.insertOne(curriculum);
        console.log('Curriculum inicializado');
        
        // Colección de carta de presentación
        const cartaCollection = db.collection('carta');
        const carta = {
            titulo: 'Carta de Presentación',
            contenido: `Estimado/a encargado/a de práctica:

Me presento, mi nombre es Alvaro Ignacio Guevara Godoy, estudiante de cuarto año de Ingeniería en Computación e Informática en la Universidad Andrés Bello, actualmente cursando el último semestre de la carrera. Me encuentro en búsqueda de una práctica profesional que me permita aplicar los conocimientos adquiridos durante mi formación académica.

Cuento con experiencia en desarrollo de páginas web, manejo de bases de datos y uso de máquinas virtuales. Realicé mi Práctica Profesional I en el Servicio Médico Legal (SML), donde desarrollé habilidades en desarrollo y mantenimiento de páginas web internas, administración de bases de datos, y configuración de máquinas virtuales Linux.

Me considero una persona responsable, adaptable y con gran interés por seguir aprendiendo nuevas tecnologías. Mis principales fortalezas incluyen:

- Desarrollo y mantenimiento de aplicaciones web
- Administración de bases de datos relacionales y no relacionales (MySQL, MongoDB)
- Virtualización de entornos y administración básica de Linux
- Análisis de datos y automatización de tareas
- Capacidad para trabajar en equipo y resolver problemas
- Habilidad para aprender rápidamente nuevas herramientas y adaptarme a distintos entornos tecnológicos

Tengo conocimientos en lenguajes de programación como Python, Java, C++, C, PHP y R, así como en tecnologías web (HTML, CSS, JavaScript) y herramientas de desarrollo (Postman, Visual Studio Code, VirtualBox, Linux).

Busco seguir creciendo en el área tecnológica, aportando soluciones prácticas y eficientes. Estoy entusiasmado por la oportunidad de contribuir a su organización y continuar mi crecimiento profesional.

Quedo atento a cualquier información adicional que pueda necesitar.

Atentamente,
Alvaro Ignacio Guevara Godoy
Estudiante de Ingeniería en Computación e Informática
Universidad Andrés Bello
Email: l.guevaragodoy@uandresbello.edu
Teléfono: +56942103929`,
            fecha_actualizacion: new Date()
        };
        await cartaCollection.deleteMany({});
        await cartaCollection.insertOne(carta);
        console.log('Carta de presentación inicializada');
        
        console.log('\nDatos inicializados correctamente en MongoDB.\n');
        
    } catch (error) {
        console.error('Error al inicializar datos:', error.message);
        process.exit(1);
    } finally {
        await closeConnection();
    }
}

// Ejecutar si se llama directamente
if (require.main === module) {
    initData();
}

module.exports = { initData };

