import { fireEvent, render, screen, cleanup  } from "@testing-library/react";
import { describe, test, expect, vi, afterEach } from "vitest";
import { ProfesionalSelect } from "../components/molecules/ProfessionalSelect";

afterEach(() => {
    // Limpiamos el contenido de la página después de cada test
    cleanup();
});

describe("ProfessionalSelect renderiza correctamente", () => {

    test("ProfessionalSelect renderiza correctamente las opciones", () => {
        render(<ProfesionalSelect
            professionals={["Profesional 1", "Profesional 2"]}
            selectedProfessional=""
            onChange={() => {}}
        />)
        expect(screen.getByText("Seleccionar profesional")).toBeTruthy()
        expect(screen.getByText("Profesional 1")).toBeTruthy()
        expect(screen.getByText("Profesional 2")).toBeTruthy()
    })
})