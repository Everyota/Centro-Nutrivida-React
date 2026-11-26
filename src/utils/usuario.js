
const STORAGE_KEY = 'usuario';

export function guardarUsuario(usuario) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(usuario));
}

export function obtenerUsuario() {
    const usuario = localStorage.getItem(STORAGE_KEY);
    if (usuario) {
        try {
            return JSON.parse(usuario);
        } catch (error) {
            console.error('Error parsing usuario from localStorage:', error);
        }
    }
    return null;
}
