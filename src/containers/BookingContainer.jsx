import { useState } from "react";
import { BookingForm } from "../components/organisms/BookingForm";
import { validarCorreo, validarNoEstaVacio } from "../utils/validaciones";
import { realizarReserva } from "../api/reservas";
import { obtenerUsuario } from "../utils/usuario";

export function BookingContainer({ servicioAgendamiento, vaciarCarrito }) {
    const [
        formData, // Estado con los campos del formulario
        setFormData, // Función para cambiar el campo del formulario
    ] = useState({
        rut: "",
        nombres: "",
        apellidos: "",
        correo: "",
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

    const usuarioLog = obtenerUsuario(); // Obtener el usuario logueado desde el localStorage

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
        const error = validarCorreo(formData.correo);
        handleError("correo", error);
        return error === "";
    }

    const confirmarAgendamiento = async (e) => {
        e.preventDefault()
        //Validaciones de los campos del formulario
        let formularioValido = true;
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
            const fechaReserva = `${formData.diaAtencion}T${formData.horaAtencion}:00`;

            const datosReserva = {
                "fecha_reserva": fechaReserva,
                "nombre_profesional": formData.profesional,
                "servicio_id": servicioAgendamiento.id,
            }

            if (usuarioLog) {
                datosReserva["usuario_id"] = usuarioLog.id;
            } else {
                datosReserva["rut"] = formData.rut;
                datosReserva["nombres"] = formData.nombres;
                datosReserva["apellidos"] = formData.apellidos;
                datosReserva["correo"] = formData.correo;
                datosReserva["celular"] = formData.celular;
                datosReserva["prevision"] = formData.prevision;
            }
            const reservaRealizada = await realizarReserva(datosReserva);
            if (reservaRealizada) {
                alert("Cita agendada con éxito para el servicio: " + servicioAgendamiento.nombre);
                vaciarCarrito();
            } else {
                alert("Hubo un error al realizar la reserva")
            }
        }

    }

    return (
        <BookingForm
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onSubmit={confirmarAgendamiento}
            onCancel={vaciarCarrito}
            patientName={usuarioLog?.nombres}
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
