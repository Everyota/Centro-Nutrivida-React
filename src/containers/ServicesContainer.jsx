import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getServicios } from "../api/servicios";
import { ServicesGrid } from "../components/organisms/ServicesGrid";

export function ServicesContainer({ agregarAlCarrito }) {

    let { idCategoria } = useParams();

    const [servicios, setServicios] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        async function cargarServicios() {
            try {
                const respuestaServicios = await getServicios(idCategoria);
                setServicios(respuestaServicios);
            } catch (error) {
                console.error("Error al cargar los servicios:", error);
            } finally {
                setCargando(false);
            }
        }
        cargarServicios();
    }, []);

    if (cargando) {
        return <p>Cargando servicios...</p>;
    }

    return (
        <ServicesGrid services={servicios} agendar={agregarAlCarrito} />
    )
}