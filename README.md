# Centro Nutrivida — Frontend

Aplicación web de Centro Nutrivida desarrollada con React y Vite. Se conecta al backend mediante una API REST para consultar los servicios y categorías del centro, gestionar reservas y acceder a las funcionalidades de usuario.

## 1. Requisitos previos

- Node.js y npm.
- NVM (opcional, recomendado para administrar versiones de Node.js).
- Backend de Centro Nutrivida configurado y en ejecución.
- Windows o Linux.

Todos los comandos del frontend deben ejecutarse desde la carpeta raíz del proyecto, donde se encuentra `package.json`.

## 2. Verificar y actualizar Node.js

Si ya realizaste la instalación o actualización de Node.js al configurar el backend, no es necesario repetirla. Comprueba las versiones disponibles:

```bash
node -v
npm -v
```

Si necesitas instalar o actualizar Node.js, utiliza una versión LTS reciente compatible con Vite 8 (por ejemplo, Node.js 22.12 o superior dentro de la rama 22, o la rama 24 LTS).

### Windows (NVM for Windows)

```powershell
nvm install lts
nvm use lts
```

### Linux (NVM)

```bash
nvm install --lts
nvm use --lts
```

> Node.js 22.11.0, mencionado en la configuración del backend, es anterior al mínimo de la rama 22 requerido por Vite 8. Se recomienda utilizar una LTS compatible para ambos proyectos.

## 3. Instalar las dependencias

La primera vez que ejecutes el frontend, instala sus dependencias:

```bash
npm install
```

También puedes utilizar `npm i`, que es equivalente.

Aunque hayas instalado las dependencias del backend, este paso debe realizarse por separado en la carpeta del frontend. Si ya están instaladas, puedes omitirlo, salvo que aparezcan errores relacionados con dependencias.

## 4. Configurar el archivo `.env`

Crea un archivo llamado `.env` en la raíz del frontend, al mismo nivel que `package.json` y `vite.config.js`.

Agrega la siguiente línea:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

Esta variable permite que el frontend se conecte a la API del backend y obtenga los servicios y demás datos.

**Importante:** verifica que el archivo se llame `.env` y no `.env.txt`. Si modificas este archivo mientras Vite está ejecutándose, reinicia el servidor de desarrollo.

## 5. Levantar el backend

Antes de ejecutar el frontend, asegúrate de que el backend esté configurado, con la base de datos inicializada y disponible en el puerto `3000`.

Abre una terminal en la carpeta del backend y ejecuta:

```bash
node server.js
```

Si es la primera ejecución, sigue previamente las instrucciones del README del backend.

Mantén esa terminal abierta mientras utilizas el frontend.

## 6. Levantar el frontend

Abre otra terminal en la carpeta raíz del frontend y ejecuta:

```bash
npm run dev
```

Este comando funciona tanto en Windows como en Linux.

Abre en el navegador la dirección que indique Vite. Normalmente es:

[http://localhost:5173](http://localhost:5173)

## 7. Solución de problemas

| Problema | Solución |
| --- | --- |
| `npm run dev` no funciona | Ejecutar `npm install` y volver a intentar. |
| Error de compatibilidad con Node.js | Actualizar a una versión LTS compatible y verificar con `node -v`. |
| No aparecen los servicios o categorías | Revisar el archivo `.env` y comprobar que el backend esté ejecutándose. |
| No se puede conectar con la API | Verificar el puerto `3000`, la URL de la API y posibles errores de CORS en la consola del navegador (F12). |
| Los cambios del `.env` no se reflejan | Detener Vite con `Ctrl + C` y ejecutar nuevamente `npm run dev`. |

## 8. Comandos adicionales (opcional)

| Comando | Descripción |
| --- | --- |
| `npm run build` | Genera la compilación de producción. |
| `npm run preview` | Permite visualizar la compilación de producción localmente. |
| `npm run lint` | Ejecuta ESLint para revisar el código. |
| `npm run test` | Ejecuta las pruebas con Vitest. |
| `npm run cov` | Ejecuta las pruebas y genera un informe de cobertura. |

## Resumen para ejecuciones posteriores

Si ambos proyectos ya están configurados y sus dependencias instaladas, basta con abrir dos terminales:

**Terminal 1 — Backend**

```bash
node server.js
```

**Terminal 2 — Frontend**

```bash
npm run dev
```

Mantén ambas terminales abiertas durante el uso de la aplicación.
