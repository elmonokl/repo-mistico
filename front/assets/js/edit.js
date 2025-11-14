/**
 * Funcionalidad de edición del portafolio
 */

const API_BASE_URL = '/api';
let editModeActive = false;
let currentEditSection = null;


/**
 * Alterna el modo de edición (mantenido para compatibilidad)
 */
function toggleEditMode() {
    editModeActive = !editModeActive;
    const body = document.body;
    
    if (editModeActive) {
        body.classList.add('edit-mode-active');
        // Mostrar botones de edición en todas las secciones
        showEditButtons();
    } else {
        body.classList.remove('edit-mode-active');
        // Ocultar botones de edición y cerrar formularios abiertos
        hideEditButtons();
        closeAllEditForms();
    }
}

/**
 * Muestra los botones de edición
 */
function showEditButtons() {
    const editButtons = document.querySelectorAll('.btn-edit-inline');
    editButtons.forEach(btn => {
        btn.style.display = 'inline-flex';
    });
}

/**
 * Oculta los botones de edición
 */
function hideEditButtons() {
    const editButtons = document.querySelectorAll('.btn-edit-inline');
    editButtons.forEach(btn => {
        btn.style.display = 'none';
    });
}

/**
 * Abre el formulario de edición de una sección
 */
function editSection(section) {
    if (!editModeActive) {
        alert('Activa el modo edición primero');
        return;
    }
    
    currentEditSection = section;
    
    // Ocultar vista
    const viewElement = document.getElementById(section + 'View') || 
                        document.getElementById(section + 'Content') ||
                        document.querySelector(`#${section} .about-text`);
    if (viewElement) {
        viewElement.style.display = 'none';
    }
    
    // Mostrar formulario de edición
    const editForm = document.getElementById(section + 'EditForm');
    if (editForm) {
        editForm.style.display = 'block';
        loadEditFormData(section);
    }
}

/**
 * Cierra el formulario de edición
 */
function cancelEdit(section) {
    // Mostrar vista
    const viewElement = document.getElementById(section + 'View') || 
                        document.getElementById(section + 'Content') ||
                        document.querySelector(`#${section} .about-text`);
    if (viewElement) {
        viewElement.style.display = 'block';
    }
    
    // Ocultar formulario de edición
    const editForm = document.getElementById(section + 'EditForm');
    if (editForm) {
        editForm.style.display = 'none';
    }
    
    currentEditSection = null;
}

/**
 * Cierra todos los formularios de edición
 */
function closeAllEditForms() {
    const editForms = document.querySelectorAll('.edit-form');
    editForms.forEach(form => {
        form.style.display = 'none';
    });
    
    const viewElements = document.querySelectorAll('[id$="View"], [id$="Content"], .about-text');
    viewElements.forEach(el => {
        if (!el.closest('.edit-form')) {
            el.style.display = 'block';
        }
    });
    
    currentEditSection = null;
}

/**
 * Carga los datos actuales en el formulario de edición
 */
async function loadEditFormData(section) {
    try {
        if (section === 'personal') {
            const response = await fetch(`${API_BASE_URL}/personal`);
            const result = await response.json();
            
            if (result.success && result.data) {
                const data = result.data;
                document.getElementById('editNombre').value = data.nombre || '';
                document.getElementById('editTitulo').value = data.titulo || '';
                document.getElementById('editEmail').value = data.email || '';
                document.getElementById('editTelefono').value = data.telefono || '';
                document.getElementById('editUbicacion').value = data.ubicacion || '';
                document.getElementById('editLinkedin').value = data.linkedin || '';
                document.getElementById('editGithub').value = data.github || '';
                document.getElementById('editDescripcion').value = data.descripcion || '';
                document.getElementById('editHabilidadesTecnicas').value = 
                    Array.isArray(data.habilidades_tecnicas) ? data.habilidades_tecnicas.join(', ') : '';
                document.getElementById('editHabilidadesBlandas').value = 
                    Array.isArray(data.habilidades_blandas) ? data.habilidades_blandas.join(', ') : '';
                document.getElementById('editAreasInteres').value = 
                    Array.isArray(data.areas_interes) ? data.areas_interes.join(', ') : '';
            }
        } else if (section === 'carta') {
            const response = await fetch(`${API_BASE_URL}/carta`);
            const result = await response.json();
            
            if (result.success && result.data) {
                const data = result.data;
                document.getElementById('editCartaTitulo').value = data.titulo || '';
                document.getElementById('editCartaContenido').value = data.contenido || '';
            }
        }
    } catch (error) {
        console.error('Error al cargar datos para edición:', error);
        alert('Error al cargar los datos para editar');
    }
}

/**
 * Guarda los datos personales
 */
async function savePersonalData(event) {
    event.preventDefault();
    
    const formData = {
        nombre: document.getElementById('editNombre').value,
        titulo: document.getElementById('editTitulo').value,
        email: document.getElementById('editEmail').value,
        telefono: document.getElementById('editTelefono').value,
        ubicacion: document.getElementById('editUbicacion').value,
        linkedin: document.getElementById('editLinkedin').value,
        github: document.getElementById('editGithub').value,
        descripcion: document.getElementById('editDescripcion').value,
        habilidades_tecnicas: document.getElementById('editHabilidadesTecnicas').value
            .split(',')
            .map(s => s.trim())
            .filter(s => s.length > 0),
        habilidades_blandas: document.getElementById('editHabilidadesBlandas').value
            .split(',')
            .map(s => s.trim())
            .filter(s => s.length > 0),
        areas_interes: document.getElementById('editAreasInteres').value
            .split(',')
            .map(s => s.trim())
            .filter(s => s.length > 0)
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/personal`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Datos personales guardados correctamente');
            // Recargar los datos en la vista
            loadPersonalData();
            cancelEdit('personal');
        } else {
            alert('Error al guardar: ' + result.message);
        }
    } catch (error) {
        console.error('Error al guardar datos personales:', error);
        alert('Error al guardar los datos');
    }
}

/**
 * Guarda la carta de presentación
 */
async function saveCarta(event) {
    event.preventDefault();
    
    const formData = {
        titulo: document.getElementById('editCartaTitulo').value,
        contenido: document.getElementById('editCartaContenido').value
    };
    
    try {
        const response = await fetch(`${API_BASE_URL}/carta`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Carta de presentación guardada correctamente');
            // Recargar los datos en la vista
            loadCarta();
            cancelEdit('carta');
        } else {
            alert('Error al guardar: ' + result.message);
        }
    } catch (error) {
        console.error('Error al guardar carta:', error);
        alert('Error al guardar la carta');
    }
}

// Hacer funciones disponibles globalmente
window.toggleEditMode = toggleEditMode;
window.editSection = editSection;
window.cancelEdit = cancelEdit;
window.savePersonalData = savePersonalData;
window.saveCarta = saveCarta;

// Configurar formularios cuando la página esté lista
document.addEventListener('DOMContentLoaded', () => {
    const editPersonalForm = document.getElementById('editPersonalForm');
    if (editPersonalForm) {
        editPersonalForm.addEventListener('submit', savePersonalData);
    }
    
    const editCartaForm = document.getElementById('editCartaForm');
    if (editCartaForm) {
        editCartaForm.addEventListener('submit', saveCarta);
    }
});

