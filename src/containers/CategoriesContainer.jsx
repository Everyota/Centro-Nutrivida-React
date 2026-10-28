
import { CategoriesGrid } from "../components/organisms/CategoriesGrid";
import { categorias } from "../data/categorias";

export function CategoriesContainer() {
    
    return (
        <CategoriesGrid categories={categorias} />
    )
}