// Utilidades usadas por la página de administración (/administracion)

// Convierte un nombre en un identificador para la URL: "Nutrición deportiva" → "nutricion-deportiva"
export function generarSlug(texto) {
    return texto
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export function validarRequerido(texto, mensajeError) {
    return texto.trim() === "" ? mensajeError : "";
}

export function validarUrl(texto) {
    if (texto.trim() === "") {
        return "La URL de la imagen es obligatoria.";
    }
    try {
        const url = new URL(texto.trim());
        if (url.protocol !== "http:" && url.protocol !== "https:") {
            return "La URL debe comenzar con http:// o https://.";
        }
    } catch {
        return "Ingrese una URL válida.";
    }
    return "";
}

// El backend guarda el precio como INTEGER (pesos chilenos, sin decimales)
export function validarPrecio(texto) {
    if (texto.trim() === "") {
        return "El precio es obligatorio.";
    }
    const numero = Number(texto);
    if (!Number.isInteger(numero) || numero < 0) {
        return "Ingrese un precio entero en pesos, mayor o igual a 0.";
    }
    return "";
}

// GET /servicios devuelve la columna "categoria_id", mientras que POST y PUT usan "categoriaId".
// Unificamos el nombre para que el resto de la página trabaje siempre con "categoriaId".
export function normalizarServicio(servicio) {
    return {
        ...servicio,
        categoriaId: servicio.categoriaId ?? servicio.categoria_id,
    };
}
