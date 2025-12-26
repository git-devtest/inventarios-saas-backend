# Endpoints del módulo de Inventarios

## Base URL
```
http://localhost:3000/api/inventarios
```

## Autenticación
Todos los endpoints requieren token JWT en header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 1. CREAR MOVIMIENTO (POST)
```
POST /inventarios/movimientos
Authorization: Bearer <token>
Content-Type: application/json

{
  "tipo_movimiento_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "almacen_origen_id": "b5ac10b-58cc-4372-a567-0e02b2c3d470",
  "almacen_destino_id": null,
  "ubicacion_origen_id": "a7ac10b-58cc-4372-a567-0e02b2c3d471",
  "fecha_movimiento": "2024-12-22T10:00:00Z",
  "observacion": "Entrada de mercadería nueva"
}
```

**Response 201:**
```json
{
  "mensaje": "Movimiento creado en estado borrador",
  "tipo": "ENTRADA",
  "almacen_origen": "Almacén Principal",
  "almacen_destino": null,
  "detalles": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "empresa_id": "empresa-123",
    "tipo_movimiento_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "estado": "borrador",
    "fecha_movimiento": "2024-12-22T10:00:00Z",
    "observacion": "Entrada de mercadería nueva"
  }
}
```

---

## 2. AGREGAR PRODUCTO AL MOVIMIENTO (POST)
```
POST /inventarios/movimientos/{movimiento_id}/detalles
Authorization: Bearer <token>
Content-Type: application/json

{
  "producto_id": "c6ac10b-58cc-4372-a567-0e02b2c3d472",
  "producto_unidad_medida_id": "d8ac10b-58cc-4372-a567-0e02b2c3d473",
  "cantidad": 50.00,
  "lote": "LOTE-2024-001",
  "serie": null,
  "observacion_detalle": "Producto en buen estado"
}
```

**Response 201:**
```json
{
  "mensaje": "Producto agregado al movimiento",
  "producto": "Laptop Dell XPS 13",
  "cantidad": 50,
  "unidad": "Un",
  "detalles": {
    "id": "660f9501-f30c-52e5-b827-557766551111",
    "movimiento_id": "550e8400-e29b-41d4-a716-446655440000",
    "producto_id": "c6ac10b-58cc-4372-a567-0e02b2c3d472",
    "cantidad": 50,
    "lote": "LOTE-2024-001"
  }
}
```

---

## 3. CONFIRMAR MOVIMIENTO (PATCH)
```
PATCH /inventarios/movimientos/{movimiento_id}/confirmar
Authorization: Bearer <token>
Content-Type: application/json
```

**Response 200:**
```json
{
  "mensaje": "Movimiento confirmado exitosamente",
  "tipo": "ENTRADA",
  "productos": 1,
  "fecha_confirmacion": "2024-12-22T10:15:00Z",
  "detalles": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "estado": "confirmado",
    "fecha_confirmacion": "2024-12-22T10:15:00Z"
  }
}
```

---

## 4. ANULAR MOVIMIENTO (PATCH)
```
PATCH /inventarios/movimientos/{movimiento_id}/anular
Authorization: Bearer <token>
Content-Type: application/json

{
  "motivo": "Error en la cantidad de entrada"
}
```

**Response 200:**
```json
{
  "mensaje": "Movimiento anulado correctamente",
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "motivo": "Error en la cantidad de entrada",
  "detalles": {
    "estado": "anulado"
  }
}
```

---

## 5. LISTAR TODOS LOS MOVIMIENTOS (GET)
```
GET /inventarios/movimientos
Authorization: Bearer <token>
```

**Response 200:**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "empresa_id": "empresa-123",
    "tipo_movimiento_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "estado": "confirmado",
    "fecha_movimiento": "2024-12-22T10:00:00Z",
    "tipo_movimiento": {
      "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      "nombre": "ENTRADA"
    },
    "almacen_origen": {
      "id": "b5ac10b-58cc-4372-a567-0e02b2c3d470",
      "nombre": "Almacén Principal"
    },
    "almacen_destino": null,
    "usuario": {
      "id": "user-001",
      "nombre": "Juan Pérez",
      "email": "juan@empresa.com"
    },
    "_count": {
      "detalles": 1
    }
  }
]
```

---

## 6. OBTENER DETALLE DE UN MOVIMIENTO (GET)
```
GET /inventarios/movimientos/{movimiento_id}
Authorization: Bearer <token>
```

**Response 200:**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "empresa_id": "empresa-123",
  "tipo_movimiento_id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "almacen_origen_id": "b5ac10b-58cc-4372-a567-0e02b2c3d470",
  "estado": "confirmado",
  "fecha_movimiento": "2024-12-22T10:00:00Z",
  "tipo_movimiento": {
    "nombre": "ENTRADA",
    "afecta_stock": 1,
    "requiere_destino": false
  },
  "almacen_origen": {
    "nombre": "Almacén Principal"
  },
  "usuario": {
    "nombre": "Juan Pérez",
    "email": "juan@empresa.com"
  },
  "usuario_confirmacion": {
    "nombre": "Juan Pérez"
  },
  "detalles": [
    {
      "id": "660f9501-f30c-52e5-b827-557766551111",
      "producto_id": "c6ac10b-58cc-4372-a567-0e02b2c3d472",
      "cantidad": 50,
      "lote": "LOTE-2024-001",
      "producto": {
        "id": "c6ac10b-58cc-4372-a567-0e02b2c3d472",
        "nombre": "Laptop Dell XPS 13",
        "codigo": "LAP-DELL-001"
      },
      "producto_unidad_medida": {
        "unidad_medida": {
          "nombre": "Unidad",
          "abreviatura": "Un"
        }
      }
    }
  ]
}
```

