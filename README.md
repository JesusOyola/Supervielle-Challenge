# Descripción del Proyecto

UserExplorer es una aplicación Angular construida con Angular 19, diseñada para explorar, filtrar y visualizar información de usuarios de forma dinámica y responsiva.
Consume una API REST de prueba, permite la navegación por lista de usuarios paginada, filtrado por nombre/email y compañía, y muestra detalles ampliados en un panel lateral (drawer), incluyendo las últimas publicaciones del usuario.

El proyecto hace uso de:

Angular Signals para manejo reactivo de estado local

Ng-Zorro Ant Design como librería de componentes UI

Stand-alone components

Paginación dinámica

Filtros combinados

Drawer lateral con información contextual

Test unitarios con Karma + Jasmine

Coverage de tests habilitado

# Funcionalidades Principales

✔ Listado de usuarios en tabla con diseño responsivo
✔ Filtro en tiempo real por:

Nombre

Email

Compañía (selector con reset automático)
✔ Paginación con mantenimiento del filtro activo
✔ Vista detallada de usuario en Drawer:

Datos personales

Email, teléfono y dirección

Compañía

Sitio web con enlace externo
✔ Visualización de las últimas 5 publicaciones del usuario
✔ Estilos personalizados SCSS
✔ Fondo contextual de página (dashboard style)
✔ Title centralizado

# Tecnologías Utilizadas

Angular 19 + Signals

Ng-Zorro Ant Design

TypeScript

RxJS

SCSS

Karma + Jasmine

ESLint

# Estructura del Código

Componentes standalone

Estado gestionado con signals (signal())

Funciones puras para filtrado y paginación

Servicios desacoplados para consumo de API

Obtener empresas dinámicamente con Set()

Código modular y escalable

# Instalaciòn de Dependencias

✔ nmp install

# Ejecutar el servidor de desarrollo

✔ npm start

# Tests y Cobertura

✔ npm run test

# Coverage:

✔ npm run test:coverage
✔ El reporte se genera en coverage/user-explorer/index.html
