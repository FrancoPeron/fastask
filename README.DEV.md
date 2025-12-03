# Instrucciones de desarrollo

Guía para desarrollar, construir y mantener el proyecto FastTask localmente.

## Requisitos

- **pnpm** (recomendado) o npm/yarn
- Node.js 18+ (incluido con pnpm/npm)

## Instalación rápida

```powershell
pnpm install
# o con npm
npm install
```

## Comandos disponibles

### Desarrollo

```powershell
pnpm run dev
```

Inicia el servidor de desarrollo (Vite) en `http://localhost:5173/`.

### Build (Producción)

```powershell
pnpm run build
```

Genera la app optimizada en la carpeta `dist/`.

### Lint & Formateo

```powershell
# Detectar problemas y corregir automáticamente
pnpm run lint

# Formatear código según Prettier
pnpm run format
```

## Cambios realizados en esta sesión

### 1. Actualización de dependencias
- `vite` → `^5.0.0` (de `^2.9.2`)
- `sass` → `^1.70.0` (de `^1.50.0`)
- ESLint → `^9.39.1` (configuración moderna)
- Prettier → `^3.7.3` (para formateo consistente)

### 2. Reestructuración del código

Los archivos JavaScript se reorganizaron en una estructura modular:

```
src/
├── main.js              # Punto de entrada (inicializa Quill y MicroModal)
├── components/
│   ├── text.js         # Componente de texto
│   ├── todo.js         # Componente de tareas
│   ├── document.js     # Componente de documento
│   └── image.js        # Componente de imagen
├── utils/
│   └── dragEvents.js   # Lógica de drag & drop (exportada)
└── styles/
    └── base.css        # Estilos base (si aplica)
```

**Cambio en `index.html`:**

- Antes: múltiples `<script type="module" src="./js/*">` + `./main.js`
- Ahora: un único `<script type="module" src="/src/main.js">`

Los archivos antiguos fueron movidos a `backup_js/` (no eliminados, por seguridad).

### 3. Limpieza de código

- Eliminados `console.log()` y mensajes de debug innecesarios en todos los módulos.
- Convertidos algunos `console.log()` a `console.error()` para errores reales.
- Removidas variables no usadas (detectadas con ESLint).
- Código formateado consistentemente con Prettier.

### 4. Cambios de UI

- **Eliminado header superior** (logo + navbar) dejando solo la caja de herramientas izquierda.
- Ajustado `style.css` para que el tablero (`board`) ocupe el 100% del alto sin el header.

### 5. Configuración de herramientas

- **ESLint** (v9): configuración en `eslint.config.js` (nuevo formato)
  - Detecta imports no usados
  - Globals del navegador (fetch, localStorage, etc.) preconfigurados
  - `no-console` desactivado (permite logs)

- **Prettier**: configuración en `.prettierrc`
  - Print width: 100 caracteres
  - Indentación: 2 espacios
  - Semicolons habilitados

- **.gitignore**: añadido con entradas comunes (node_modules/, dist/, .env, etc.)

## Estructura final

```
fastask/
├── index.html
├── main.js              ❌ (movido a backup_js/)
├── style.css
├── package.json
├── eslint.config.js     ✅ (nuevo)
├── .eslintrc.cjs        (obsoleto, usar eslint.config.js)
├── .prettierrc           ✅
├── .gitignore           ✅
├── src/
│   ├── main.js          ✅ (nuevo punto de entrada)
│   ├── components/      ✅ (nuevo)
│   ├── utils/           ✅ (nuevo)
│   └── styles/
├── js/                  ❌ (movido a backup_js/)
├── backup_js/           📦 (archivos antiguos, para referencia)
├── dist/                (generado por build)
├── assets/
├── views/
├── README.md
├── README.DEV.md        ✅ (este archivo, actualizado)
└── ...
```

## Próximos pasos recomendados

1. **Tests**: Añadir tests unitarios (Vitest) para componentes críticos.
2. **CI/CD**: Crear workflow de GitHub Actions para ejecutar lint + build en PRs.
3. **Refactorización**: Continuar mejorando nombres de variables y funciones.
4. **Cleanup**: Eliminar `backup_js/` si estás seguro de que no necesitas los archivos antiguos.

## Verificación

Para confirmar que todo está funcionando:

```powershell
# 1. Instalar dependencias
pnpm install

# 2. Correr lint (sin errores)
pnpm run lint
# Salida esperada: sin errores, solo "✨ done" o similar

# 3. Formatear
pnpm run format

# 4. Construir (debe generar dist/ sin errores)
pnpm run build
# Salida esperada: "✓ built in Xms"

# 5. Iniciar servidor de desarrollo
pnpm run dev
# Abre http://localhost:5173/ en tu navegador
```

## Notas finales

- **Sin cambios funcionales**: La app sigue funcionando exactamente igual que antes; solo mejoró la estructura y se eliminó código muerto.
- **Backward compatible**: Los datos guardados en `localStorage` se preservan.
- **Lightweight**: Sin frameworks pesados, usando vanilla JS + Web Components.
- **Al día**: Librerías actualizadas y configuraciones modernas (ESLint v9).

¡Listo para continuar mejorando el proyecto! 🚀

