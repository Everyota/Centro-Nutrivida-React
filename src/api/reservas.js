import { pedir } from "./api.js";

export async function realizarReserva(reserva) {
    try {
        const data = await pedir("/reservas", {
            method: "POST",
            body: JSON.stringify(reserva),
            headers: {
                "Content-Type": "application/json"
            }
        });
        return data;
    } catch (error) {
        console.error("Error en reserva:", error);
        return null;
    }
}
