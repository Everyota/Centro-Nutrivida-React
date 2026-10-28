import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";

//El children es para pasar elementos hijos dentro del componente Layout.
export function Layout({ children }) {
    return ( 
        <>
            {/* Cabecera de la página */}
            <Header/>
            <main>
                {/* Aquí children tendrán el contenido de la página */}
                {children}
            </main>
            {/* Pie de página */}
            <Footer/>
        </>

    )
}