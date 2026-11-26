import { pedir } from "./api.js";

export async function getCategorias() {
    const categorias = await pedir("/categorias");
    return categorias;
}

// Estas funciones dejan que el error llegue a quien llama (a diferencia de auth.js y reservas.js,
// que lo silencian) para que la página de administración pueda mostrarlo.
export async function crearCategoria(categoria) {
    return pedir("/categorias", {
        method: "POST",
        body: JSON.stringify(categoria),
    });
}

export async function actualizarCategoria(id, categoria) {
    return pedir(`/categorias/${id}`, {
        method: "PUT",
        body: JSON.stringify(categoria),
    });
}

export async function eliminarCategoria(id) {
    return pedir(`/categorias/${id}`, { method: "DELETE" });
}
