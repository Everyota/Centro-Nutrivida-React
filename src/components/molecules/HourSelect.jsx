
export function HourSelect({
    hours,
    selectedHour,
    onChange
}) {

    return (
        <div class="campo">
            <label for="hora-cita">Hora de atención</label>
            <select
                id="hora-cita"
                value={selectedHour}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">Seleccionar hora</option>
                {hours.map((hour) => <option value={hour}>{hour}</option>)}
            </select>
        </div>
    )
}
