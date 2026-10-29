import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { describe, test, expect, vi, afterEach } from "vitest";
import { CategoriesContainer } from "../containers/CategoriesContainer";

// Simulamos los datos de prueba de categorías
vi.mock("../data/categorias", () => ({
    categorias: [
        {
            id: 1,
            nombre: "Prueba 1",
            descripcion: "Categoría de prueba",
            pagina: "prueba",
            imagen: "imagen"
        },
        {
            id: 2,
            nombre: "Prueba 2",
            descripcion: "Otra categoría de prueba",
            pagina: "otra-prueba",
            imagen: "imagen"
        },
    ]
}))

afterEach(() => {
    // Limpiamos el contenido de la página después de cada test
    cleanup();
});

describe("Container CategoriesContainer", () => {
    test("Muestra las categorías correspondientes", () => {
        render(<CategoriesContainer />)
        // Esperamos encontrar los datos de prueba
        expect(screen.getByText("Prueba 1")).toBeTruthy()
        expect(screen.getByText("Prueba 2")).toBeTruthy()
    })
})