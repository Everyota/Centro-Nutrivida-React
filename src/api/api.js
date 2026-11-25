const API = import.meta.env.VITE_API_URL;

export async function pedir(ruta, opciones = {}) {
    let res;
    try {
        res = await fetch(`${API}${ruta}`, {
            headers: { "Content-Type": "application/json" },
            ...opciones,
        });
    } catch {
        // Llegamos aquí si la API está apagada, la URL está mal o CORS la bloqueó
        throw new Error(
            "No se pudo conectar con la API. ¿Está corriendo el backend? " +
            "Si lo está, revisa la consola del navegador (F12): puede ser CORS."
        );
    }
    if (!res.ok) {
        // Intentamos leer el mensaje de error que mandó el backend
        const cuerpo = await res.json().catch(() => ({}));
        throw new Error(cuerpo.error || `HTTP ${res.status}`);
    }
    // 204 No Content no trae body → no hay nada que convertir a JSON
    if (res.status === 204) return null;
    return res.json();
}
