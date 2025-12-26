# Guía de Prueba - Endpoints de Inventarios

## Configuración Inicial en Postman

### Pre-request Script (Global o Collection)

```javascript
// Generar timestamp ISO 8601 para fecha_movimiento
let timestamp = new Date().toJSON();
pm.environment.set('timestamp', timestamp);

// Configurar headers comunes
pm.request.headers.add({
  key: 'Authorization',
  value: 'Bearer {{token}}'
});

pm.request.headers.add({
  key: 'Content-Type', 
  value: 'application/json'
});
```

### Variables de Entorno Necesarias

Crear estas variables en Postman:
- `base_url`: `http://localhost:3000/api`
- `token`: Tu token JWT válido
- `timestamp`: Se establece automáticamente en pre-request

---

## 1️⃣ CREAR MOVIMIENTO (POST)

### URL
```
POST {{base_url}}/inventarios/movimientos
```

### Headers
```
Authorization: Bearer {{token}}
Content-Type: application/json
```

### Body (JSON)
```json
{
  "tipo_movimiento_id": "550e8400-e29b-41d4-a716-446655440001",
  "almacen_origen_id": "550e8400-e29b-41d4-a716-446655440002",
  "fecha_movimiento": "{{timestamp}}",
  "observacion": "Entrada de mercadería desde proveedor ABC"
}
```

### ✅ Campos Requeridos
- `tipo_movimiento_id`: UUID del tipo de movimiento (ENTRADA, SALIDA, TRANSFERENCIA)
- `almacen_origen_id`: UUID del almacén de origen

### ✅ Campos Opcionales
- `ubicacion_origen_id`: UUID de ubicación específica en el almacén
- `almacen_destino_id`: Requerido solo si es TRANSFERENCIA
- `ubicacion_destino_id`: Ubicación destino para TRANSFERENCIA
- `fecha_movimiento`: Fecha ISO 8601 (default: ahora)
- `observacion`: Notas sobre el movimiento

### 📍 Response Esperado (201)
```json
{
  "mensaje": "Movimiento creado en estado borrador",
  "tipo": "ENTRADA",
  "almacen_origen": "Almacén Principal",
  "almacen_destino": null,
  "detalles": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "empresa_id": "empresa-123",
    "tipo_movimiento_id": "550e8400-e29b-41d4-a716-446655440001",
    "estado": "borrador",
    "fecha_movimiento": "2025-12-24T23:50:23.873Z",
    "observacion": "Entrada de mercadería desde proveedor ABC"
  }
}
```

### ❌ Error Común
```json
{
  "success": false,
  "statusCode": 400,
  "message": [
    "ubicacion_origen_id must be a UUID",
    "fecha_movimiento must be a valid ISO 8601 date string"
  ]
}
```

**Solución**: No incluyas `ubicacion_origen_id` si no tienes un UUID válido. Es opcional y puede omitirse.

---

## 2️⃣ AGREGAR PRODUCTO AL MOVIMIENTO (POST)

### URL
```
POST {{base_url}}/inventarios/movimientos/{{movimiento_id}}/detalles
```

> Reemplazar `{{movimiento_id}}` con el ID obtenido en el paso anterior

### Headers
```
Authorization: Bearer {{token}}
Content-Type: application/json
```

### Body (JSON)
```json
{
  "producto_id": "c6ac10b-58cc-4372-a567-0e02b2c3d472",
  "producto_unidad_medida_id": "d8ac10b-58cc-4372-a567-0e02b2c3d473",
  "cantidad": 50.00,
  "lote": "LOTE-2024-12-01",
  "observacion_detalle": "Stock verificado, sin daños"
}
```

### ✅ Campos Requeridos
- `producto_id`: UUID del producto
- `producto_unidad_medida_id`: UUID de la unidad de medida
- `cantidad`: Número mayor a 0

### ✅ Campos Opcionales
- `lote`: Número de lote (obligatorio si producto requiere lote)
- `serie`: Número de serie (obligatorio si producto requiere serie)
- `observacion_detalle`: Notas sobre este producto específico

