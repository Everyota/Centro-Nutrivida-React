
// El children es para pasar elementos hijos dentro del componente.
// ...props es para poder pasarle cuaquier otro atributo al enlace
export function ButtonLink({ href, children, ...props }) {
    
    return (
        <a href={href} className="boton" {...props}>
            {children}
        </a>
    )
}