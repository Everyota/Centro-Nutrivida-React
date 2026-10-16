import { Layout } from "../templates/Layout";

export function HomePage() {
    return (
        <Layout>
            <section id="inicio" className="hero">
                <div className="contenedor">
                    <h2>Bienvenido a Nutrivida</h2>
                    <p>Nuestra clínica tiene como misión brindar una atención nutricional personalizada y cercana, acompañando a cada paciente en el logro de sus objetivos de salud y bienestar mediante planes alimenticios adaptados a sus necesidades y un seguimiento continuo.

                    </p>
                    <a href="#productos" className="boton">Ver servicios</a>
                </div>
            </section>

            <section id="productos" className="seccion contenedor">
                <h2>Servicios</h2>
                <p>Tenemos atenciones según tus necesidades</p>
                <div id="grilla-productos" className="grilla-productos"></div>
            </section>



            <aside id="panel-carrito" className="panel-carrito oculto" aria-label="Carrito de compras">
                <div className="panel-cabecera">
                    <h2>Mi carrito</h2>
                    <button id="cerrar-carrito" className="btn-cerrar" aria-label="Cerrar carrito">×</button>
                </div>

                <div id="lista-carrito"></div>

                <div className="resumen-carrito">
                    <strong>Total: $<span id="total-carrito">0</span></strong>
                    <button id="vaciar-carrito" className="boton boton-secundario">Vaciar carrito</button>
                </div>
            </aside>
        </Layout>
    )
}