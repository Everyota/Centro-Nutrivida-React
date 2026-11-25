import { pedir } from "./api.js";

export async function getServicios(idCategoria) {
    const servicios = await pedir(`/categorias/${idCategoria}/servicios`);
    return servicios;
}