### 📍 Response Esperado (201)
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
    "lote": "LOTE-2024-12-01"
  }
}
```

---

## 3️⃣ CONFIRMAR MOVIMIENTO (PATCH)

### URL
```
PATCH {{base_url}}/inventarios/movimientos/{{movimiento_id}}/confirmar
```

### Headers
```
Authorization: Bearer {{token}}
Content-Type: application/json
```

### Body
**Vacío** (no se envía body en este endpoint)

### 📍 Response Esperado (200)
```json
{
  "mensaje": "Movimiento confirmado exitosamente",
  "tipo": "ENTRADA",
  "productos": 1,
  "fecha_confirmacion": "2025-12-24T23:55:00.000Z",
  "detalles": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "estado": "confirmado",
    "fecha_confirmacion": "2025-12-24T23:55:00.000Z"
  }
}
```

### ⚠️ Validaciones
- Movimiento debe estar en estado "borrador"
- Debe tener al menos 1 detalle agregado
- Si es SALIDA o TRANSFERENCIA: debe haber stock disponible

---

## 4️⃣ LISTAR MOVIMIENTOS (GET)

### URL
```
GET {{base_url}}/inventarios/movimientos
```

### Headers
```
Authorization: Bearer {{token}}
```

### 📍 Response Esperado (200)
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "empresa_id": "empresa-123",
    "tipo_movimiento_id": "550e8400-e29b-41d4-a716-446655440001",
    "estado": "confirmado",
    "fecha_movimiento": "2025-12-24T23:50:23.873Z",
    "tipo_movimiento": {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "nombre": "ENTRADA"
    },
    "almacen_origen": {
      "id": "550e8400-e29b-41d4-a716-446655440002",
      "nombre": "Almacén Principal"
    },
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

## 5️⃣ OBTENER DETALLE DE UN MOVIMIENTO (GET)

### URL
```
GET {{base_url}}/inventarios/movimientos/{{movimiento_id}}
```

### Headers
```
Authorization: Bearer {{token}}
```

### 📍 Response Esperado (200)
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "empresa_id": "empresa-123",
  "tipo_movimiento_id": "550e8400-e29b-41d4-a716-446655440001",
  "almacen_origen_id": "550e8400-e29b-41d4-a716-446655440002",
  "estado": "confirmado",
  "fecha_movimiento": "2025-12-24T23:50:23.873Z",
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
  "detalles": [
    {
      "id": "660f9501-f30c-52e5-b827-557766551111",
      "producto_id": "c6ac10b-58cc-4372-a567-0e02b2c3d472",
      "cantidad": 50,
      "lote": "LOTE-2024-12-01",
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

## 6️⃣ CONSULTAR STOCK (GET)

### URL
```
GET {{base_url}}/inventarios/stock?producto_id=c6ac10b-58cc-4372-a567-0e02b2c3d472&almacen_id=550e8400-e29b-41d4-a716-446655440002
```

### Query Parameters (Opcionales)
- `producto_id`: UUID del producto (opcional)
- `almacen_id`: UUID del almacén (opcional)
- `ubicacion_id`: UUID de la ubicación (opcional)

### Headers
```
Authorization: Bearer {{token}}
```

### 📍 Response Esperado (200)
```json
[
  {
    "producto": {
      "id": "c6ac10b-58cc-4372-a567-0e02b2c3d472",
      "nombre": "Laptop Dell XPS 13",
      "codigo": "LAP-DELL-001"
    },
    "almacen_id": "550e8400-e29b-41d4-a716-446655440002",
    "almacen": {
      "id": "550e8400-e29b-41d4-a716-446655440002",
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

## 7️⃣ CONSULTAR KARDEX (GET)

### URL
```
GET {{base_url}}/inventarios/kardex?producto_id=c6ac10b-58cc-4372-a567-0e02b2c3d472&almacen_id=550e8400-e29b-41d4-a716-446655440002&fecha_inicio=2024-01-01T00:00:00Z&fecha_fin=2024-12-31T23:59:59Z
```

### Query Parameters
- `producto_id`: UUID del producto (requerido)
- `almacen_id`: UUID del almacén (requerido)
- `fecha_inicio`: Fecha ISO 8601 (opcional)
- `fecha_fin`: Fecha ISO 8601 (opcional)

### Headers
```
Authorization: Bearer {{token}}
```

### 📍 Response Esperado (200)
```json
{
  "producto": {
    "id": "c6ac10b-58cc-4372-a567-0e02b2c3d472",
    "nombre": "Laptop Dell XPS 13",
    "codigo": "LAP-DELL-001"
  },
  "movimientos": [
    {
      "fecha": "2025-12-24T23:50:23.873Z",
      "tipo": "ENTRADA",
      "entrada": 50,
      "salida": 0,
      "saldo": 50,
      "lote": "LOTE-2024-12-01",
      "usuario": "Juan Pérez",
      "observacion": "Entrada de mercadería desde proveedor ABC"
    }
  ],
  "saldo_final": 50
}
```

---

## 8️⃣ ANULAR MOVIMIENTO (PATCH)

### URL
```
PATCH {{base_url}}/inventarios/movimientos/{{movimiento_id}}/anular
```

### Headers
```
Authorization: Bearer {{token}}
Content-Type: application/json
```

### Body (JSON)
```json
{
  "motivo": "Entrada duplicada, se debe anular"
}
```

### ✅ Campos Requeridos
- `motivo`: Razón de la anulación

### 📍 Response Esperado (200)
```json
{
  "mensaje": "Movimiento anulado correctamente",
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "motivo": "Entrada duplicada, se debe anular",
  "detalles": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "estado": "anulado"
  }
}
```

---

## Troubleshooting

### Error: "ubicacion_origen_id must be a UUID"
**Solución**: No incluyas este campo si no tienes un UUID válido. Es completamente opcional.

```json
// ❌ Incorrecto
{
  "tipo_movimiento_id": "...",
  "almacen_origen_id": "...",
  "ubicacion_origen_id": null,
  "fecha_movimiento": "2025-12-24T23:50:23.873Z"
}

// ✅ Correcto
{
  "tipo_movimiento_id": "...",
  "almacen_origen_id": "...",
  "fecha_movimiento": "2025-12-24T23:50:23.873Z"
}
```

### Error: "fecha_movimiento must be a valid ISO 8601 date string"
**Solución**: Asegúrate de que el timestamp sea ISO 8601 válido. En Postman, usa:

```javascript
// En pre-request script
let timestamp = new Date().toJSON();
pm.environment.set('timestamp', timestamp);
```

Luego en el body:
```json
{
  "fecha_movimiento": "{{timestamp}}"
}
```

### Error: "Movimiento no encontrado"
**Solución**: Verifica que:
1. El `movimiento_id` en la URL sea correcto
2. El movimiento pertenezca a tu empresa
3. Uses el token del usuario correcto

### Error: "Stock insuficiente"
**Solución**: 
1. Consulta el stock actual con GET `/stock`
2. Asegúrate de tener cantidad suficiente disponible
3. Verifica que no haya movimientos en borrador sin confirmar que reduzcan el stock
