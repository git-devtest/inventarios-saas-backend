# Guía para Probar Endpoint Kardex - Consultas por Tabla

## 📍 Parámetros Requeridos para GET /inventarios/kardex

| Parámetro | Tipo | Obligatorio | Descripción |
|-----------|------|-------------|-------------|
| `producto_id` | UUID | ✅ Sí | ID del producto a consultar |
| `almacen_id` | UUID | ✅ Sí | ID del almacén donde se consultará el stock |
| `fecha_inicio` | ISO 8601 | ❌ No | Fecha inicial del rango (ej: 2024-01-01T00:00:00Z) |
| `fecha_fin` | ISO 8601 | ❌ No | Fecha final del rango (ej: 2024-12-31T23:59:59Z) |

---

## 🗄️ Obtener los IDs de las Tablas

### 1️⃣ Obtener `producto_id` de la tabla `productos`

**Query SQL:**
```sql
SELECT id, codigo, nombre, empresa_id 
FROM productos 
WHERE empresa_id = 'YOUR_EMPRESA_ID' 
AND activo = true
LIMIT 10;
```

**En Prisma/Node.js:**
```javascript
const productos = await prisma.producto.findMany({
  where: {
    empresa_id: 'YOUR_EMPRESA_ID',
    activo: true
  },
  select: {
    id: true,
    codigo: true,
    nombre: true,
    empresa_id: true
  },
  take: 10
});
```

**Estructura de la tabla `productos`:**
```
Tabla: productos
├── id (UUID) ← USAR ESTE EN POSTMAN
├── codigo (String) - Código único del producto
├── nombre (String) - Nombre del producto
├── empresa_id (UUID) - ID de tu empresa
├── descripcion (String)
├── requiere_lote (Boolean)
├── requiere_serie (Boolean)
├── activo (Boolean)
└── ... otros campos
```

**Ejemplo de resultado:**
```
id: 550e8400-e29b-41d4-a716-446655440001
codigo: LAP-001
nombre: Laptop Dell XPS 13
empresa_id: f47ac10b-58cc-4372-a567-0e02b2c3d479
```

---

### 2️⃣ Obtener `almacen_id` de la tabla `almacenes`

**Query SQL:**
```sql
SELECT id, nombre, codigo, empresa_id 
FROM almacenes 
WHERE empresa_id = 'YOUR_EMPRESA_ID' 
AND activo = true
LIMIT 10;
```

**En Prisma/Node.js:**
```javascript
const almacenes = await prisma.almacen.findMany({
  where: {
    empresa_id: 'YOUR_EMPRESA_ID',
    activo: true
  },
  select: {
    id: true,
    codigo: true,
    nombre: true,
    empresa_id: true
  },
  take: 10
});
```

**Estructura de la tabla `almacenes`:**
```
Tabla: almacenes
├── id (UUID) ← USAR ESTE EN POSTMAN
├── codigo (String) - Código único del almacén
├── nombre (String) - Nombre del almacén
├── empresa_id (UUID) - ID de tu empresa
├── ubicacion (String)
├── activo (Boolean)
└── ... otros campos
```

**Ejemplo de resultado:**
```
id: b5ac10b-58cc-4372-a567-0e02b2c3d470
codigo: ALM-PRIN
nombre: Almacén Principal
empresa_id: f47ac10b-58cc-4372-a567-0e02b2c3d479
```

---

## ✅ Construir la URL Correcta

Una vez tengas los IDs, construye la URL así:

### Opción 1: Sin Fechas (Kardex Completo)
```
GET /api/inventarios/kardex?producto_id=550e8400-e29b-41d4-a716-446655440001&almacen_id=b5ac10b-58cc-4372-a567-0e02b2c3d470
```

### Opción 2: Con Rango de Fechas
```
GET /api/inventarios/kardex?producto_id=550e8400-e29b-41d4-a716-446655440001&almacen_id=b5ac10b-58cc-4372-a567-0e02b2c3d470&fecha_inicio=2024-01-01T00:00:00Z&fecha_fin=2024-12-31T23:59:59Z
```

---

## 🔍 Cómo en Postman

### 1. URL en Postman
```
{{base_url}}/inventarios/kardex
```

### 2. Parámetros Query
Abre la sección **Params** en Postman y agrega:

