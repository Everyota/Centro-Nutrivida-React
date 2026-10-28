import { RegisterContainer } from "../../containers/RegisterContainer";
import { Layout } from "../templates/Layout";

export function RegisterPage() {

    return (
        <Layout>
            <section id="login" class="seccion seccion-gris">
                <div class="contenedor formulario-contenedor">
                    <h2>Registro</h2>
                    <RegisterContainer />
                </div>
            </section>
        </Layout>
    )
}
