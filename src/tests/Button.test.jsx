import { fireEvent, render, screen, cleanup  } from "@testing-library/react";
import { describe, test, expect, vi, afterEach } from "vitest";
import { Button } from "../components/atoms/Button";

afterEach(() => {
    // Limpiamos el contenido de la página después de cada test
    cleanup();
});

describe("Átomo Button", () => {
    test("Botón tiene el texto correcto", () => {
        render(<Button>Prueba</Button>)
        expect(screen.getByText("Prueba")).toBeTruthy();
    });
    test("Botón permite onClick y llama a función", () => {
        // Simulamos una función vacía
        const onClick = vi.fn();
        render(<Button onClick={onClick}>Prueba</Button>)
        const button = screen.getByText("Prueba")
        fireEvent.click(button);
        expect(onClick).toHaveBeenCalledTimes(1)
    })
})
