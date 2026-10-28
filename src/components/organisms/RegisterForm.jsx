import { FormField } from "../molecules/FormField";
import { PrevisionSelect } from "../molecules/PrevisionSelect";
import { Button } from "../atoms/Button"

export function RegisterForm({
    formData, // objeto con todos los datos de los campos del formulario
    errors, // objeto con todos los mensajes de error de los campos del formulario
    onChange, // función para actualizar cualquier campo del formulario
    onSubmit, // función cuando se hace submit del formulario (registro del usuario)
}) {
    return (
        <form id="form-agendamiento" class="form-agendamiento" noValidate onSubmit={onSubmit}>
            <FormField
                id="rut-paciente"
                label="RUT"
                type="text"
                placeholder="12.345.678-9"
                maxLength="100"
                errorId="error-rut-paciente"
                value={formData.rut}
                onChange={(value) => onChange("rut", value)}
                errorMessage={errors.rut}
            />
            <FormField
                id="nombres-paciente"
                label="Nombres"
                type="text"
                placeholder="Federico Alberto"
                maxLength="100"
                errorId="error-nombres-paciente"
                value={formData.nombres}
                onChange={(value) => onChange("nombres", value)}
                errorMessage={errors.nombres}
            />
            <FormField
                id="apellidos-paciente"
                label="Apellidos"
                type="text"
                placeholder="Gómez Perez"
                maxLength="100"
                errorId="error-apellidos-paciente"
                value={formData.apellidos}
                onChange={(value) => onChange("apellidos", value)}
                errorMessage={errors.apellidos}
            />
            <FormField
                id="email-paciente"
                label="Correo Electrónico"
                type="email"
                placeholder="nombre@duoc.cl"
                maxLength="100"
                errorId="error-email-paciente"
                value={formData.email}
                onChange={(value) => onChange("email", value)}
                errorMessage={errors.email}
            />
            <FormField
                id="password-paciente"
                label="Contraseña"
                type="password"
                placeholder=""
                maxLength="100"
                errorId="error-password-paciente"
                value={formData.password}
                onChange={(value) => onChange("password", value)}
                errorMessage={errors.password}
            />
            <FormField
                id="celular-paciente"
                label="Celular"
                type="phone"
                placeholder="987654321"
                maxLength="100"
                errorId="error-celular-paciente"
                value={formData.celular}
                onChange={(value) => onChange("celular", value)}
                errorMessage={errors.celular}
            />
            <PrevisionSelect
                value={formData.prevision}
                onChange={(value) => onChange("prevision", value)}
            />
            <Button id="btn-registro">Registrarse</Button>
        </form>
    )
}
