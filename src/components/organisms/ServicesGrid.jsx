import { ServiceCard } from "../molecules/ServiceCard"

export function ServicesGrid({ services, agendar }) {

    return (
        <>
            {services.map((s) => (
                <ServiceCard
                    key={s.id}
                    servicio={s}
                    agendar={agendar}
                />
            ))}
        </>
    )
}
