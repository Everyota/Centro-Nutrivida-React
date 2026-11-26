import { useState } from "react";
import { Layout } from "../templates/Layout";
import { ButtonLink } from "../atoms/ButtonLink";
import { AdminCategoriasContainer } from "../../containers/AdminCategoriasContainer";
import { AdminServiciosContainer } from "../../containers/AdminServiciosContainer";
import { obtenerUsuario } from "../../utils/usuario";

export function AdminPage() {
    // Cuando cambian las categorías, aumenta este número y el selector de servicios se actualiza
    const [versionCategorias, setVersionCategorias] = useState(0);

    // Control de acceso solo en el frontend: el backend hoy no valida el rol en sus rutas
    const usuario = obtenerUsuario();
    if (!usuario || usuario.rol !== "ADMIN") {
        return (
            <Layout>
                <section className="seccion contenedor">
                    <h2>Acceso restringido</h2>
                    <p>Esta página es solo para administradores.</p>
                    <ButtonLink href="/iniciar-sesion">Iniciar sesión</ButtonLink>
                </section>
            </Layout>
        );
    }

    return (
        <Layout>
            <section id="administracion" className="seccion contenedor">
                <h2>Administración</h2>
                <p>Gestione las categorías y los servicios que se muestran en el sitio.</p>

                <div className="seccion">
                    <AdminCategoriasContainer
                        alCambiar={() => setVersionCategorias((v) => v + 1)}
                    />
                </div>

                <div className="seccion">
                    <AdminServiciosContainer versionCategorias={versionCategorias} />
                </div>
            </section>
        </Layout>
    )
}
