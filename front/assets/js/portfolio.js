/**
 * Carga de datos del portafolio desde la API
 */

const API_BASE_URL = '/api';

/**
 * Obtiene los datos personales desde la API
 */
async function loadPersonalData() {
    try {
        const response = await fetch(`${API_BASE_URL}/personal`);
        const result = await response.json();
        
        if (result.success && result.data) {
            const data = result.data;
            
            // Actualizar Hero Section
            document.getElementById('heroName').textContent = data.nombre || 'Desarrollador';
            document.getElementById('heroTitle').textContent = data.titulo || 'Desarrollador Full Stack';
            document.getElementById('heroDescription').textContent = data.descripcion || 'Bienvenido a mi portafolio profesional';
            
            // Actualizar Navbar
            if (data.nombre) {
                const firstName = data.nombre.split(' ')[0];
                document.getElementById('navBrand').textContent = firstName;
            }
            
            // Actualizar título de la página
            document.title = `${data.nombre || 'Desarrollador'} - Portafolio`;
            
            // Actualizar meta description
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.content = `Portafolio personal - ${data.nombre || 'Desarrollador'}`;
            }
            
            // Actualizar información de contacto en hero
            const heroContactInfo = document.getElementById('heroContactInfo');
            if (heroContactInfo) {
                heroContactInfo.innerHTML = '';
                if (data.email) {
                    heroContactInfo.innerHTML += `<span><i class="fas fa-envelope"></i> ${escapeHtml(data.email)}</span>`;
                }
                if (data.github) {
                    const githubUser = data.github.split('/').pop();
                    heroContactInfo.innerHTML += `<span><i class="fab fa-github"></i> GitHub: @${escapeHtml(githubUser)}</span>`;
                }
                if (data.linkedin) {
                    heroContactInfo.innerHTML += `<span><i class="fab fa-linkedin"></i> LinkedIn</span>`;
                }
            }
            
            // Actualizar Hero Social Links
            const heroSocial = document.getElementById('heroSocial');
            heroSocial.innerHTML = '';
            
            if (data.github) {
                heroSocial.innerHTML += `
                    <a href="${escapeHtml(data.github)}" target="_blank" rel="noopener" title="GitHub">
                        <i class="fab fa-github"></i>
                    </a>
                `;
            }
            if (data.linkedin) {
                heroSocial.innerHTML += `
                    <a href="${escapeHtml(data.linkedin)}" target="_blank" rel="noopener" title="LinkedIn">
                        <i class="fab fa-linkedin"></i>
                    </a>
                `;
            }
            if (data.website) {
                heroSocial.innerHTML += `
                    <a href="${escapeHtml(data.website)}" target="_blank" rel="noopener" title="Website">
                        <i class="fas fa-globe"></i>
                    </a>
                `;
            }
            
            // Cargar habilidades con mejor formato
            if (data.habilidades_tecnicas && data.habilidades_tecnicas.length > 0) {
                const habilidadesTecnicas = document.getElementById('habilidadesTecnicas');
                if (habilidadesTecnicas) {
                    habilidadesTecnicas.innerHTML = data.habilidades_tecnicas.map(h => 
                        `<span class="skill-tag"><i class="fas fa-check"></i> ${escapeHtml(h)}</span>`
                    ).join('');
                }
            }
            
            if (data.habilidades_blandas && data.habilidades_blandas.length > 0) {
                const habilidadesBlandas = document.getElementById('habilidadesBlandas');
                if (habilidadesBlandas) {
                    habilidadesBlandas.innerHTML = data.habilidades_blandas.map(h => 
                        `<span class="skill-tag soft-skill"><i class="fas fa-star"></i> ${escapeHtml(h)}</span>`
                    ).join('');
                }
            }
            
            if (data.areas_interes && data.areas_interes.length > 0) {
                const areasInteres = document.getElementById('areasInteres');
                if (areasInteres) {
                    areasInteres.innerHTML = data.areas_interes.map(area => 
                        `<div class="interest-item"><i class="fas fa-bullseye"></i> ${escapeHtml(area)}</div>`
                    ).join('');
                }
            }
            
            // Actualizar About Section
            document.getElementById('aboutName').textContent = data.nombre || 'Desarrollador';
            document.getElementById('aboutDescription').textContent = data.descripcion || 'Información sobre mí';
            
            const aboutInfo = document.getElementById('aboutInfo');
            aboutInfo.innerHTML = '';
            
            if (data.email) {
                aboutInfo.innerHTML += `
                    <div class="info-item">
                        <i class="fas fa-envelope"></i>
                        <span>${escapeHtml(data.email)}</span>
                    </div>
                `;
            }
            if (data.telefono) {
                aboutInfo.innerHTML += `
                    <div class="info-item">
                        <i class="fas fa-phone"></i>
                        <span>${escapeHtml(data.telefono)}</span>
                    </div>
                `;
            }
            if (data.ubicacion) {
                aboutInfo.innerHTML += `
                    <div class="info-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${escapeHtml(data.ubicacion)}</span>
                    </div>
                `;
            }
            
            // Actualizar Footer
            const footerContact = document.getElementById('footerContact');
            footerContact.innerHTML = '';
            
            if (data.email) {
                footerContact.innerHTML += `<i class="fas fa-envelope"></i> ${escapeHtml(data.email)}<br>`;
            }
            if (data.telefono) {
                footerContact.innerHTML += `<i class="fas fa-phone"></i> ${escapeHtml(data.telefono)}<br>`;
            }
            if (data.ubicacion) {
                footerContact.innerHTML += `<i class="fas fa-map-marker-alt"></i> ${escapeHtml(data.ubicacion)}`;
            }
            
            const footerSocial = document.getElementById('footerSocial');
            footerSocial.innerHTML = '';
            
            if (data.github) {
                footerSocial.innerHTML += `
                    <a href="${escapeHtml(data.github)}" target="_blank" rel="noopener">
                        <i class="fab fa-github"></i>
                    </a>
                `;
            }
            if (data.linkedin) {
                footerSocial.innerHTML += `
                    <a href="${escapeHtml(data.linkedin)}" target="_blank" rel="noopener">
                        <i class="fab fa-linkedin"></i>
                    </a>
                `;
            }
            if (data.website) {
                footerSocial.innerHTML += `
                    <a href="${escapeHtml(data.website)}" target="_blank" rel="noopener">
                        <i class="fas fa-globe"></i>
                    </a>
                `;
            }
            
        }
    } catch (error) {
        console.error('Error al cargar datos personales:', error);
    }
}