---

## 7. CONSULTAR STOCK ACTUAL (GET)
```
GET /inventarios/stock
Authorization: Bearer <token>
Content-Type: application/json

{
  "producto_id": "c6ac10b-58cc-4372-a567-0e02b2c3d472",
  "almacen_id": "b5ac10b-58cc-4372-a567-0e02b2c3d470",
  "ubicacion_id": null
}
```

**Response 200:**
```json
[
  {
    "producto": {
      "id": "c6ac10b-58cc-4372-a567-0e02b2c3d472",
      "nombre": "Laptop Dell XPS 13",
      "codigo": "LAP-DELL-001"
    },
    "almacen_id": "b5ac10b-58cc-4372-a567-0e02b2c3d470",
    "almacen": {
      "id": "b5ac10b-58cc-4372-a567-0e02b2c3d470",
      "nombre": "Almacén Principal"
    },
    "stock": 45.5,
    "unidad": {
      "id": "unit-001",
      "nombre": "Unidad",
      "abreviatura": "Un"
    }
  }
]
```

---

## 8. CONSULTAR KARDEX (GET)
```
GET /inventarios/kardex
Authorization: Bearer <token>
Content-Type: application/json

{
  "producto_id": "c6ac10b-58cc-4372-a567-0e02b2c3d472",
  "almacen_id": "b5ac10b-58cc-4372-a567-0e02b2c3d470",
  "fecha_inicio": "2024-01-01T00:00:00Z",
  "fecha_fin": "2024-12-31T23:59:59Z"
}
```

**Response 200:**
```json
{
  "producto": {
    "id": "c6ac10b-58cc-4372-a567-0e02b2c3d472",
    "nombre": "Laptop Dell XPS 13",
    "codigo": "LAP-DELL-001"
  },
  "movimientos": [
    {
      "fecha": "2024-01-10T09:00:00Z",
      "tipo": "ENTRADA",
      "entrada": 50,
      "salida": 0,
      "saldo": 50,
      "lote": "LOTE-2024-001",
      "usuario": "Juan Pérez",
      "observacion": "Entrada de mercadería nueva"
    },
    {
      "fecha": "2024-01-15T14:30:00Z",
      "tipo": "SALIDA",
      "entrada": 0,
      "salida": 4.5,
      "saldo": 45.5,
      "lote": "LOTE-2024-001",
      "usuario": "María García",
      "observacion": "Salida a cliente"
    }
  ],
  "saldo_final": 45.5
}
```

---

## Roles y Permisos

| Endpoint | Crear | Modificar | Listar | Consultar |
|----------|-------|-----------|--------|-----------|
| Crear Movimiento | Operador Almacén, Admin | - | - | - |
| Agregar Producto | Operador Almacén, Admin | - | - | - |
| Confirmar Movimiento | Operador Almacén, Admin | - | - | - |
| Anular Movimiento | Admin | - | - | - |
| Listar Movimientos | - | - | Todos | - |
| Ver Detalle | - | - | Todos | - |
| Consultar Stock | - | - | - | Todos |
| Consultar Kardex | - | - | - | Todos |

---

## Códigos de Error

| Código | Mensaje | Causa |
|--------|---------|-------|
| 400 | Stock insuficiente | No hay cantidad disponible para salida/transferencia |
| 400 | Tipo de movimiento requiere destino | No se especificó almacén_destino_id |
| 400 | Almacén de origen y destino iguales | Transfer a mismo almacén |
| 404 | Tipo de movimiento no encontrado | ID inválido |
| 404 | Almacén no encontrado | ID inválido |
| 404 | Producto no encontrado | ID inválido |
| 404 | Movimiento no encontrado | ID inválido |
| 400 | Movimiento no está en borrador | Solo se agregan detalles a movimientos en estado borrador |
| 400 | No se puede confirmar sin productos | El movimiento no tiene detalles |
