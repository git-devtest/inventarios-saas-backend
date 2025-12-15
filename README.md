# Inventarios SaaS

![Node.js](https://img.shields.io/badge/Node-20-339933)
![NestJS](https://img.shields.io/npm/v/@nestjs/core.svg?label=NestJS)
![Prisma](https://img.shields.io/npm/v/prisma.svg?label=Prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue.svg)
![Docker](https://img.shields.io/badge/Docker-27-blue.svg)
![Docker Compose](https://img.shields.io/badge/Docker%20Compose-2-blue.svg)
![JWT](https://img.shields.io/badge/Auth-JWT-orange.svg)
![Swagger](https://img.shields.io/badge/API-Swagger-green.svg)
![Winston](https://img.shields.io/npm/v/winston.svg?label=Winston)
![Jest](https://img.shields.io/npm/v/jest.svg?label=Jest)

Sistema SaaS de gestión de inventarios orientado a pequeñas y medianas empresas, inspirado en la filosofía modular de ERP como SAP, pero con una arquitectura ligera, escalable y mantenible.

El sistema está diseñado para ser multiempresa, con múltiples almacenes, ubicaciones internas y control de inventario tipo Kardex.

## Arquitectura General
- Backend: Node.js + NestJS 
- ORM: Prisma
- Base de datos: PostgreSQL
- Infraestructura: Docker & Docker Compose
- Autenticación: JWT
- Documentación API: Swagger (OpenAPI)
- Logs: Winston
- Testing: Jest

## Estructura del Proyecto
```bash
inventarios-saas/
│
├── backend/            # API NestJS
│ ├── prisma/           # Schema y migraciones
│ ├── src/              # Código fuente
│ └── test/             # Tests unitarios e integración
│
├── docs/               # Documentación funcional y técnica
│
├── .gitignore          # Archivos ignorados por git
├── docker-compose.yml  # Infraestructura local
├── .env                # Variables de entorno (NO subir a git)
└── README.md           # Usted está aquí
```

## Requisitos del Sistema
```bash
requirements.txt
```

## Variables de Entorno
Ejemplo mínimo del archivo .env:
```bash
POSTGRES_USER=usuario_de_la_base_de_datos
POSTGRES_PASSWORD=contraseña_de_la_base_de_datos
POSTGRES_DB=nombre_de_la_base_de_datos

DATABASE_URL=postgresql://usuario_de_la_base_de_datos:contraseña_de_la_base_de_datos@postgres:5432/nombre_de_la_base_de_datos

JWT_SECRET=clave_super_secreta_de_128_bits
JWT_EXPIRES_IN=1h
TZ=America/Bogota
```

## Inicialización del Proyecto
1. Levantar infraestructura
```bash
docker compose up -d
```
2. Acceder al contenedor backend
```bash
docker exec -it inventarios_backend sh
```
3. Ejecutar migraciones
```bash
npx prisma migrate dev
```

## Documentación API (Swagger)
Una vez levantado el backend:
```bash
http://localhost:3000/api-docs
```
Incluye:
- Autenticación
- Autorización por roles
- Endpoints versionados
- Pruebas interactivas

## Logs (Winston)
El sistema implementa logs estructurados con niveles:
- error
- warn
- info
- debug

Los logs están preparados para integrarse con soluciones externas (ELK, CloudWatch, etc.).

## Testing
Framework: Jest
Tipos de pruebas:
- Unitarias
- Integración

Ejecutar:
```bash
npm run test
```

## Convenciones de Commits
- Tipo en inglés (convención): feat, fix, chore, docs, test   
- Descripción en español   
Ejemplo:
```bash
feat: agregar modelo Usuario con relaciones a Empresa y Rol
fix: corregir error de autenticación
chore: actualizar dependencias
docs: agregar documentación inicial del proyecto
style: mejorar formato del código
refactor: refactorizar código
test: agregar pruebas
```

## Estado del Proyecto
Actualmente implementado:
- Infraestructura base
- Modelos: Empresa, Rol, Usuario
- Migraciones versionadas

Próximo bloque:
- Seed inicial
- Autenticación
- Módulo Inventarios (Kardex)

## Contacto

- Autor: [Jhon Harold Hincapie](https://github.com/git-devtest)
- Website - [Portfolio](https://git-devtest.github.io/my-portfolio/)
- LinkedIn - [Jhon Harold Hincapie](https://www.linkedin.com/in/jhonharoldhincapie/)

## Licencia
Proyecto educativo / profesional. Uso interno.