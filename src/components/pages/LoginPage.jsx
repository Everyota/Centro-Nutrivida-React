import { Layout } from "../templates/Layout";
import { LoginContainer } from "../../containers/LoginContainer";

export function LoginPage() {

    return (
        <Layout>
            <section id="login" className="seccion seccion-gris">
                <div className="contenedor formulario-contenedor">
                    <h2>Iniciar sesión</h2>

                    <LoginContainer />
                </div>
            </section>
        </Layout>
    )
}
