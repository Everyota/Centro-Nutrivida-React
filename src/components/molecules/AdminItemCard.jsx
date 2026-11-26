import { Button } from "../atoms/Button";

// Reutiliza el estilo de tarjeta de productos (.producto) para mostrar un elemento editable
export function AdminItemCard({
    imagen, // URL de la imagen
    nombre, // Título de la tarjeta
    subtitulo, // Texto secundario opcional (por ejemplo, la categoría)
    precio, // Precio opcional (número)
    descripcion, // Descripción
    onEditar, // Función al presionar "Editar"
    onEliminar, // Función al presionar "Eliminar"
}) {
    return (
        <article className="producto">
            <img src={imagen} alt={nombre} />
            <div className="producto-contenido">
                <h3>{nombre}</h3>
                {subtitulo && <p><em>{subtitulo}</em></p>}
                {typeof precio === "number" && (
                    <p className="precio">${precio.toLocaleString("es-CL")}</p>
                )}
                <p>{descripcion}</p>
                <Button onClick={onEditar} aria-label={`Editar ${nombre}`}>
                    Editar
                </Button>
                <Button
                    className="boton boton-secundario"
                    onClick={onEliminar}
                    aria-label={`Eliminar ${nombre}`}
                >
                    Eliminar
                </Button>
            </div>
        </article>
    )
}
