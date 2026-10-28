import { CategoryCard } from "../molecules/CategoryCard";

export function CategoriesGrid({ categories }) {

    return (
        <>
            {categories.map((c) => (
                <CategoryCard
                    key={c.id}
                    categoria={c}
                />
            ))}
        </>
    )
}
