# Módulo de Inventarios - Documentación Técnica

## Resumen Ejecutivo

El módulo de inventarios gestiona los movimientos de stock entre almacenes con un sistema de estados (borrador → confirmado → anulado). Permite crear movimientos, agregar productos, confirmar cambios de stock, y consultar el estado del inventario mediante stock actual y kardex.

---

## Arquitectura

```
InventariosModule
├── InventariosController (REST API)
├── InventariosService (Lógica de negocio)
├── DTOs (Validación de datos)
│   ├── CreateMovimientoDto
│   ├── AddDetalleDto
│   ├── FiltroStockDto
│   └── FiltroKardexDto
└── Modelos Prisma
    ├── MovimientoInventario
    ├── DetalleMovimiento
    ├── TipoMovimiento
    └── ProductoAlmacen
```

---

## Modelos de Datos

### MovimientoInventario
Define un movimiento de inventario con estado de ciclo de vida.

```typescript
{
  id: UUID;
  empresa_id: UUID;
  tipo_movimiento_id: UUID;
  almacen_origen_id: UUID;
  ubicacion_origen_id?: UUID;
  almacen_destino_id?: UUID;
  ubicacion_destino_id?: UUID;
  fecha_movimiento: DateTime;
  usuario_id: UUID;
  estado: "borrador" | "confirmado" | "anulado";
  fecha_confirmacion?: DateTime;
  usuario_confirmacion_id?: UUID;
  observacion?: string;
}
```

### DetalleMovimiento
Línea de detalle de un movimiento (productos individuales).

```typescript
{
  id: UUID;
  movimiento_id: UUID;
  producto_id: UUID;
  producto_unidad_medida_id: UUID;
  cantidad: Decimal;
  lote?: string;
  serie?: string;
  observacion_detalle?: string;
}
```

### TipoMovimiento
Define tipos de movimiento (ENTRADA, SALIDA, TRANSFERENCIA) y su comportamiento.

```typescript
{
  id: UUID;
  nombre: string;
  afecta_stock: -1 | 0 | 1;      // -1: decrementa, 0: no afecta, 1: incrementa
  requiere_destino: boolean;      // true para transferencias
  es_sistema: boolean;
}
```

---

## Flujos de Negocio

### 1. Crear Movimiento de Entrada

```
POST /inventarios/movimientos
├── Validar tipo movimiento existe
├── Validar almacén origen existe
├── Crear movimiento en estado "borrador"
└── Retornar movimiento creado

Estado final: BORRADOR
```

### 2. Agregar Productos a Movimiento

```
POST /inventarios/movimientos/:id/detalles
├── Validar movimiento existe y está en estado "borrador"
├── Validar producto existe
├── Validar unidad de medida válida para producto
├── Si producto requiere lote/serie, validar que se proporcionen
├── Crear detalle
└── Retornar detalle creado
```

### 3. Confirmar Movimiento (Aplica Stock)

```
PATCH /inventarios/movimientos/:id/confirmar
├── Validar movimiento existe y está en estado "borrador"
├── Validar movimiento tiene al menos 1 producto
├── Si es salida o transferencia:
│   ├── Validar stock disponible para cada producto
│   └── Rechazar si stock insuficiente
├── Cambiar estado a "confirmado"
├── Registrar fecha y usuario de confirmación
└── Retornar movimiento confirmado

Efecto: Stock se ve afectado según tipo de movimiento
```

### 4. Anular Movimiento Confirmado

```
PATCH /inventarios/movimientos/:id/anular
├── Validar movimiento está en estado "confirmado"
├── Cambiar estado a "anulado"
├── NO revierte stock (solo marca como anulado)
└── Registrar motivo de anulación

Nota: Para revertir stock, crear movimiento inverso
```

---

## Cálculo de Stock

El stock se calcula en tiempo real desde movimientos confirmados:

```typescript
Stock = Σ (cantidad × factor_conversión × afecta_stock)
```

### Ejemplos:

**Entrada de 50 unidades:**
- TipoMovimiento: ENTRADA (afecta_stock = 1)
- Cálculo: 50 × 1 × 1 = +50

**Salida de 10 unidades:**
- TipoMovimiento: SALIDA (afecta_stock = -1)
- Cálculo: 10 × 1 × -1 = -10

**Transferencia de 5 unidades:**
- Almacén origen: 5 × 1 × -1 = -5
- Almacén destino: 5 × 1 × +1 = +5

### Conversión de Unidades

Si el producto tiene factor_conversión = 0.5 (ej: paquetes de 2 unidades):

```
Entrada: 10 paquetes × 0.5 = 5 unidades base
```

---

## Endpoints

### Movimientos (CRUD)

| Método | Ruta | Descripción | Rol Requerido |
|--------|------|----------------|---------------|
| POST | `/inventarios/movimientos` | Crear movimiento | Operador Almacén, Admin |
| POST | `/inventarios/movimientos/:id/detalles` | Agregar producto | Operador Almacén, Admin |
| PATCH | `/inventarios/movimientos/:id/confirmar` | Confirmar | Operador Almacén, Admin |
| PATCH | `/inventarios/movimientos/:id/anular` | Anular | Admin |
| GET | `/inventarios/movimientos` | Listar todos | Todos (autenticado) |
| GET | `/inventarios/movimientos/:id` | Obtener detalle | Todos (autenticado) |

### Consultas

| Método | Ruta | Descripción | Rol Requerido |
|--------|------|----------------|---------------|
| GET | `/inventarios/stock` | Stock actual con filtros | Todos (autenticado) |
| GET | `/inventarios/kardex` | Historial de movimientos | Todos (autenticado) |

---

