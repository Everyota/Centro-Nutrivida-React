// Select con label y mensaje de error, con el mismo formato que FormField
export function SelectField({
    id, // Id del select
    label, // Texto que acompaña al select
    value, // Valor seleccionado (se controla desde el padre)
    onChange, // Función que recibe el nuevo valor (string)
    opciones, // Lista de { value, label }
    placeholder, // Opción vacía que aparece primero
    errorId, // Id del elemento de error
    errorMessage = '', // Mensaje de error
}) {
    return (
        <div className="campo">
            <label htmlFor={id}>{label}</label>
            <select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">{placeholder}</option>
                {opciones.map((opcion) => (
                    <option key={opcion.value} value={opcion.value}>
                        {opcion.label}
                    </option>
                ))}
            </select>
            <small id={errorId} className="error">{errorMessage}</small>
        </div>
    )
}
