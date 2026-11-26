import { useState } from "react";
import { useNavigate } from "react-router";
import { RegisterForm } from "../components/organisms/RegisterForm";
import { validarCorreo, validarNoEstaVacio } from "../utils/validaciones";
import { registrar } from "../api/auth";

export function RegisterContainer() {
    const navigate = useNavigate(); // Hook de React Router para navegar entre rutas
    const [
        formData, // Estado con los campos del formulario
        setFormData, // Función para cambiar el campo del formulario
    ] = useState({
        rut: "",
        nombres: "",
        apellidos: "",
        correo: "",
        password: "",
        celular: "",
        prevision: "",
    });

    const [
        errors, // Objeto con los errores del los campos del formulario
        setErrors, // Función para cambiar los errores de los campos del formulario
    ] = useState({})

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

    const validateForm = () => {
        let valido = true;

        const camposObligatorios = ["rut", "nombres", "apellidos", "correo", "password", "celular", "prevision"];
        camposObligatorios.forEach((campo) => {
            const error = validarNoEstaVacio(formData[campo], `El campo ${campo} es obligatorio.`);
            if (error) {
                setErrors((prev) => ({
                    ...prev,
                    [campo]: error
                }));
                valido = false;
            }
        });

        const errorCorreo = validarCorreo(formData.correo);
        if (errorCorreo) {
            setErrors((prev) => ({
                ...prev,
                correo: errorCorreo
            }));
            valido = false;
        }

        return valido;
    }

    const register = async (event) => {
        event.preventDefault();
        const formularioValido = validateForm();
        if (formularioValido) {
            const usuarioRegistrado = await registrar(formData);
            if (usuarioRegistrado) {
                alert("Usuario registrado");
                navigate("/iniciar-sesion");
            } else {
                alert("Error al registrar usuario. Inténtelo de nuevo.");
            }
        } else {
            alert("Revise los campos marcados antes de continuar.");
        }
    }

    return (
        <RegisterForm
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onSubmit={register}
        />
    )
}
