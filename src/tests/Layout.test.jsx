import { render, screen, cleanup  } from "@testing-library/react";
import { describe, test, expect, vi, afterEach } from "vitest";
import { Layout } from "../components/templates/Layout";
import { MemoryRouter } from "react-router";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
    // Limpiamos el contenido de la página después de cada test
    cleanup();
});

describe("Template Layout", () => {
    test("Muestra header, contenido y footer", () => {
        // Usamos MemoryRouter porque es necesario para que funcionen los
        // enlaces del header
        render(
            <MemoryRouter>
                <Layout>
                    <h1>Contenido de prueba de la página</h1>
                </Layout>
            </MemoryRouter>
        );
        // Esperamos que la página tenga el header (role "banner")
        expect(screen.getByRole("banner")).toBeTruthy()
        // Esperamos que el contenido de la página se vea
        expect(screen.getByText("Contenido de prueba de la página")).toBeTruthy()
        // Esperamos que la página tenga el footer (role "contentinfo")
        expect(screen.getByRole("contentinfo")).toBeTruthy()
    })

    test("Muestra solo header y footer cuando no hay contenido", () => {
        // Usamos MemoryRouter porque es necesario para que funcionen los
        // enlaces del header
        render(
            <MemoryRouter>
                <Layout>
                </Layout>
            </MemoryRouter>
        );
        // Esperamos que la página tenga el header (role "banner")
        expect(screen.getByRole("banner")).toBeTruthy()
        // Esperamos que la página tenga el footer (role "contentinfo")
        expect(screen.getByRole("contentinfo")).toBeTruthy()
        // Esperamos que el contenido de la página main esté vacío
        expect(screen.getByRole("main")).toBeEmptyDOMElement()
    })
})