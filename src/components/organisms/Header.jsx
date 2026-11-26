import { NavLink } from "react-router";
import { obtenerUsuario } from "../../utils/usuario";

export function Header() {
    // Obtenemos el usuario logeado desde localStorage, si es que hay
    const usuario = obtenerUsuario();
    return (
        <header>
            <div className="contenedor encabezado">
                <img src="/img/logo.png" width="150" alt="Logo NutriVida" />
                <nav aria-label="Navegación principal">
                    <ul>
                        {/* Usamos NavLink para navegar por ReactRouter */}
                        <li><NavLink to="/">Inicio</NavLink></li>
                        <li><NavLink to="/iniciar-sesion">Login</NavLink></li>
                        <li><NavLink to="/registro">Registro</NavLink></li>
                        <li><NavLink to="/contacto">Contacto</NavLink></li>

                    </ul>
                </nav>
                {
                    /* Si hay usuario en localStorage, lo mostramos aquí */
                    usuario && <p id="usuario-actual">¡Bienvenido/a {usuario.nombres}!</p>
                }

                <button id="btn-carrito" className="btn-carrito">
                    Reserva de hora (<span id="contador-carrito">0</span>)
                </button>
            </div>
        </header>
    )
}
