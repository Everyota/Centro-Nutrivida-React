import { useEffect, useState } from "react";
import { getTodosLosServicios, crearServicio, actualizarServicio, eliminarServicio } from "../api/servicios";
import { getCategorias } from "../api/categorias";
import { AdminServicioForm } from "../components/organisms/AdminServicioForm";
import { AdminItemCard } from "../components/molecules/AdminItemCard";
import { Button } from "../components/atoms/Button";
import { normalizarServicio } from "../utils/administracion";

// versionCategorias: número que cambia cuando se modifican categorías en otra parte de la página.
// Al cambiar, se vuelven a pedir las categorías para que el selector esté al día.
export function AdminServiciosContainer({ versionCategorias = 0 }) {
    const [servicios, setServicios] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [recargar, setRecargar] = useState(0); // Al aumentar este número se vuelve a pedir la lista
    const [formularioAbierto, setFormularioAbierto] = useState(false);
    const [servicioEditado, setServicioEditado] = useState(null); // null = crear uno nuevo
    const [guardando, setGuardando] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        async function cargarDatos() {
            try {
                const [respuestaServicios, respuestaCategorias] = await Promise.all([
                    getTodosLosServicios(),
                    getCategorias(),
                ]);
                setServicios(respuestaServicios.map(normalizarServicio));
                setCategorias(respuestaCategorias);
            } catch (err) {
                setError(`No se pudieron cargar los servicios. ${err.message}`);
            } finally {
                setCargando(false);
            }
        }
        cargarDatos();
    }, [recargar, versionCategorias]);

    const nombreCategoria = (categoriaId) =>
        categorias.find((c) => c.id === categoriaId)?.nombre ?? "Sin categoría";

    const cerrarFormulario = () => {
        setFormularioAbierto(false);
        setServicioEditado(null);
    };

    const abrirNuevo = () => {
        setMensaje("");
        setError("");
        setServicioEditado(null);
        setFormularioAbierto(true);
    };

    const abrirEdicion = (servicio) => {
        setMensaje("");
        setError("");
        setServicioEditado(servicio);
        setFormularioAbierto(true);
    };

    const guardar = async (datos) => {
        setGuardando(true);
        setMensaje("");
        setError("");
        try {
            if (servicioEditado) {
                await actualizarServicio(servicioEditado.id, datos);
                setMensaje(`Servicio "${datos.nombre}" actualizado.`);
            } else {
                await crearServicio(datos);
                setMensaje(`Servicio "${datos.nombre}" creado.`);
            }
            cerrarFormulario();
            setRecargar((n) => n + 1);
        } catch (err) {
            setError(`No se pudo guardar el servicio. ${err.message}`);
        } finally {
            setGuardando(false);
        }
    };

    const eliminar = async (servicio) => {
        const confirmado = window.confirm(
            `¿Eliminar el servicio "${servicio.nombre}"? Esta acción no se puede deshacer.`
        );
        if (!confirmado) return;

        setMensaje("");
        setError("");
        try {
            await eliminarServicio(servicio.id);
            if (servicioEditado?.id === servicio.id) {
                cerrarFormulario();
            }
            setMensaje(`Servicio "${servicio.nombre}" eliminado.`);
            setRecargar((n) => n + 1);
        } catch (err) {
            setError(`No se pudo eliminar el servicio "${servicio.nombre}". (${err.message})`);
        }
    };

    const sinCategorias = !cargando && categorias.length === 0;

    return (
        <div>
            <h3>Servicios</h3>
            <div>
                <Button onClick={abrirNuevo} disabled={sinCategorias}>
                    Nuevo servicio
                </Button>
            </div>
            {sinCategorias && (
                <p>Cree primero una categoría para poder agregar servicios.</p>
            )}

            {mensaje && <p className="mensaje" role="status">{mensaje}</p>}
            {error && <p className="error" role="alert">{error}</p>}

            {formularioAbierto && (
                <AdminServicioForm
                    // La key obliga a reiniciar el formulario al cambiar de servicio
                    key={servicioEditado?.id ?? "nuevo"}
                    servicio={servicioEditado}
                    categorias={categorias}
                    onGuardar={guardar}
                    onCancelar={cerrarFormulario}
                    guardando={guardando}
                />
            )}

            {cargando ? (
                <p>Cargando servicios...</p>
            ) : (
                <div className="grilla-productos">
                    {servicios.map((servicio) => (
                        <AdminItemCard
                            key={servicio.id}
                            imagen={servicio.imagen}
                            nombre={servicio.nombre}
                            subtitulo={nombreCategoria(servicio.categoriaId)}
                            precio={servicio.precio}
                            descripcion={servicio.descripcion}
                            onEditar={() => abrirEdicion(servicio)}
                            onEliminar={() => eliminar(servicio)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
