import { FormField } from "../molecules/FormField";
import { Button } from "../atoms/Button";
import { FormTextArea } from "../molecules/FormTextArea"

export function ContactForm({
    formData, // objeto con todos los datos de los campos del formulario
    errors, // objeto con todos los mensajes de error de los campos del formulario
    onChange, // función para actualizar cualquier campo del formulario
    onSubmit,
    message,
}) {
    return (
        <form id="form-login" noValidate onSubmit={onSubmit}>
            <FormField
                id="nombre-contacto"
                label="Nombre"
                type="text"
                placeholder="Ingrese su nombre"
                maxLength="100"
                errorId="error-nombre-contacto"
                value={formData.nombre}
                onChange={(value) => onChange("nombre", value)}
                errorMessage={errors.nombre}
            />
            <FormField
                id="email-contacto"
                label="Correo Electrónico"
                type="email"
                placeholder="nombre@duoc.cl"
                maxLength="100"
                errorId="error-email-contacto"
                value={formData.email}
                onChange={(value) => onChange("email", value)}
                errorMessage={errors.email}
            />
            <FormTextArea
                id="comentario-contacto"
                label="Comentarios"
                rows={5}
                placeholder="Escriba su mensaje"
                maxLength="100"
                errorId="error-comentario-contacto"
                value={formData.comentario}
                onChange={(value) => onChange("comentario", value)}
                errorMessage={errors.comentario}
            />
            <Button type="submit">Enviar mensaje</Button>
            <p id="mensaje-contacto" className="mensaje">{message}</p>
        </form>
    )
}
