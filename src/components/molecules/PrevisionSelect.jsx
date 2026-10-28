
export function PrevisionSelect({ value, onChange }) {
    return (
        <div class="campo">
            <label for="prevision-paciente">Previsión</label>
            <select
                id="prevision-paciente"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">Seleccionar previsión</option>
                <option value="Fonasa">Fonasa</option>
                <option value="Isapre">Isapre</option>
                <option value="Particular">Particular</option>
            </select>
            <small id="error-prevision-paciente" class="error"></small>
        </div>
    )
}
