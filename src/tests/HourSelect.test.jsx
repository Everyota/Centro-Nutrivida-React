import { fireEvent, render, screen, cleanup  } from "@testing-library/react";
import { describe, test, expect, vi, afterEach } from "vitest";
import { HourSelect } from "../components/molecules/HourSelect";

afterEach(() => {
    // Limpiamos el contenido de la página después de cada test
    cleanup();
});

describe("Molécula HourSelect", () => {
    test("Se muestra correctamente con las opciones", () => {
        const hours = ["11:00", "12:00", "14:00"];
        render(<HourSelect
            hours={hours}
            selectedHour=""
            onChange=""
            />
        )
        // Esperamos que el select tenga "Hora de atención (por el label)"
        expect(screen.getByText("Hora de atención")).toBeTruthy()
        // Esperamos que las horas de las opciones se muestren
        expect(screen.getByText("11:00")).toBeTruthy()
        expect(screen.getByText("12:00")).toBeTruthy()
        expect(screen.getByText("14:00")).toBeTruthy()
    })

    test("Permite seleccionar una opción", () => {
        const hours = ["11:00", "12:00", "14:00"];
        // Simulamos una función
        const onChange = vi.fn();
        render(<HourSelect
            hours={hours}
            selectedHour=""
            onChange={onChange}
            />
        )
        // Obtenemos el select
        const hourSelect = screen.getByRole("combobox")
        // Seleccionamos las 11:00
        fireEvent.change(hourSelect, {target: {value: "11:00"}})
        // Esperamos que la función onChange haya sido llamada una vez con el valor 11:00
        expect(onChange).toHaveBeenCalledExactlyOnceWith("11:00")
    })
})