# Catálogo de Mobiliario — Planilla de Referencia (56 ítems)
> Documento de datos de referencia para la POC Bubble Plan Digital, generado a partir de `mobiliario_referncia_plano.png` ("PLANILLA DE REFERENCIAS PLANO DE EQUIPAMIENTO").
> Complementa `Especificacion_Desarrollo_POC_Bubble_Plan_2D.md` (v4.0): este es el catálogo completo que el agente de desarrollo debe cargar como datos mock para que funcione la búsqueda "digitar número → identificar mueble" descrita en esa spec.

---

## ⚠️ Nota de validación (leer antes de usar)

- Los **códigos HU** de cada fila son una transcripción de lectura visual de la planilla (texto pequeño, 56 celdas). Es razonable esperar algún error puntual de transcripción en un código individual. **Antes de tratar este catálogo como dato final, el equipo debe validarlo contra el archivo fuente** (`mobiliario_referncia_plano.png`), idealmente teniendo el agente de desarrollo que lo construya con acceso directo a esa imagen.
- La **capacidad de SKU y Piezas es 100% mock**: no proviene de ningún dato real de Adidas (la planilla no trae esa información). Se estimó individualmente por ítem según el tipo de mueble que muestra el render 3D de cada celda (más módulos de colgado → más SKU/Piezas; mobiliario decorativo, de servicio o señalética → sin capacidad de producto). Esto es exactamente el mismo criterio ya usado en `Bubble_Plan_Elementos_y_Mobiliario.md` para los 3 muebles originales, solo que aplicado ahora a las 56 configuraciones de la planilla real.
- **Estructura de la planilla:** 56 celdas organizadas en una cuadrícula de 8 columnas × 7 filas (columnas que arrancan en 01, 08, 15, 22, 29, 36, 43, 50). Es útil que el agente de desarrollo aproveche esta estructura regular si necesita recortar el thumbnail/render de cada ítem directamente de la imagen fuente en vez de rehacerlo a mano.
- Los ítems marcados con **Aporta capacidad: No** son mobiliario decorativo, de circulación, señalética o de servicio (bancas, pedestales, paneles gráficos, cutouts) — no se les puede asignar una categoría de producto con SKU/Piezas real, y deben **excluirse** del cálculo de Share Category aunque el usuario los identifique en el plano.

---

## Catálogo completo

