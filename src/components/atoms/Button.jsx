
// El children es para pasar elementos hijos dentro del componente.
// ...props es para poder pasarle cuaquier otro atributo al botón
export function Button({ children, ...props }) {
    
    return (
        <button className="boton" {...props}>
            {children}
        </button>
    )
}
