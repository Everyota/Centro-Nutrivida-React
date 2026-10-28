import { Input } from "../atoms/Input"

export function FormField({
    id, // Id del input
    label, // Label. Texto que acompaña al input
    type, // Tipo de input (text, email, password, etc.)
    placeholder, // Placeholder del input (texto que aparece dentro del input cuando está vacío)
    maxLength, // Máximo de caracteres permitidos
    errorId, // Id del elemento de error
    value, // Valor del input. Se usa en React para controlar el estado del input
    onChange, // Función para manejar el cambio del input (uso en React)
    errorMessage = '', // Mensaje de error
}) {

    return (
        <div className="campo">
            <label for={id}>{label}</label>
            <Input
              type={type}
              id={id}
              maxlength={maxLength}
              placeholder={placeholder}
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
            <small id={errorId} classNAAME="error">{errorMessage}</small>
        </div>
    );
}
