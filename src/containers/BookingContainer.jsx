import { useState } from "react";
import { BookingForm } from "../components/organisms/BookingForm";
import { validarCorreo, validarNoEstaVacio } from "../utils/validaciones";

export function BookingContainer({ servicioAgendamiento, vaciarCarrito }) {
    const [
        formData, // Estado con los campos del formulario
        setFormData, // Función para cambiar el campo del formulario
    ] = useState({
        rut: "",
        nombres: "",
        apellidos: "",
        email: "",
        celular: "",
        prevision: "",
        diaAtencion: "",
        horaAtencion: "",
        profesional: "",
    });

    const [
        errors, // Objeto con los errores del los campos del formulario
        setErrors, // Función para cambiar los errores de los campos del formulario
    ] = useState({})

    const usuarioLog = localStorage.getItem("usuario");

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

    const handleError = (name, value) => {
        setErrors((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const validarNombres = () => {
        const error = validarNoEstaVacio(formData.nombres, "Los nombres son obligatorios.");
        handleError("nombres", error);
        return error === "";
    }

    const validarApellidos = () => {
        const error = validarNoEstaVacio(formData.apellidos, "Los apellidos son obligatorios.");
        handleError("apellidos", error);
        return error === "";
    }

    const validarCorreoFormulario = () => {
        const error = validarCorreo(formData.email);
        handleError("email", error);
        return error === "";
    }

    const confirmarAgendamiento = (e) => {
        e.preventDefault()
        //Validaciones de los campos del formulario
        let formularioValido = true;
        debugger;
        if (usuarioLog === null) {
            if (validarNombres() === false) {
                formularioValido = false;
            }
            if (!validarApellidos()) {
                formularioValido = false;
            }
            if (validarCorreoFormulario() === false) {
                formularioValido = false;
            }
        }
        if (formularioValido) {
            // Si todo es válido, se puede proceder a confirmar el agendamiento
            alert("Cita agendada con éxito para el servicio: " + servicioAgendamiento.nombre);
            vaciarCarrito();
        }

    }

    return (
        <BookingForm
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onSubmit={confirmarAgendamiento}
            onCancel={vaciarCarrito}
            patientName={usuarioLog}
            hours={["09:00", "10:00", "11:00"]}
            professionals={[
                "Nut. Carolina Fuentes M.",
                "Nut. Rodrigo Sepúlveda A.",
                "Nut. Daniela Morales C.",
                "Nut. Felipe Araya R.",
            ]}
        />
    )
}
