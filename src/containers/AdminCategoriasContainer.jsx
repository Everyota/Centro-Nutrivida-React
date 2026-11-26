import { useEffect, useState } from "react";
import { getCategorias, crearCategoria, actualizarCategoria, eliminarCategoria } from "../api/categorias";
import { AdminCategoriaForm } from "../components/organisms/AdminCategoriaForm";
import { AdminItemCard } from "../components/molecules/AdminItemCard";
import { Button } from "../components/atoms/Button";

// alCambiar: se llama cuando se crea, edita o elimina una categoría,
// para que otras partes de la página (el selector de servicios) se actualicen.
export function AdminCategoriasContainer({ alCambiar }) {
    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [recargar, setRecargar] = useState(0); // Al aumentar este número se vuelve a pedir la lista
    const [formularioAbierto, setFormularioAbierto] = useState(false);
    const [categoriaEditada, setCategoriaEditada] = useState(null); // null = crear una nueva
    const [guardando, setGuardando] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        async function cargarCategorias() {
            try {
                const respuestaCategorias = await getCategorias();
                setCategorias(respuestaCategorias);
            } catch (err) {
                setError(`No se pudieron cargar las categorías. ${err.message}`);
            } finally {
                setCargando(false);
            }
        }
        cargarCategorias();
    }, [recargar]);

    const cerrarFormulario = () => {
        setFormularioAbierto(false);
        setCategoriaEditada(null);
    };

    const abrirNueva = () => {
        setMensaje("");
        setError("");
        setCategoriaEditada(null);
        setFormularioAbierto(true);
    };

    const abrirEdicion = (categoria) => {
        setMensaje("");
        setError("");
        setCategoriaEditada(categoria);
        setFormularioAbierto(true);
    };

    const guardar = async (datos) => {
        setGuardando(true);
        setMensaje("");
        setError("");
        try {
            if (categoriaEditada) {
                await actualizarCategoria(categoriaEditada.id, datos);
                setMensaje(`Categoría "${datos.nombre}" actualizada.`);
            } else {
                await crearCategoria(datos);
                setMensaje(`Categoría "${datos.nombre}" creada.`);
            }
            cerrarFormulario();
            setRecargar((n) => n + 1);
            alCambiar?.();
        } catch (err) {
            setError(`No se pudo guardar la categoría. ${err.message}`);
        } finally {
            setGuardando(false);
        }
    };

    const eliminar = async (categoria) => {
        const confirmado = window.confirm(
            `¿Eliminar la categoría "${categoria.nombre}"? Esta acción no se puede deshacer.`
        );
        if (!confirmado) return;

        setMensaje("");
        setError("");
        try {
            await eliminarCategoria(categoria.id);
            if (categoriaEditada?.id === categoria.id) {
                cerrarFormulario();
            }
            setMensaje(`Categoría "${categoria.nombre}" eliminada.`);
            setRecargar((n) => n + 1);
            alCambiar?.();
        } catch (err) {
            // La base de datos no permite borrar una categoría que tenga servicios asociados
            setError(
                `No se pudo eliminar la categoría "${categoria.nombre}". ` +
                `Si tiene servicios asociados, elimínelos o cámbielos de categoría primero. (${err.message})`
            );
        }
    };

    return (
        <div>
            <h3>Categorías</h3>
            <div>
                <Button onClick={abrirNueva}>Nueva categoría</Button>
            </div>

            {mensaje && <p className="mensaje" role="status">{mensaje}</p>}
            {error && <p className="error" role="alert">{error}</p>}

            {formularioAbierto && (
                <AdminCategoriaForm
                    // La key obliga a reiniciar el formulario al cambiar de categoría
                    key={categoriaEditada?.id ?? "nueva"}
                    categoria={categoriaEditada}
                    onGuardar={guardar}
                    onCancelar={cerrarFormulario}
                    guardando={guardando}
                />
            )}

            {cargando ? (
                <p>Cargando categorías...</p>
            ) : (
                <div className="grilla-productos">
                    {categorias.map((categoria) => (
                        <AdminItemCard
                            key={categoria.id}
                            imagen={categoria.imagen}
                            nombre={categoria.nombre}
                            descripcion={categoria.descripcion}
                            onEditar={() => abrirEdicion(categoria)}
                            onEliminar={() => eliminar(categoria)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
