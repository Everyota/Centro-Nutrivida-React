import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";

//El children es para pasar elementos hijos dentro del componente Layout.
export function Layout({ children }) {
    return ( 
        <>
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </>

    )
}