## Validaciones

### Crear Movimiento
- ✓ Tipo de movimiento existe
- ✓ Almacén origen existe
- ✓ Si requiere destino: almacén destino existe
- ✓ Si requiere destino: origen ≠ destino

### Agregar Detalle
- ✓ Movimiento existe y está en "borrador"
- ✓ Producto existe
- ✓ Unidad de medida válida para producto
- ✓ Si requiere lote: lote proporcionado
- ✓ Si requiere serie: serie proporcionada
- ✓ Cantidad > 0

### Confirmar Movimiento
- ✓ Movimiento existe y está en "borrador"
- ✓ Movimiento tiene al menos 1 detalle
- ✓ Si es salida/transferencia: stock disponible para cada producto

### Anular Movimiento
- ✓ Movimiento existe y está en "confirmado"
- ✓ Motivo proporcionado

---

## Seguridad

### Autenticación
- Todos los endpoints requieren token JWT válido
- Token debe incluirse en header: `Authorization: Bearer <token>`

### Autorización
- **Crear/Agregar/Confirmar**: Operador Almacén, Admin
- **Anular**: Solo Admin
- **Listar/Consultar**: Todos (autenticados)

### Aislamiento de Empresa
- Todos los datos se filtran por `empresa_id` del usuario autenticado
- No es posible acceder a datos de otras empresas

---

## Casos de Uso

### 1. Entrada de Mercadería desde Proveedor
```
1. POST /movimientos → Crear con tipo ENTRADA
2. POST /movimientos/:id/detalles → Agregar producto (x3)
3. PATCH /movimientos/:id/confirmar → Confirmar entrada
4. GET /stock → Verificar nuevo stock
```

### 2. Salida a Cliente
```
1. POST /movimientos → Crear con tipo SALIDA
2. POST /movimientos/:id/detalles → Agregar producto
3. PATCH /movimientos/:id/confirmar → Confirmar salida
4. GET /kardex → Ver histórico
```

### 3. Transferencia Entre Almacenes
```
1. POST /movimientos → Crear con tipo TRANSFERENCIA
   - almacen_origen_id: Almacén A
   - almacen_destino_id: Almacén B
2. POST /movimientos/:id/detalles → Agregar producto
3. PATCH /movimientos/:id/confirmar → Confirmar
   - Stock baja en Almacén A
   - Stock sube en Almacén B
```

### 4. Reversar Movimiento Anterior
```
1. POST /movimientos → Crear con tipo inverso
2. Agregar mismos productos con mismas cantidades
3. Confirmar
   → Stock vuelve al estado anterior
```

---

## Reportes

### Stock Actual
```
GET /inventarios/stock
→ Retorna:
  - Producto
  - Almacén
  - Cantidad disponible
  - Unidad de medida
```

### Kardex (Transaction History)
```
GET /inventarios/kardex
→ Retorna:
  - Fecha del movimiento
  - Tipo de movimiento
  - Cantidad entrada
  - Cantidad salida
  - Saldo acumulado
  - Usuario que realizó movimiento
  - Lote/Serie
```

---

## Consideraciones de Implementación

### Performance
- Stock se calcula en tiempo real (no almacenado)
- Índices en: `movimiento_id`, `producto_id`, `almacen_id`, `estado`
- Listar movimientos limitado a últimos 100

### Transacciones
- Cada operación usa transacción para garantizar consistencia
- Si falla confirmación, no se afecta stock

### Auditoría
- Cada movimiento registra usuario creador
- Confirmación registra usuario y fecha
- Anulación registra motivo

### Extensibilidad
- TipoMovimiento puede extenderse sin tocar código
- Nuevos roles pueden agregarse en RolesGuard
- Cálculo de stock es configurable por tipo

---

## Troubleshooting

### "Stock insuficiente"
- Verificar stock actual con GET /stock
- Revisar si hay movimientos en borrador sin confirmar
- Revisar histórico con GET /kardex

### "Tipo de movimiento no encontrado"
- Verificar que tipo_movimiento_id existe
- Verificar que es válido para la empresa

### "Almacén no encontrado"
- Verificar que almacen_id existe
- Verificar que está activo

### "No se puede confirmar sin productos"
- Agregar al menos 1 detalle antes de confirmar
- POST /movimientos/:id/detalles

---

## Commits Realizados

```
67dfb8a feat(inventarios): add DTOs for inventory movements
beed3a5 feat(inventarios): implement service with movement operations
12c458c feat(inventarios): implement REST controller with endpoints
00f9402 feat(inventarios): create inventarios module
75d0189 feat(inventarios): integrate inventarios module into app
```

---

## Archivos Creados

```
src/modules/inventarios/
├── inventarios.module.ts          (Módulo NestJS)
├── inventarios.service.ts         (Lógica de negocio)
├── inventarios.controller.ts      (REST API)
└── dto/
    ├── create-movimiento.dto.ts   (Crear movimiento)
    ├── add-detalle.dto.ts         (Agregar producto)
    ├── filtro-stock.dto.ts        (Filtrar stock)
    └── filtro-kardex.dto.ts       (Filtrar kardex)

docs/
├── inventarios-api.md             (Documentación de endpoints)
├── inventarios-curl-examples.sh   (Ejemplos de uso)
└── INVENTARIOS.md                 (Este archivo)
```

---

## Próximos Pasos

1. **Tests**: Crear test suite para validar lógica de stock
2. **Métricas**: Agregar contadores de stock por almacén
3. **Auditoría**: Registrar quién modificó qué y cuándo
4. **Notificaciones**: Alertar cuando stock baja de cierto nivel
5. **Integración**: Conectar con módulo de compras y ventas
