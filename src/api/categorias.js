import { pedir } from "./api.js";

export async function getCategorias() {
    const categorias = await pedir("/categorias");
    return categorias;
}
