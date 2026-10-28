
export function ProfesionalSelect({
    professionals,
    selectedProfessional,
    onChange,
}) {
    return (
        <div class="campo">
          <label for="profesional-cita">Profesional</label>
          <select
            id="profesional-cita"
            value={selectedProfessional}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">Seleccionar profesional</option>
            {professionals.map((professional) => <option value={professional}>{professional}</option>)}
          </select>
        </div>
    )
}
