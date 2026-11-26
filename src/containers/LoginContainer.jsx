import { useState } from "react";
import { useNavigate } from "react-router";
import { validarCorreo } from "../utils/validaciones";
import { LoginForm } from "../components/organisms/LoginForm";
import { login } from "../api/auth";
import { guardarUsuario } from "../utils/usuario";

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

        if (password.length < 4) {
            // Si es menor a 4, cambiamos el mensaje de error del input de contraseña
            setPasswordError("La contraseña debe tener al menos 4 caracteres.");
            return false;
        }

        // Si pasa todas las validaciones, limpiamos el mensaje de error del input de contraseña
        setPasswordError("");
        return true;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Usamos las funciones de validación de arriba para validar los campos del formulario
        const correoValido = validarCorreoLogin();
        const passwordValido = validarPasswordLogin();

        if (correoValido && passwordValido) {

            const usuarioIniciado = await login(email, password);
            console.log("Usuario iniciado:", usuarioIniciado);
            if (usuarioIniciado) {
                // Agregamos el usuario al localStorage
                guardarUsuario(usuarioIniciado);
                // Navegamos con ReactRouter a la vista home
                navigate("/")
            } else {
                setLoginMessage("Credenciales incorrectas. Por favor, inténtelo de nuevo.");
            }
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
