#!/bin/bash

# Script de ejemplos CURL para probar el módulo de inventarios
# Reemplaza: <TOKEN>, <EMPRESA_ID>, <USUARIO_ID> con valores reales

BASE_URL="http://localhost:3000/api"
TOKEN="your_jwt_token_here"

echo "====================================="
echo "EJEMPLOS DE CURL - MÓDULO INVENTARIOS"
echo "====================================="
echo ""

# Variables de ejemplo (reemplazar con IDs reales)
TIPO_MOVIMIENTO_ID="f47ac10b-58cc-4372-a567-0e02b2c3d479"
ALMACEN_ORIGEN_ID="b5ac10b-58cc-4372-a567-0e02b2c3d470"
ALMACEN_DESTINO_ID="c7ac10b-58cc-4372-a567-0e02b2c3d481"
UBICACION_ORIGEN_ID="a7ac10b-58cc-4372-a567-0e02b2c3d471"
PRODUCTO_ID="c6ac10b-58cc-4372-a567-0e02b2c3d472"
PRODUCTO_UNIDAD_MEDIDA_ID="d8ac10b-58cc-4372-a567-0e02b2c3d473"
MOVIMIENTO_ID=""

# ==========================================
# 1. CREAR MOVIMIENTO DE ENTRADA
# ==========================================
echo "1. CREAR MOVIMIENTO DE ENTRADA"
echo "==============================="
echo ""
echo "curl -X POST '$BASE_URL/inventarios/movimientos' \\"
echo "  -H 'Authorization: Bearer $TOKEN' \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{"
echo "    \"tipo_movimiento_id\": \"$TIPO_MOVIMIENTO_ID\","
echo "    \"almacen_origen_id\": \"$ALMACEN_ORIGEN_ID\","
echo "    \"ubicacion_origen_id\": \"$UBICACION_ORIGEN_ID\","
echo "    \"fecha_movimiento\": \"2024-12-22T10:00:00Z\","
echo "    \"observacion\": \"Entrada de mercadería nueva\""
echo "  }'"
echo ""

# ==========================================
# 2. AGREGAR PRODUCTO AL MOVIMIENTO
# ==========================================
echo ""
echo "2. AGREGAR PRODUCTO AL MOVIMIENTO"
echo "===================================="
echo ""
echo "curl -X POST '$BASE_URL/inventarios/movimientos/{MOVIMIENTO_ID}/detalles' \\"
echo "  -H 'Authorization: Bearer $TOKEN' \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{"
echo "    \"producto_id\": \"$PRODUCTO_ID\","
echo "    \"producto_unidad_medida_id\": \"$PRODUCTO_UNIDAD_MEDIDA_ID\","
echo "    \"cantidad\": 50.00,"
echo "    \"lote\": \"LOTE-2024-001\","
echo "    \"observacion_detalle\": \"Producto en buen estado\""
echo "  }'"
echo ""

# ==========================================
# 3. CONFIRMAR MOVIMIENTO
# ==========================================
echo ""
echo "3. CONFIRMAR MOVIMIENTO"
echo "========================"
echo ""
echo "curl -X PATCH '$BASE_URL/inventarios/movimientos/{MOVIMIENTO_ID}/confirmar' \\"
echo "  -H 'Authorization: Bearer $TOKEN' \\"
echo "  -H 'Content-Type: application/json'"
echo ""

# ==========================================
# 4. ANULAR MOVIMIENTO
# ==========================================
echo ""
echo "4. ANULAR MOVIMIENTO"
echo "====================="
echo ""
echo "curl -X PATCH '$BASE_URL/inventarios/movimientos/{MOVIMIENTO_ID}/anular' \\"
echo "  -H 'Authorization: Bearer $TOKEN' \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{"
echo "    \"motivo\": \"Error en la cantidad de entrada\""
echo "  }'"
echo ""

# ==========================================
# 5. LISTAR MOVIMIENTOS
# ==========================================
echo ""
echo "5. LISTAR MOVIMIENTOS"
echo "======================"
echo ""
echo "curl -X GET '$BASE_URL/inventarios/movimientos' \\"
echo "  -H 'Authorization: Bearer $TOKEN' \\"
echo "  -H 'Content-Type: application/json'"
echo ""

# ==========================================
# 6. OBTENER DETALLE DE MOVIMIENTO
# ==========================================
echo ""
echo "6. OBTENER DETALLE DE MOVIMIENTO"
echo "==================================="
echo ""
echo "curl -X GET '$BASE_URL/inventarios/movimientos/{MOVIMIENTO_ID}' \\"
echo "  -H 'Authorization: Bearer $TOKEN' \\"
echo "  -H 'Content-Type: application/json'"
echo ""

# ==========================================
# 7. CONSULTAR STOCK
# ==========================================
echo ""
echo "7. CONSULTAR STOCK ACTUAL"
echo "==========================="
echo ""
echo "curl -X GET '$BASE_URL/inventarios/stock?producto_id=$PRODUCTO_ID&almacen_id=$ALMACEN_ORIGEN_ID' \\"
echo "  -H 'Authorization: Bearer $TOKEN'"
echo ""

# ==========================================
# 8. CONSULTAR KARDEX
# ==========================================
echo ""
echo "8. CONSULTAR KARDEX"
echo "===================="
echo ""
echo "curl -X GET '$BASE_URL/inventarios/kardex?producto_id=$PRODUCTO_ID&almacen_id=$ALMACEN_ORIGEN_ID&fecha_inicio=2024-01-01T00:00:00Z&fecha_fin=2024-12-31T23:59:59Z' \\"
echo "  -H 'Authorization: Bearer $TOKEN'"
echo ""

# ==========================================
# TRANSFERENCIA ENTRE ALMACENES
# ==========================================
echo ""
echo "9. CREAR TRANSFERENCIA ENTRE ALMACENES"
echo "========================================"
echo ""
echo "Nota: tipo_movimiento_id debe ser TRANSFERENCIA (afecta_stock = 0, requiere_destino = true)"
echo ""
echo "curl -X POST '$BASE_URL/inventarios/movimientos' \\"
echo "  -H 'Authorization: Bearer $TOKEN' \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{"
echo "    \"tipo_movimiento_id\": \"<TIPO_TRANSFERENCIA_ID>\","
echo "    \"almacen_origen_id\": \"$ALMACEN_ORIGEN_ID\","
echo "    \"almacen_destino_id\": \"$ALMACEN_DESTINO_ID\","
echo "    \"fecha_movimiento\": \"2024-12-22T11:00:00Z\","
echo "    \"observacion\": \"Transferencia entre almacenes\""
echo "  }'"
echo ""

# ==========================================
# FLUJO COMPLETO
# ==========================================
echo ""
echo "FLUJO COMPLETO DE MOVIMIENTO"
echo "=============================}"
echo ""
echo "1. Crear movimiento"
echo "2. Agregar 1 o más productos"
echo "3. Confirmar movimiento (esto afecta el stock)"
echo ""
echo "Estados posibles:"
echo "  - borrador: movimiento recién creado (se pueden agregar/quitar productos)"
echo "  - confirmado: movimiento confirmado (stock afectado)"
echo "  - anulado: movimiento anulado (no revierte stock, solo marca como anulado)"
echo ""
echo "Validaciones:"
echo "  - No se puede confirmar movimiento sin productos"
echo "  - No se puede transferir si stock insuficiente"
echo "  - Producto debe estar registrado en empresa"
echo "  - Almacén debe estar asociado a empresa"
echo ""

echo "====================================="
echo "FIN DE EJEMPLOS"
echo "====================================="
