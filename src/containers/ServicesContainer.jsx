import { useParams } from "react-router";
import {
    serviciosObesidad,
    serviciosDeportivos,
    serviciosVeganos,
    serviciosPediatria
} from "../data/servicios";
import { ServicesGrid } from "../components/organisms/ServicesGrid";

export function ServicesContainer({ agregarAlCarrito }) {

    let { nombreCategoria } = useParams();

    let servicios = [];

    if (nombreCategoria == "obesidad-sindrome-metabolico") {
        servicios = serviciosObesidad;
    } else if (nombreCategoria == "nutricion-deportiva") {
        servicios = serviciosDeportivos;
    } else if (nombreCategoria == "alimentacion-vegana-tca") {
        servicios = serviciosVeganos;
    } else if (nombreCategoria == "nutricion-pediatrica-familiar") {
        servicios = serviciosPediatria;
    }

    return (
        <ServicesGrid services={servicios} agendar={agregarAlCarrito} />
    )
}