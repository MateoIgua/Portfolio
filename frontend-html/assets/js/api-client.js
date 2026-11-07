// =====================================================================
// api-client.js
// Cliente minimalista para hablar con Portfolio.Api.
// Encapsula la URL base y el manejo de fetch — los demás archivos JS
// solo importan las funciones y no piensan en HTTP.
// =====================================================================

// Detecta si estamos en producción (GitHub Pages) o en local.
// Cambia esta constante cuando deployees el backend a un servidor real.
const API_BASE = (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
    ? 'http://localhost:5050'
    : 'https://TU-BACKEND-EN-PRODUCCION.com';   // ⚠️ actualizar cuando tengas servidor

// Helper genérico — hace GET y devuelve JSON o tira un error legible.
async function apiGet(path) {
    const url = `${API_BASE}${path}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText} @ ${url}`);
    }
    return response.json();
}

// ---------------------------------------------------------------------
// Endpoints expuestos
// ---------------------------------------------------------------------

// GET /api/hello → { message, from, timestamp }
window.getHello = () => apiGet('/api/hello');

// GET /api/hello/now → { iso, human, unix }
window.getServerTime = () => apiGet('/api/hello/now');
