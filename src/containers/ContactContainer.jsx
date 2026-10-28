import { useState } from "react";
import { validarCorreo } from "../utils/validaciones";
import { ContactForm } from "../components/organisms/ContactForm";

export function ContactContainer() {
    const [
        formData, // Estado con los campos del formulario
        setFormData, // Función para cambiar el campo del formulario
    ] = useState({
        nombre: "",
        email: "",
        comentarios: "",
    });

    const [
        errors, // Objeto con los errores del los campos del formulario
        setErrors, // Función para cambiar los errores de los campos del formulario
    ] = useState({})

    const [
        message,
        setMessage,
    ] = useState("")

    const handleChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: ""
        }));
    };

    const validarNombreContacto = () => {
        const nombre = formData.nombre;

        if (nombre === "") {
            setErrors((prev) => ({
                ...prev,
                nombre: "El nombre es obligatorio."
            }));
            return false;
        }

        if (nombre.length > 100) {
            if (nombre === "") {
                setErrors((prev) => ({
                    ...prev,
                    nombre: "El nombre no puede superar los 100 caracteres."
                }));
                return false;
            }

            setErrors((prev) => ({
                ...prev,
                nombre: ""
            }));
            return true;
        }
    }

    const validarCorreoContacto = () => {
        const error = validarCorreo(formData.email);
        setErrors((prev) => ({
            ...prev,
            email: ""
        }));
        return error === "";
    }

    const validarComentarioContacto = () => {
        const comentario = formData.comentarios.trim();

        if (comentario === "") {
            setErrors((prev) => ({
                ...prev,
                comentarios: "El comentario es obligatorio"
            }));
            return false;
        }

        if (comentario.length > 500) {
            setErrors((prev) => ({
                ...prev,
                comentarios: "El comentario no puede superar los 500 caracteres."
            }));
            return false;
        }

        setErrors((prev) => ({
            ...prev,
            comentarios: ""
        }));
        return true;
    }

    const sendMessage = () => {
        const nombreValido = validarNombreContacto();
        const correoValido = validarCorreoContacto();
        const comentarioValido = validarComentarioContacto();

        if (nombreValido && correoValido && comentarioValido) {
            setMessage("Mensaje enviado correctamente. Gracias por contactarnos.")



            setFormData(() => ({
            nombre: "",
            email: "",
            comentarios: "",
        }))
        } else {
            setMessage("Mensaje enviado correctamente. Gracias por contactarnos.")
        }
        
        
    }

    return (
        <ContactForm
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onSubmit={sendMessage}
            message={message}
        />
    )
}
