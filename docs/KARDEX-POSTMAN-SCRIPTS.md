# Script de Pre-request para Kardex - Postman

Este script obtiene automáticamente los IDs de producto y almacén para facilitar las pruebas.

## Opción 1: Pre-request Script con Console.log (Debug)

```javascript
// ============================================
// PRE-REQUEST: Obtener producto_id y almacen_id
// ============================================

// Primero, obtener lista de productos
const producto_url = pm.environment.get('base_url') + '/productos';
const token = pm.environment.get('token');

console.log('🔍 Obteniendo productos...');

pm.sendRequest({
    url: producto_url,
    method: 'GET',
    header: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    }
}, function(err, response) {
    if (err) {
        console.error('❌ Error obteniendo productos:', err);
        return;
    }
    
    try {
        const productos = response.json();
        if (productos.length > 0) {
            const producto = productos[0];
            pm.environment.set('producto_id', producto.id);
            console.log('✅ Producto seleccionado:', producto.nombre);
            console.log('   ID:', producto.id);
        }
    } catch (e) {
        console.error('❌ Error parseando respuesta:', e);
    }
});

// Obtener lista de almacenes
const almacen_url = pm.environment.get('base_url') + '/almacenes';

console.log('🔍 Obteniendo almacenes...');

pm.sendRequest({
    url: almacen_url,
    method: 'GET',
    header: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
    }
}, function(err, response) {
    if (err) {
        console.error('❌ Error obteniendo almacenes:', err);
        return;
    }
    
    try {
        const almacenes = response.json();
        if (almacenes.length > 0) {
            const almacen = almacenes[0];
            pm.environment.set('almacen_id', almacen.id);
            console.log('✅ Almacén seleccionado:', almacen.nombre);
            console.log('   ID:', almacen.id);
        }
    } catch (e) {
        console.error('❌ Error parseando respuesta:', e);
    }
});
```

---

## Opción 2: Script Más Simple (Entrada Manual)

Si prefieres entrar los valores manualmente en Postman:

```javascript
// En el panel Variables de Postman, establece:
// - base_url: http://localhost:3000/api
// - token: tu_token_jwt
// - producto_id: [valor de BD]
// - almacen_id: [valor de BD]

// Luego en la URL usa:
// {{base_url}}/inventarios/kardex?producto_id={{producto_id}}&almacen_id={{almacen_id}}
```

---

## Opción 3: Test Script para Validar Respuesta

```javascript
// ============================================
// TEST: Validar respuesta del kardex
// ============================================

pm.test('Status code es 200', function() {
    pm.response.to.have.status(200);
});

pm.test('Respuesta tiene estructura correcta', function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property('producto');
    pm.expect(jsonData).to.have.property('movimientos');
    pm.expect(jsonData).to.have.property('saldo_final');
});

pm.test('Producto tiene propiedades requeridas', function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.producto).to.have.property('id');
    pm.expect(jsonData.producto).to.have.property('nombre');
});

pm.test('Movimientos es un array', function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.movimientos).to.be.an('array');
});

pm.test('Saldo final es un número', function() {
    var jsonData = pm.response.json();
    pm.expect(jsonData.saldo_final).to.be.a('number');
});
```

---

## Pasos en Postman

### 1. Crear Variables de Entorno
En **Postman** → **Environments** → **Nuevo**

| Variable | Valor | Ejemplo |
|----------|-------|---------|
| `base_url` | URL de tu API | `http://localhost:3000/api` |
| `token` | Tu JWT | `eyJhbGciOi...` |
| `producto_id` | ID del producto | `550e8400-e29b-41d4-a716-446655440001` |
| `almacen_id` | ID del almacén | `b5ac10b-58cc-4372-a567-0e02b2c3d470` |

### 2. Crear Solicitud GET
- URL: `{{base_url}}/inventarios/kardex`
- Método: GET
- Auth: Bearer Token → `{{token}}`

### 3. Query Parameters
En la sección **Params**:

```
Key              Value
producto_id      {{producto_id}}
almacen_id       {{almacen_id}}
fecha_inicio     2024-01-01T00:00:00Z
fecha_fin        2024-12-31T23:59:59Z
```

### 4. Ejecutar
Clic en **Send** y verificar respuesta

---

## Ejemplo de Parámetros Completos

```
http://localhost:3000/api/inventarios/kardex?producto_id=550e8400-e29b-41d4-a716-446655440001&almacen_id=b5ac10b-58cc-4372-a567-0e02b2c3d470&fecha_inicio=2024-01-01T00:00:00Z&fecha_fin=2024-12-31T23:59:59Z
```

---

## Debugging

Si obtienes error, verifica:

1. **Copiar Producto ID**
   ```bash
   # En tu BD
   SELECT id, nombre FROM productos LIMIT 1;
   ```

2. **Copiar Almacén ID**
   ```bash
   # En tu BD
   SELECT id, nombre FROM almacenes LIMIT 1;
   ```

3. **Token válido**
   ```javascript
   // En Postman Console
   console.log(pm.environment.get('token'));
   ```

4. **Verificar movimientos existen**
   ```bash
   # Primero prueba el endpoint de stock
   GET /api/inventarios/stock?producto_id=xxx&almacen_id=yyy
   ```

---

## Resumen Rápido

| Paso | Acción |
|------|--------|
| 1 | Obtener `producto_id` de tabla `productos` |
| 2 | Obtener `almacen_id` de tabla `almacenes` |
| 3 | Crear movimientos confirmados (opcional, para ver kardex con datos) |
| 4 | Ir a Postman → GET `/inventarios/kardex` |
| 5 | Agregar parámetros query: `producto_id` y `almacen_id` |
| 6 | Ejecutar y ver respuesta |
