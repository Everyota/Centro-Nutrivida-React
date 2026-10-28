import { useState } from "react";
import { RegisterForm } from "../components/organisms/RegisterForm";

export function RegisterContainer() {
    const [
        formData, // Estado con los campos del formulario
        setFormData, // Función para cambiar el campo del formulario
    ] = useState({
        rut: "",
        nombres: "",
        apellidos: "",
        email: "",
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

    const register = () => {
        alert("Usuario registrado")
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
