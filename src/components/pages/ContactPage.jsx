import { ContactContainer } from "../../containers/ContactContainer"
import { Layout } from "../templates/Layout"

export function ContactPage() {

    return (
        <Layout>
            <section id="contacto" class="seccion contenedor">
                <div class="formulario-contenedor">
                    <h2>Contacto</h2>

                    <ContactContainer />
                </div>
            </section>
        </Layout>
    )
}
