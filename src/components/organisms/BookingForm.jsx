import { FormField } from "../molecules/FormField";
import { PrevisionSelect } from "../molecules/PrevisionSelect";
import { Button } from "../atoms/Button"
import { HourSelect } from "../molecules/HourSelect";
import { ProfesionalSelect } from "../molecules/ProfessionalSelect";

export function BookingForm({
    formData, // objeto con todos los datos de los campos del formulario
    errors, // objeto con todos los mensajes de error de los campos del formulario
    onChange, // función para actualizar cualquier campo del formulario
    onSubmit, // función cuando se hace submit del formulario (registro del usuario)
    onCancel,
    patientName, // dice si hay que pedir o no los datos del paciente
    hours, // Horas disponibles para atenderse
    professionals, // Prefionales disponibles para atenderse
}) {
    return (
        <form id="form-agendamiento" class="form-agendamiento" noValidate>
            {patientName == undefined ? (
                <div id="datos-paciente">
                    <h5>Datos paciente</h5>
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
                </div>
            ) : (
                <p>Hora agendada para {patientName}</p>
            )}
            <h5>Datos cita</h5>
            <FormField
                id="dia-cita"
                label="Día de atención"
                type="date"
                placeholder=""
                maxLength=""
                errorId="error-date-paciente"
                value={formData.diaAtencion}
                onChange={(value) => onChange("diaAtencion", value)}
                errorMessage={errors.diaAtencion}
            />
            <HourSelect
                hours={hours}
                selectedHour={formData.horaAtencion}
                onChange={(value) => onChange("horaAtencion", value)}
            />
            <ProfesionalSelect
                professionals={professionals}
                selectedProfessional={formData.profesional}
                onChange={(value) => onChange("profesional", value)}
            />
            <div class="resumen-carrito">
                <button
                    id="vaciar-carrito"
                    class="boton
                    boton-secundario"
                    onClick={onCancel}
                >
                    Cancelar
                </button>
                <Button
                    id="confirmar-agendamiento"
                    onClick={onSubmit}
                >
                    Confirmar
                </Button>
            </div>
        </form>
    )
}
