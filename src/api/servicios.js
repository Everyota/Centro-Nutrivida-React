import { pedir } from "./api.js";

export async function getServicios(idCategoria) {
    const servicios = await pedir(`/categorias/${idCategoria}/servicios`);
    return servicios;
}

// Devuelve todos los servicios, sin filtrar por categoría (GET /servicios)
export async function getTodosLosServicios() {
    return pedir("/servicios");
}

// El backend espera el campo "categoriaId" (no "categoria_id") en el body
export async function crearServicio(servicio) {
    return pedir("/servicios", {
        method: "POST",
        body: JSON.stringify(servicio),
    });
}

export async function actualizarServicio(id, servicio) {
    return pedir(`/servicios/${id}`, {
        method: "PUT",
        body: JSON.stringify(servicio),
    });
}

export async function eliminarServicio(id) {
    return pedir(`/servicios/${id}`, { method: "DELETE" });
}
