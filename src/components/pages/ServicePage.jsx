import { ServicesContainer } from "../../containers/ServicesContainer";
import { BookingContainer } from "../../containers/BookingContainer";
import { Layout } from "../templates/Layout";
import { useState } from "react";

export function ServicePage() {
    const [
        servicioAgendamiento, // El servicio que se quiere agendar
        setServicioAgendamiento, // Función para modificar el servicio que se quiere agendar
    ] = useState(undefined)
    const [
        mostrarCarrito,
        setMostrarCarrito,
    ] = useState(null)

    const guardarCarrito = () => {
        if (servicioAgendamiento) {
            localStorage.setItem("servicioAgendamiento", JSON.stringify(servicioAgendamiento));
        }
        else {
            localStorage.removeItem("servicioAgendamiento");
        }
    }

    const agregarAlCarrito = (servicio) => {
        setServicioAgendamiento(servicio)
        setMostrarCarrito(true)
        guardarCarrito()
    }

    const manejarVaciarCarrito = () => {
        setServicioAgendamiento(null)
        guardarCarrito()
        setMostrarCarrito(false)
    }

    return (
        <Layout>
            <section id="productos" className="seccion contenedor">
                <h2>Servicios</h2>
                <p>Tenemos atenciones según tus necesidades</p>
                <div id="grilla-productos" className="grilla-productos">
                    <ServicesContainer agregarAlCarrito={agregarAlCarrito} />
                </div>
            </section>
            <aside id="panel-carrito" className={`panel-carrito ${mostrarCarrito ? "" : "oculto"}`} aria-label="Carrito de compras">
                <div className="panel-cabecera">
                    <h2>Agendar cita</h2>
                    <button
                        id="cerrar-carrito"
                        className="btn-cerrar"
                        aria-label="Cerrar carrito"
                        onClick={manejarVaciarCarrito}
                    >×</button>
                </div>

                <div id="lista-carrito">
                    {servicioAgendamiento && (
                        <div className="item-carrito">
                            <div>
                                <strong>{servicioAgendamiento.nombre}</strong>
                                <p>
                                    Valor:
                                    ${(servicioAgendamiento.precio).toLocaleString("es-CL")}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                <BookingContainer
                    servicioAgendamiento={servicioAgendamiento}
                    vaciarCarrito={manejarVaciarCarrito}
                />
            </aside>
        </Layout>
    )
}