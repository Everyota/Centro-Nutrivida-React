import { Button } from "../atoms/Button";

export function ServiceCard({ servicio, agendar }) {
    return (
        <article className="producto">
            <img src={servicio.imagen} alt={servicio.nombre} />
            <div className="producto-contenido">
                <h3>{servicio.nombre}</h3>
                <p className="precio">${servicio.precio.toLocaleString("es-CL")}</p>
                <p>{servicio.descripcion}</p>
                <Button onClick={() => agendar(servicio)}>
                    Agendar
                </Button>
            </div>
        </article>
    )
}