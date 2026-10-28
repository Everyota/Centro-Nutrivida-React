import { useState } from "react";
import { useNavigate } from "react-router";
import { validarCorreo } from "../utils/validaciones";
import { LoginForm } from "../components/organisms/LoginForm";

export function LoginContainer() {
    const navigate = useNavigate(); // Hook de React Router para navegar entre rutas
    const [
        email, // Variable para guardar el valor del input de correo electrónico
        setEmail, // función para actualizar el valor del input de correo electrónico
    ] = useState(""); // Estado para almacenar el valor del input de correo electrónico (por defecto vacío)
    const [
        emailError, // Variable para guardar el mensaje de error del input de correo electrónico
        setEmailError, // función para actualizar el mensaje de error del input de correo electrónico
    ] = useState(""); // Estado para almacenar el mensaje de error del input de correo electrónico (por defecto vacío)
    const [
        password, // Variable para guardar el valor del input de contraseña
        setPassword, // función para actualizar el valor del input de contraseña
    ] = useState(""); // Estado para almacenar el valor del input de contraseña (por defecto vacío)
    const [
        passwordError, // Variable para guardar el mensaje de error del input de contraseña
        setPasswordError, // función para actualizar el mensaje de error del input de contraseña
    ] = useState(""); // Estado para almacenar el mensaje de error del input de contraseña (por defecto vacío)
    const [
        loginMessage, // Variable para guardar el mensaje de error del formulario de login
        setLoginMessage, // función para actualizar el mensaje de error del formulario de login
    ] = useState(""); // Estado para almacenar el mensaje de error del formulario de login (por defecto vacío)

    const validarCorreoLogin = () => {
        // Usamos la función validarCorreo para validar el correo electrónico
        const error = validarCorreo(email);
        setEmailError(error);
        return error === "";
    }

    const validarPasswordLogin = () => {
        // Revisamos el valor de la variable de estado password
        if (password === "") {
            // Si está vacío, cambiamos el mensaje de error del input de contraseña
            setPasswordError("La contraseña es obligatoria.");
            return false;
        }

        if (password.length < 4 || password.length > 10) {
            // Si es menor a 4 o mayor a 10, cambiamos el mensaje de error del input de contraseña
            setPasswordError("La contraseña debe tener entre 4 y 10 caracteres.");
            return false;
        }

        // Si pasa todas las validaciones, limpiamos el mensaje de error del input de contraseña
        setPasswordError("");
        return true;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Usamos las funciones de validación de arriba para validar los campos del formulario
        const correoValido = validarCorreoLogin();
        const passwordValido = validarPasswordLogin();

        if (correoValido && passwordValido) {

            // Agregamos el usuario al localStorage
            localStorage.setItem("usuario", email)
            // Navegamos con ReactRouter a la vista home
            navigate("/")
        } else {
            // Cambiamos el mensaje de error del formulario de login si alguno de los campos no es válido
            setLoginMessage("Revise los campos marcados antes de continuar.");
        }
    }

    return (
        <LoginForm
            emailValue={email}
            emailError={emailError}
            onChangeEmail={(email) => setEmail(email)}
            passwordValue={password}
            passwordError={passwordError}
            onChangePassword={(password) => setPassword(password)}
            onSubmit={handleSubmit}
            message={loginMessage}
        />
    )
}