/**
 * Obtiene los proyectos desde la API
 */
async function loadProyectos() {
    try {
        const response = await fetch(`${API_BASE_URL}/proyectos`);
        const result = await response.json();
        
        const projectsGrid = document.getElementById('projectsGrid');
        
        if (result.success && result.data && result.data.length > 0) {
            projectsGrid.innerHTML = '';
            
            result.data.forEach(proyecto => {
                const fecha = proyecto.fecha ? new Date(proyecto.fecha) : null;
                const fechaFormatted = fecha ? fecha.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' }) : '';
                
                const projectCard = document.createElement('div');
                projectCard.className = 'project-card';
                
                const imagenHtml = proyecto.imagen && proyecto.imagen !== 'assets/images/proyecto1.jpg' 
                    ? `<img src="${escapeHtml(proyecto.imagen)}" alt="${escapeHtml(proyecto.titulo)}">`
                    : `<div class="project-placeholder"><i class="fas fa-code"></i></div>`;
                
                const demoLink = proyecto.url_demo 
                    ? `<a href="${escapeHtml(proyecto.url_demo)}" target="_blank" rel="noopener" class="project-link">
                         <i class="fas fa-external-link-alt"></i> Demo
                       </a>`
                    : '';
                
                const repoLink = proyecto.url_repositorio
                    ? `<a href="${escapeHtml(proyecto.url_repositorio)}" target="_blank" rel="noopener" class="project-link">
                         <i class="fab fa-github"></i> Código
                       </a>`
                    : '';
                
                const tecnologiasHtml = proyecto.tecnologias && proyecto.tecnologias.length > 0
                    ? proyecto.tecnologias.map(tech => `<span class="tech-tag">${escapeHtml(tech)}</span>`).join('')
                    : '';
                
                // Icono según categoría
                const categoriaIconos = {
                    'Web Development': '💻',
                    'Mobile Development': '📱',
                    'Backend Development': '⚙️',
                    'Full Stack': '🌐',
                    'Desarrollo': '💻'
                };
                const icono = categoriaIconos[proyecto.categoria] || '💻';
                
                const rolHtml = proyecto.rol ? `<p class="project-role"><strong>Rol:</strong> ${escapeHtml(proyecto.rol)}</p>` : '';
                const resultadosHtml = proyecto.resultados ? `<p class="project-results"><strong>Resultados:</strong> ${escapeHtml(proyecto.resultados)}</p>` : '';
                
                // Características clave (si existen)
                const caracteristicas = proyecto.caracteristicas || [];
                const caracteristicasHtml = caracteristicas.length > 0 
                    ? `<div class="project-features"><h5>Características Clave:</h5><ul>${caracteristicas.map(c => `<li>${escapeHtml(c)}</li>`).join('')}</ul></div>`
                    : '';
                
                // Badge de GitHub si tiene repositorio
                const githubBadge = proyecto.url_repositorio && proyecto.url_repositorio.includes('github.com')
                    ? `<span class="github-badge"><i class="fab fa-github"></i> GitHub</span>`
                    : '';
                
                projectCard.innerHTML = `
                    <div class="project-header">
                        <span class="project-icon">${icono}</span>
                        <span class="project-category">${escapeHtml(proyecto.categoria || 'Desarrollo')}</span>
                        ${githubBadge}
                    </div>
                    <div class="project-image">
                        ${imagenHtml}
                        <div class="project-overlay">
                            <div class="project-links">
                                ${demoLink}
                                ${repoLink ? `<a href="${escapeHtml(proyecto.url_repositorio)}" target="_blank" rel="noopener" class="project-link project-link-github">
                                     <i class="fab fa-github"></i> Ver en GitHub
                                   </a>` : ''}
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <h3 class="project-title">${escapeHtml(proyecto.titulo)}</h3>
                        <p class="project-description">${escapeHtml(proyecto.descripcion)}</p>
                        ${fechaFormatted ? `<p class="project-period"><strong>Periodo:</strong> ${fechaFormatted}</p>` : ''}
                        ${rolHtml}
                        ${caracteristicasHtml}
                        <div class="project-technologies">
                            <strong>Tecnologías:</strong>
                            <div class="tech-tags-container">
                                ${tecnologiasHtml}
                            </div>
                        </div>
                        ${resultadosHtml}
                        ${proyecto.url_repositorio ? `<div class="project-github-link" style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                            <a href="${escapeHtml(proyecto.url_repositorio)}" target="_blank" rel="noopener" class="btn btn-secondary" style="width: 100%; text-align: center;">
                                <i class="fab fa-github"></i> Ver Repositorio en GitHub
                            </a>
                        </div>` : ''}
                    </div>
                `;
                
                projectsGrid.appendChild(projectCard);
            });
        } else {
            projectsGrid.innerHTML = `
                <div class="no-projects">
                    <i class="fas fa-folder-open"></i>
                    <p>No hay proyectos disponibles por el momento.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error al cargar proyectos:', error);
        document.getElementById('projectsGrid').innerHTML = `
            <div class="no-projects">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error al cargar los proyectos. Por favor, intenta más tarde.</p>
            </div>
        `;
    }
}

/**
 * Escapa HTML para prevenir XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}


/**
 * Carga la experiencia profesional
 */
async function loadExperiencia() {
    try {
        const response = await fetch(`${API_BASE_URL}/experiencia`);
        const result = await response.json();
        
        const experienciaContent = document.getElementById('experienciaContent');
        
        if (result.success && result.data && result.data.length > 0) {
            experienciaContent.innerHTML = result.data.map(exp => {
                const fechaInicio = exp.fecha_inicio ? new Date(exp.fecha_inicio).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }) : '';
                const fechaFin = exp.fecha_fin ? new Date(exp.fecha_fin).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }) : 'Presente';
                const actividades = exp.actividades ? exp.actividades.map(a => `<li>${escapeHtml(a)}</li>`).join('') : '';
                const logros = exp.logros ? exp.logros.map(l => `<li>${escapeHtml(l)}</li>`).join('') : '';
                
                return `
                    <div class="experience-card">
                        <h3>${escapeHtml(exp.cargo)}</h3>
                        <h4>${escapeHtml(exp.empresa)}</h4>
                        <p class="experience-date">${fechaInicio} - ${fechaFin}</p>
                        <p class="experience-description">${escapeHtml(exp.descripcion)}</p>
                        ${actividades ? `<h5>Actividades:</h5><ul>${actividades}</ul>` : ''}
                        ${logros ? `<h5>Logros:</h5><ul>${logros}</ul>` : ''}
                        ${exp.aprendizajes ? `<p class="experience-learning"><strong>Aprendizajes:</strong> ${escapeHtml(exp.aprendizajes)}</p>` : ''}
                    </div>
                `;
            }).join('');
        } else {
            experienciaContent.innerHTML = '<p>No hay experiencia profesional registrada.</p>';
        }
    } catch (error) {
        console.error('Error al cargar experiencia:', error);
    }
}


/**
 * Carga las certificaciones
 */
async function loadCertificaciones() {
    try {
        const response = await fetch(`${API_BASE_URL}/certificaciones`);
        const result = await response.json();
        
        const certificacionesContent = document.getElementById('certificacionesContent');
        
        if (result.success && result.data && result.data.length > 0) {
            certificacionesContent.innerHTML = result.data.map(cert => {
                const fecha = cert.fecha ? new Date(cert.fecha).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }) : '';
                const certificadoLink = cert.url_certificado ? `<a href="${escapeHtml(cert.url_certificado)}" target="_blank" class="cert-link"><i class="fas fa-external-link-alt"></i> Ver Certificado</a>` : '';
                const esReconocimiento = cert.titulo.toLowerCase().includes('reconocimiento') || cert.titulo.toLowerCase().includes('premio');
                const icono = esReconocimiento ? '🏆' : '📜';
                
                return `
                    <div class="certification-card">
                        <div class="cert-header">
                            <span class="cert-icon">${icono}</span>
                            <div>
                                <h3>${escapeHtml(cert.titulo)}</h3>
                                <p class="cert-institution">${escapeHtml(cert.institucion)}</p>
                            </div>
                        </div>
                        <p class="cert-date"><i class="far fa-calendar"></i> ${fecha}</p>
                        <p class="cert-description">${escapeHtml(cert.descripcion)}</p>
                        ${certificadoLink}
                    </div>
                `;
            }).join('');
        } else {
            certificacionesContent.innerHTML = '<p>No hay certificaciones registradas.</p>';
        }
    } catch (error) {
        console.error('Error al cargar certificaciones:', error);
    }
}

/**
 * Carga el curriculum
 */
async function loadCurriculum() {
    try {
        const response = await fetch(`${API_BASE_URL}/curriculum`);
        const result = await response.json();
        
        const curriculumContent = document.getElementById('curriculumContent');
        const cvDownload = document.getElementById('cvDownload');
        
        if (result.success && result.data) {
            const cv = result.data;
            let html = '';
            
            if (cv.educacion && cv.educacion.length > 0) {
                html += '<div class="cv-section"><h3>Educación</h3>';
                html += cv.educacion.map(edu => {
                    const fechaInicio = edu.fecha_inicio ? new Date(edu.fecha_inicio).getFullYear() : '';
                    const fechaFin = edu.fecha_fin ? new Date(edu.fecha_fin).getFullYear() : edu.estado || '';
                    const logros = edu.logros ? edu.logros.map(l => `<li>${escapeHtml(l)}</li>`).join('') : '';
                    return `
                        <div class="cv-item">
                            <h4>${escapeHtml(edu.carrera)}</h4>
                            <p class="cv-institution">${escapeHtml(edu.institucion)}</p>
                            <p class="cv-date">${fechaInicio} - ${fechaFin}</p>
                            ${logros ? `<ul>${logros}</ul>` : ''}
                        </div>
                    `;
                }).join('');
                html += '</div>';
            }
            
            if (cv.experiencia_laboral && cv.experiencia_laboral.length > 0) {
                html += '<div class="cv-section"><h3>Experiencia Laboral</h3>';
                html += cv.experiencia_laboral.map(exp => {
                    const fechaInicio = exp.fecha_inicio ? new Date(exp.fecha_inicio).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }) : '';
                    const fechaFin = exp.fecha_fin ? new Date(exp.fecha_fin).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }) : 'Presente';
                    const logros = exp.logros ? exp.logros.map(l => `<li>${escapeHtml(l)}</li>`).join('') : '';
                    return `
                        <div class="cv-item">
                            <h4>${escapeHtml(exp.cargo)}</h4>
                            <p class="cv-institution">${escapeHtml(exp.empresa)}</p>
                            <p class="cv-date">${fechaInicio} - ${fechaFin}</p>
                            <p>${escapeHtml(exp.descripcion)}</p>
                            ${logros ? `<ul>${logros}</ul>` : ''}
                        </div>
                    `;
                }).join('');
                html += '</div>';
            }
            
            curriculumContent.innerHTML = html || '<p>No hay información de curriculum disponible.</p>';
            
            if (cv.url_cv_pdf) {
                cvDownload.innerHTML = `
                    <div class="cv-download-box">
                        <p style="margin-bottom: 1rem; color: var(--text-light);">📄 CV disponible en formato PDF</p>
                        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                            <a href="${escapeHtml(cv.url_cv_pdf)}" target="_blank" class="btn btn-primary" style="font-size: 1.1rem; padding: 15px 30px;">
                                <i class="fas fa-download"></i> Descargar CV
                            </a>
                            <button onclick="viewCV()" class="btn btn-secondary" style="font-size: 1.1rem; padding: 15px 30px;">
                                <i class="fas fa-eye"></i> Visualizar CV
                            </button>
                        </div>
                    </div>
                `;
            } else {
                cvDownload.innerHTML = '';
            }
        }
    } catch (error) {
        console.error('Error al cargar curriculum:', error);
    }
}

/**
 * Carga la carta de presentación
 */
async function loadCarta() {
    try {
        const response = await fetch(`${API_BASE_URL}/carta`);
        const result = await response.json();
        
        const cartaContent = document.getElementById('cartaContent');
        
        if (result.success && result.data && result.data.contenido) {
            cartaContent.innerHTML = `<div class="letter-text">${result.data.contenido.replace(/\n/g, '<br>')}</div>`;
        } else {
            cartaContent.innerHTML = '<p>No hay carta de presentación disponible.</p>';
        }
    } catch (error) {
        console.error('Error al cargar carta:', error);
    }
}

/**
 * Visualiza el CV en un iframe
 */
function viewCV() {
    const cvViewer = document.getElementById('cvViewer');
    const cvView = document.getElementById('cvView');
    
    if (cvViewer && cvView) {
        cvViewer.src = '/api/curriculum/view';
        cvView.style.display = 'block';
        cvView.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Hacer viewCV disponible globalmente
window.viewCV = viewCV;

// Cargar datos cuando la página esté lista
document.addEventListener('DOMContentLoaded', () => {
    // Cargar datos del portafolio
    loadPersonalData();
    loadProyectos();
    loadExperiencia();
    loadCertificaciones();
    loadCurriculum();
    loadCarta();
});

