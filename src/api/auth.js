import { pedir } from "./api.js";

export async function login(correo, password) {
    try {
        const data = await pedir("/auth/login", {
            method: "POST",
            body: JSON.stringify({ correo, password }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        return data;
    } catch (error) {
        console.error("Error en login:", error);
        return null;
    }
}
