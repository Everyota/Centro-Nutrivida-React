import { useState } from "react";
import { FormField } from "../molecules/FormField";
import { FormTextArea } from "../molecules/FormTextArea";
import { Button } from "../atoms/Button";
import { generarSlug, validarRequerido, validarUrl } from "../../utils/administracion";

// Formulario para crear o editar una categoría.
// Si "categoria" es null, el formulario es para crear una nueva.
// El contenedor le pasa una key distinta por cada categoría para que el formulario se reinicie.
export function AdminCategoriaForm({
    categoria, // Categoría a editar, o null para crear
    onGuardar, // Función que recibe los datos validados
    onCancelar, // Función para cerrar el formulario
    guardando = false, // Mientras se guarda, se desactiva el botón
}) {
    const esEdicion = Boolean(categoria);

    const [valores, setValores] = useState({
        nombre: categoria?.nombre ?? "",
        descripcion: categoria?.descripcion ?? "",
        pagina: categoria?.pagina ?? "",
        imagen: categoria?.imagen ?? "",
    });
    const [errores, setErrores] = useState({});
    // Mientras el usuario no edite "pagina" a mano, se calcula a partir del nombre
    const [paginaEditada, setPaginaEditada] = useState(esEdicion);

    const cambiarCampo = (campo, valor) => {
        setValores((prev) => ({ ...prev, [campo]: valor }));
        setErrores((prev) => ({ ...prev, [campo]: "" }));
    };

    const cambiarNombre = (valor) => {
        setValores((prev) => ({
            ...prev,
            nombre: valor,
            pagina: paginaEditada ? prev.pagina : generarSlug(valor),
        }));
        setErrores((prev) => ({ ...prev, nombre: "" }));
    };

    const cambiarPagina = (valor) => {
        setPaginaEditada(true);
        cambiarCampo("pagina", valor);
    };

    const enviar = (e) => {
        e.preventDefault();

        const nuevosErrores = {
            nombre: validarRequerido(valores.nombre, "El nombre es obligatorio."),
            descripcion: validarRequerido(valores.descripcion, "La descripción es obligatoria."),
            pagina: validarRequerido(valores.pagina, "El identificador de página es obligatorio."),
            imagen: validarUrl(valores.imagen),
        };
        setErrores(nuevosErrores);

        if (Object.values(nuevosErrores).some(Boolean)) {
            return;
        }

        onGuardar({
            nombre: valores.nombre.trim(),
            descripcion: valores.descripcion.trim(),
            pagina: valores.pagina.trim(),
            imagen: valores.imagen.trim(),
        });
    };

    return (
        <form id="form-admin-categoria" noValidate onSubmit={enviar}>
            <h3>{esEdicion ? "Editar categoría" : "Nueva categoría"}</h3>

            <FormField
                id="categoria-nombre"
                label="Nombre"
                type="text"
                placeholder="Ej: Nutrición deportiva"
                maxLength="100"
                errorId="error-categoria-nombre"
                value={valores.nombre}
                onChange={cambiarNombre}
                errorMessage={errores.nombre}
            />
            <FormTextArea
                id="categoria-descripcion"
                label="Descripción"
                rows={4}
                placeholder="Describa brevemente la categoría"
                maxLength="300"
                errorId="error-categoria-descripcion"
                value={valores.descripcion}
                onChange={(valor) => cambiarCampo("descripcion", valor)}
                errorMessage={errores.descripcion}
            />
            <FormField
                id="categoria-pagina"
                label="Identificador de página"
                type="text"
                placeholder="Ej: nutricion-deportiva"
                maxLength="100"
                errorId="error-categoria-pagina"
                value={valores.pagina}
                onChange={cambiarPagina}
                errorMessage={errores.pagina}
            />
            <FormField
                id="categoria-imagen"
                label="URL de la imagen"
                type="url"
                placeholder="https://..."
                maxLength="500"
                errorId="error-categoria-imagen"
                value={valores.imagen}
                onChange={(valor) => cambiarCampo("imagen", valor)}
                errorMessage={errores.imagen}
            />

            <Button type="submit" disabled={guardando}>
                {guardando ? "Guardando..." : esEdicion ? "Guardar cambios" : "Crear categoría"}
            </Button>
            <Button type="button" onClick={onCancelar} disabled={guardando}>
                Cancelar
            </Button>
        </form>
    )
}
