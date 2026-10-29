import { fireEvent, render, screen, cleanup  } from "@testing-library/react";
import { describe, test, expect, vi, afterEach } from "vitest";
import { FormField } from "../components/molecules/FormField";

afterEach(() => {
    // Limpiamos el contenido de la página después de cada test
    cleanup();
});

describe("Molécula FormField", () => {
    test("FormField renderiza correctamente el label", () => {
        render(<FormField 
            id="test"
            label="Prueba"
            type="text"
            placeholder="esto es una prueba"
            maxLength={10}
            errorId="error"
            value=""
            onChange=""
            errorMessage =""
            />
        )
        expect(screen.getByText("Prueba")).toBeTruthy()
        expect(screen.getAllByPlaceholderText("esto es una prueba")).toBeTruthy()
    })

    test("FormField muestra mensaje de error", () => {
        render(<FormField 
            id="test"
            label="Prueba"
            type="text"
            placeholder="esto es una prueba"
            maxLength={10}
            errorId="error"
            value=""
            onChange=""
            errorMessage = "esto es un error"
            />
        )
        expect(screen.getByText("esto es un error")).toBeTruthy()
    })
})