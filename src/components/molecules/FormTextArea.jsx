
export function FormTextArea({
    id, // Id del input
    label, // Label. Texto que acompaña al input
    rows, // cuantas filas tendrá el input
    placeholder, // Placeholder del input (texto que aparece dentro del input cuando está vacío)
    maxLength, // Máximo de caracteres permitidos
    errorId, // Id del elemento de error
    value, // Valor del input. Se usa en React para controlar el estado del input
    onChange, // Función para manejar el cambio del input (uso en React)
    errorMessage = '', // Mensaje de error
}) {
    return (
        <div class="campo">
            <label for={id}>{label}</label>
            <textarea
                id={id}
                maxlength={maxLength}
                rows={rows}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
            >{value}</textarea>
            <small id={errorId} class="error">{errorMessage}</small>
        </div>
    )
}
