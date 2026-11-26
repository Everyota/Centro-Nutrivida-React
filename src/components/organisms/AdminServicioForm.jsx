import { useState } from "react";
import { FormField } from "../molecules/FormField";
import { FormTextArea } from "../molecules/FormTextArea";
import { SelectField } from "../molecules/SelectField";
import { Button } from "../atoms/Button";
import { validarPrecio, validarRequerido, validarUrl } from "../../utils/administracion";

// Formulario para crear o editar un servicio.
// Si "servicio" es null, el formulario es para crear uno nuevo.
export function AdminServicioForm({
    servicio, // Servicio a editar, o null para crear
    categorias, // Lista de categorías para el selector
    onGuardar, // Función que recibe los datos validados
    onCancelar, // Función para cerrar el formulario
    guardando = false, // Mientras se guarda, se desactiva el botón
}) {
    const esEdicion = Boolean(servicio);

    const [valores, setValores] = useState({
        nombre: servicio?.nombre ?? "",
        descripcion: servicio?.descripcion ?? "",
        precio: servicio ? String(servicio.precio) : "",
        imagen: servicio?.imagen ?? "",
        categoriaId: servicio ? String(servicio.categoriaId) : "",
    });
    const [errores, setErrores] = useState({});

    const cambiarCampo = (campo, valor) => {
        setValores((prev) => ({ ...prev, [campo]: valor }));
        setErrores((prev) => ({ ...prev, [campo]: "" }));
    };

    const enviar = (e) => {
        e.preventDefault();

        const nuevosErrores = {
            nombre: validarRequerido(valores.nombre, "El nombre es obligatorio."),
            descripcion: validarRequerido(valores.descripcion, "La descripción es obligatoria."),
            precio: validarPrecio(valores.precio),
            imagen: validarUrl(valores.imagen),
            categoriaId: validarRequerido(valores.categoriaId, "Seleccione una categoría."),
        };
        setErrores(nuevosErrores);

        if (Object.values(nuevosErrores).some(Boolean)) {
            return;
        }

        // El backend espera "categoriaId" en el body
        onGuardar({
            nombre: valores.nombre.trim(),
            descripcion: valores.descripcion.trim(),
            precio: Number(valores.precio),
            imagen: valores.imagen.trim(),
            categoriaId: Number(valores.categoriaId),
        });
    };

    const opcionesCategorias = categorias.map((c) => ({
        value: String(c.id),
        label: c.nombre,
    }));

    return (
        <form id="form-admin-servicio" noValidate onSubmit={enviar}>
            <h3>{esEdicion ? "Editar servicio" : "Nuevo servicio"}</h3>

            <SelectField
                id="servicio-categoria"
                label="Categoría"
                value={valores.categoriaId}
                onChange={(valor) => cambiarCampo("categoriaId", valor)}
                opciones={opcionesCategorias}
                placeholder="Seleccionar categoría"
                errorId="error-servicio-categoria"
                errorMessage={errores.categoriaId}
            />
            <FormField
                id="servicio-nombre"
                label="Nombre"
                type="text"
                placeholder="Ej: Primera consulta nutricional"
                maxLength="100"
                errorId="error-servicio-nombre"
                value={valores.nombre}
                onChange={(valor) => cambiarCampo("nombre", valor)}
                errorMessage={errores.nombre}
            />
            <FormTextArea
                id="servicio-descripcion"
                label="Descripción"
                rows={4}
                placeholder="Describa el servicio"
                maxLength="500"
                errorId="error-servicio-descripcion"
                value={valores.descripcion}
                onChange={(valor) => cambiarCampo("descripcion", valor)}
                errorMessage={errores.descripcion}
            />
            <FormField
                id="servicio-precio"
                label="Precio (CLP)"
                type="number"
                placeholder="Ej: 35000"
                maxLength="10"
                errorId="error-servicio-precio"
                value={valores.precio}
                onChange={(valor) => cambiarCampo("precio", valor)}
                errorMessage={errores.precio}
            />
            <FormField
                id="servicio-imagen"
                label="URL de la imagen"
                type="url"
                placeholder="https://..."
                maxLength="500"
                errorId="error-servicio-imagen"
                value={valores.imagen}
                onChange={(valor) => cambiarCampo("imagen", valor)}
                errorMessage={errores.imagen}
            />

            <Button type="submit" disabled={guardando}>
                {guardando ? "Guardando..." : esEdicion ? "Guardar cambios" : "Crear servicio"}
            </Button>
            <Button type="button" onClick={onCancelar} disabled={guardando}>
                Cancelar
            </Button>
        </form>
    )
}