| Key | Value |
|-----|-------|
| `producto_id` | `550e8400-e29b-41d4-a716-446655440001` |
| `almacen_id` | `b5ac10b-58cc-4372-a567-0e02b2c3d470` |
| `fecha_inicio` | `2024-01-01T00:00:00Z` (opcional) |
| `fecha_fin` | `2024-12-31T23:59:59Z` (opcional) |

### 3. Headers
```
Authorization: Bearer {{token}}
Content-Type: application/json
```

### 4. Body
**Vacío** - Los parámetros van en URL, no en body

---

## 📊 Response Esperado

```json
{
  "producto": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "nombre": "Laptop Dell XPS 13",
    "codigo": "LAP-001"
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
      "observacion": "Entrada desde proveedor"
    },
    {
      "fecha": "2025-12-24T23:55:00.000Z",
      "tipo": "SALIDA",
      "entrada": 0,
      "salida": 5,
      "saldo": 45,
      "lote": "LOTE-2024-12-01",
      "usuario": "María García",
      "observacion": "Salida a cliente"
    }
  ],
  "saldo_final": 45
}
```

---

## 🛠️ Obtener IDs Rápidamente

### Opción A: Usar tu Base de Datos Directamente
```bash
# Si usas psql
psql -U usuario -d inventarios_db

# Luego ejecuta:
SELECT id, nombre FROM productos WHERE activo = true LIMIT 5;
SELECT id, nombre FROM almacenes WHERE activo = true LIMIT 5;
```

### Opción B: Usar un Endpoint Existente
Si tienes endpoints de productos y almacenes:

**Listar productos:**
```
GET /api/productos
Authorization: Bearer {{token}}
```

**Listar almacenes:**
```
GET /api/almacenes
Authorization: Bearer {{token}}
```

---

## 📝 Validaciones Importantes

✅ **Validaciones que hace el endpoint:**
- `producto_id` debe ser UUID válido
- `almacen_id` debe ser UUID válido
- `fecha_inicio` y `fecha_fin` deben ser ISO 8601 (si se proporcionan)
- El producto debe existir en la empresa
- El almacén debe existir en la empresa
- Solo se muestran movimientos confirmados

❌ **Errores Comunes:**

| Error | Causa | Solución |
|-------|-------|----------|
| "Movimiento no encontrado" | No hay movimientos para esa combinación | Crea movimientos primero (ver GUIA-POSTMAN.md) |
| "producto_id must be a UUID" | ID formato inválido | Copia exactamente el UUID de la BD |
| "almacen_id must be a UUID" | ID formato inválido | Copia exactamente el UUID de la BD |
| "must be a valid ISO 8601 date string" | Formato de fecha inválido | Usa formato: 2024-12-31T23:59:59Z |

---

## 📋 Checklist Previo

Antes de probar el kardex, asegúrate de:

- [ ] Tener al menos 1 producto creado y activo
- [ ] Tener al menos 1 almacén creado y activo
- [ ] Haber creado movimientos confirmados (ver GUIA-POSTMAN.md)
- [ ] Tener el token JWT válido y no expirado
- [ ] Tener copiadoss los UUIDs exactos de producto y almacén

---

## 🔗 Flujo Completo de Prueba

```
1. GET /productos → Copiar 'id' de un producto
           ↓
2. GET /almacenes → Copiar 'id' de un almacén
           ↓
3. POST /movimientos → Crear movimiento (ver GUIA-POSTMAN.md)
           ↓
4. POST /movimientos/:id/detalles → Agregar producto
           ↓
5. PATCH /movimientos/:id/confirmar → Confirmar (aplica stock)
           ↓
6. GET /kardex?producto_id=xxx&almacen_id=yyy → Ver kardex con el movimiento
```

---

## 💡 Tips

- **Sin datos**: Si no hay movimientos confirmados para esa combinación, obtendrás un array vacío de movimientos
- **Rango de fechas**: Si especificas rango, solo se mostrarán movimientos dentro de ese rango
- **Stock calculado**: El saldo se calcula en tiempo real desde los movimientos confirmados
- **Lote**: Se muestra el lote/serie si el movimiento los tiene

---

Si aún tienes dudas sobre qué valores usar, puedo ayudarte con:
1. Query SQL específica para tu BD
2. Script Postman para obtener los IDs automáticamente
3. Debug de qué valores estás enviando