| Nº | Nombre descriptivo | Códigos HU (referencia) | Aporta capacidad | SKU (mock) | Piezas (mock) |
|---|---|---|---|---|---|
| 01 | Rack doble de barras cruzadas | HU2368 | Sí | 8 | 16 |
| 02 | Rack doble de barras (variante) | HU2367 | Sí | 8 | 16 |
| 03 | Rack simple + caja/pedestal | HU2368, HU2351 | Sí | 6 | 12 |
| 04 | Rack + panel texturado + contenedor | HU2367, HU2814 | Sí | 7 | 14 |
| 05 | Rack + mesa redonda | HU2367, HU3418 | Sí | 9 | 20 |
| 06 | Rack + pedestal + estante | HU2367, HU2360 | Sí | 10 | 22 |
| 07 | Panel gráfico con acento naranja + contenedor | HU3556, HU2371 | Sí (bajo) | 5 | 8 |
| 08 | Rack triple de barras colgantes | HU2385, HU2347 (×3) | Sí | 16 | 48 |
| 09 | Mesa + rack con exhibidor | HU2353, HU2367 | Sí | 12 | 26 |
| 10 | Rack + pedestal + tambor redondo | HU2367, HU2353 | Sí | 11 | 24 |
| 11 | Rack + panel naranja + contenedores | HU2367, HU2360, HU2349 | Sí | 9 | 18 |
| 12 | Rack + mueble bajo con tambor | HU2367, HU2376 | Sí | 8 | 16 |
| 13 | Rack + bloque texturado + contenedor | HU2366, HU2354 | Sí | 10 | 20 |
| 14 | Rack + pedestal + bloque naranja | HU2360, HU2366, HU2353, HU3556 | Sí | 9 | 18 |
| 15 | Rack + panel gráfico pequeño | HU2351, HU2367 | Sí | 7 | 14 |
| 16 | Rack + exhibidor circular de calzado | HU2367, HU2376 | Sí | 10 | 22 |
| 17 | Rack + caja + accesorio naranja + pedestal | HU2353, HU2368, HU3556 | Sí | 9 | 18 |
| 18 | Rack + mesa de doblado | HU2367, HU2360 | Sí | 11 | 24 |
| 19 | Mesa midfloor simple | HU2353, HU2368 | Sí | 8 | 18 |
| 20 | Rack + mesa de doblado + panel lateral | HU2367, HU2351, HU2356 | Sí | 12 | 26 |
| 21 | Rack simple, mínimo | HU2367 | Sí | 6 | 12 |
| 22 | Rack de pared con varias filas de prendas | HU2367, HU2353 | Sí | 18 | 60 |
| 23 | Rack + mueble bajo + tambor | HU2367, HU2350, HU2376 | Sí | 10 | 22 |
| 24 | Rack + pedestal redondo | HU2353, HU2367 | Sí | 11 | 24 |
| 25 | Rack + panel texturado pequeño | HU2371, HU2814 | Sí | 7 | 14 |
| 26 | Mueble compuesto grande (rack + bloque naranja + tambor) | HU2814, HU3556, HU2366, HU2353, HU2355 | Sí | 20 | 70 |
| 27 | Rack alto de prendas colgadas | HU2366, HU2353 | Sí | 16 | 55 |
| 28 | Mesa ovalada + tambores + bandeja de accesorios | HU2813, HU3418 | Sí | 14 | 30 |
| 29 | Mesa ovalada + rack superior | HU2813, HU3418 | Sí | 22 | 80 |
| 30 | Mueble con gráfica direccional (flecha destacada) | HU2348, HU2360, HU2367 | Sí (bajo, foco visual) | 6 | 10 |
| 31 | Plataforma con figura y panel de fondo (Focus Zone) | HU2356, HU3418, HU2366, HU2353 | Sí (bajo, key look) | 7 | 9 |
| 32 | Mesa ovalada + rack de prendas dobladas | HU2356, HU2354, HU2366 | Sí | 15 | 45 |
| 33 | Rack + prendas colgadas + tambor | HU2366, HU2353, HU2356 | Sí | 14 | 42 |
| 34 | Rack + tambor pedestal | HU2366, HU2353, HU3418 | Sí | 13 | 38 |
| 35 | Panel oscuro de pared con rack | HU2366, HU5369 | Sí | 17 | 58 |
| 36 | Panel gráfico de ícono (silueta/mano) | HU2365, HU2347 | No (señalética) | 0 | 0 |
| 37 | Mesas ovaladas gemelas con gráfica | HU2356, HU3418, HU2691 | Sí | 16 | 50 |
| 38 | Plataforma naranja con figuras | HU2362, HU2353, HU2691 | Sí (bajo) | 8 | 10 |
| 39 | Rack + mannequin | HU2366, HU2353, HU2363 | Sí | 12 | 20 |
| 40 | Mannequin individual con rack | HU2366, HU2353, HU2363 | Sí (bajo) | 7 | 9 |
| 41 | Panel gráfico de acción (silueta corredor) | HU5369 | No (señalética) | 0 | 0 |
| 42 | Mannequin + prenda + bloque naranja | HU2366, HU2353 | Sí (bajo) | 6 | 8 |
| 43 | Panel artístico + figura con dispositivo | HU2366, HU2353, HU3262 | No (decorativo) | 0 | 0 |
| 44 | Panel artístico con figura corredora | HU2366, HU2353, HU3262 | No (decorativo) | 0 | 0 |
| 45 | Trío de bustos/torsos | HU2365, HU2347, HU2355 | Sí (bajo) | 6 | 9 |
| 46 | Figura decorativa (tapete) + rack lateral | HU2366, HU2343, HU2355 | Sí | 10 | 20 |
| 47 | Gráfica de piso (corredor) + banca | HU2366, HU2355, HU2343 | No (decorativo) | 0 | 0 |
| 48 | Grupo de mannequins + torsos | HU2369, HU2355 | Sí (bajo) | 9 | 14 |
| 49 | Mannequin + mueble bajo + bloque naranja | HU2366, HU2655, HU3556 | Sí (bajo) | 7 | 10 |
| 50 | Figura/cutout tipo embajador de marca | HU2367 | No (decorativo) | 0 | 0 |
| 51 | Mueble de servicio/caja con estante | HU3556, HU2361 | Sí (accesorios en mostrador) | 6 | 10 |
| 52 | Mueble de servicio compacto | HU2350, HU2361 | Sí (bajo) | 5 | 8 |
| 53 | Trío de pedestales cilíndricos | HU2371 | No (decorativo) | 0 | 0 |
| 54 | Banca/otomana ovalada | HU2685, HU2684 | No (mobiliario de descanso) | 0 | 0 |
| 55 | Banca ovalada grande (zona footwear poles) | HU2689, HU2690 | No (mobiliario de descanso) | 0 | 0 |
| 56 | Mesa midfloor calzado "Opción 4 – Products Focus" | HU2361, HU2350, HU2360 | Sí | 12 | 24 |

---

## Notas de correspondencia con el plano de ejemplo (`plano.png`)

Los siguientes números de esta planilla ya aparecen circulados en el fragmento de plano real compartido, y son un buen punto de partida para probar durante la demo en vivo (el usuario dibuja el área con el mouse y digita el número — ver spec v5.0, sección 5.3): **04, 06, 09, 13, 18, 19, 21, 22, 41**.

Dos casos confirman que la lectura cruzada entre plano y planilla es consistente:
- El ítem **41** de la planilla (panel gráfico de silueta corredora, sin capacidad) coincide con el mueble marcado "41" en el plano, que también usa el código `HU5369` en ambos lugares.
- Los ítems **54/55** (bancas ovaladas) usan los mismos códigos (`HU2684`, `HU2685`, `HU2689`, `HU2690`) que aparecen en la zona "FOOTWEAR POLES" del plano real — confirmando que esa zona del plano se arma con esas configuraciones de banca de la planilla.

---

## Formato sugerido para el archivo de datos (JS/JSON)

Como insumo directo para el agente de desarrollo, cada fila de esta tabla debe representarse como un objeto con esta forma mínima:

```
{
  numero: "04",
  nombre: "Rack + panel texturado + contenedor",
  codigosHU: ["HU2367", "HU2814"],
  aportaCapacidad: true,
  capacidadSku: 7,
  capacidadPiezas: 14
}
```

La búsqueda por número (ver spec, sección 7.2) simplemente filtra este arreglo por `numero === valor_ingresado_por_el_usuario`.
