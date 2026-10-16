

export function Header() {
    return (
        <header>
            <div className="contenedor encabezado">
                <img src="img/logo.png" width="150" alt="Logo NutriVida" />

                <nav aria-label="Navegación principal">
                    <ul>
                        <li><a href="index.html">Inicio</a></li>
                        <li><a href="login.html">Login</a></li>
                        <li><a href="registro.html">Registro</a></li>
                        <li><a href="contacto.html">Contacto</a></li>

                    </ul>
                </nav>

                <p id="usuario-actual"></p>

                <button id="btn-carrito" className="btn-carrito">
                    Reserva de hora (<span id="contador-carrito">0</span>)
                </button>
            </div>
        </header>
    )
}
