import { useEffect, useState } from "react";
import { CategoriesGrid } from "../components/organisms/CategoriesGrid";
import { getCategorias } from "../api/categorias"

export function CategoriesContainer() {

    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        async function cargarCategorias() {
            try {
                const respuestaCategorias = await getCategorias();
                setCategorias(respuestaCategorias);
            } catch (error) {
                console.error("Error al cargar las categorías:", error);
            } finally {
                setCargando(false);
            }
        }
        cargarCategorias();
    }, []);

    if (cargando) {
        return <p>Cargando categorías...</p>;
    }
    
    return (
        <CategoriesGrid categories={categorias} />
    )
}