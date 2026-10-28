import { ButtonLink } from "../atoms/ButtonLink";

export function CategoryCard({ categoria }) {
    return (
        <article className="producto">
            <img src={categoria.imagen} alt={categoria.nombre} />
            <div className="producto-contenido">
                <h3>{categoria.nombre}</h3>
                <p>{categoria.descripcion}</p>
                <ButtonLink href={categoria.pagina}>
                    Ver más
                </ButtonLink>
            </div>

        </article>
    )
}