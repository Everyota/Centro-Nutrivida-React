import { FormField } from "../molecules/FormField";
import { Button } from "../atoms/Button";

export function LoginForm({
    emailValue, // Valor del input de correo electrónico
    emailError = '', // Mensaje de error del input de correo electrónico (por defecto vacío)
    onChangeEmail, // Función para manejar el cambio del input de correo electrónico
    passwordValue, // Valor del input de contraseña
    passwordError = '', // Mensaje de error del input de contraseña (por defecto vacío)
    onChangePassword, // Función para manejar el cambio del input de contraseña
    onSubmit, // Función para manejar el inicio de sesión (submit del formulario)
    message, // Mensaje de error o éxito que se mostrará en el formulario
}) {
    return (
        <form id="form-login" noValidate onSubmit={onSubmit}>
            <FormField
                id="correo-login"
                label="Correo electrónico"
                type="email"
                placeholder="nombre@gmail.com"
                maxLength="100"
                errorId="error-correo-login"
                value={emailValue}
                onChange={onChangeEmail}
                errorMessage={emailError}
            />
            <FormField
                id="password-login"
                label="Contraseña"
                type="password"
                placeholder="Entre 4 y 10 caracteres"
                maxLength="10"
                errorId="error-password-login"
                value={passwordValue}
                onChange={onChangePassword}
                errorMessage={passwordError}
            />
            <Button type="submit">Ingresar</Button>
            <p id="mensaje-login" className="mensaje">{message}</p>
        </form>
    )
}
