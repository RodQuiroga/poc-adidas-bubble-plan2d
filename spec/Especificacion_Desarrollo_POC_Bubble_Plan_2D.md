# Especificación de Desarrollo — POC Bubble Plan Digital (Visualización 2D)
> Documento técnico funcional para implementación por un agente de desarrollo (Claude Code u otro agente de IA)
> **Versión 5.0.** Reemplaza la v4.0. Cambia el mecanismo de identificación de mobiliario: en vez de hotspots fijos pre-programados por el desarrollador, el **usuario dibuja con el mouse** el área donde está el mueble directamente sobre el plano real, y esa misma área queda pintada con el color de la categoría asignada. El número impreso en el plano pasa a ser solo un dato de referencia para identificar cuál mueble es contra el catálogo — ya no define la posición. Ver sección 12 para el detalle completo del cambio respecto a la v4.0.
> Este documento describe **qué debe construirse y cómo debe comportarse**, no incluye código.

---

## 0. Cómo usar este documento

Este documento, junto con `Bubble_Plan_Catalogo_Mobiliario_Planilla_56.md` (el catálogo de datos de los 56 muebles), contiene todo lo necesario para que un agente de IA desarrolle esta POC sin preguntas adicionales. Regla general: **impacto visual y claridad del concepto > completitud funcional** — esto es una demo para vender el proyecto, no el producto final.

---

## 1. Resumen del proyecto

Construir una aplicación web (**React + Vite**, 100% front-end, sin backend) que visualice de forma atractiva un Bubble Plan en 2D, usando **assets reales del cliente**:

1. Mostrar el **plano de tienda real** (`plano.png`) como fondo de la escena, tal cual fue provisto.
2. El usuario **dibuja con el mouse** (clic y arrastre) un rectángulo sobre la zona del plano donde está el mueble que quiere identificar — el plano ya trae, en varios puntos, un número circulado impreso que indica de qué mueble se trata.
3. Al soltar el mouse, el rectángulo queda registrado como un **área marcada**, y se abre su panel de propiedades.
4. El usuario **digita el número** que ve impreso en el plano dentro de esa área (ej. "04") — este número es **solo de referencia**, para que la aplicación identifique de qué mueble se trata.
5. La aplicación **busca ese número** en el catálogo de 56 muebles (`Bubble_Plan_Catalogo_Mobiliario_Planilla_56.md`) y, si lo encuentra, muestra el nombre del mueble, sus códigos HU y su capacidad de SKU/Piezas.
6. El usuario **asigna una categoría de producto** al área ya identificada.
7. **El área dibujada se pinta con el color de esa categoría** — el mueble queda señalado directamente sobre el plano, en su forma y ubicación real, no como un punto genérico.
8. El sistema **recalcula automáticamente** la tabla "Share Category", excluyendo las áreas sin categoría y los muebles que el catálogo marca como "sin capacidad de producto".

**Esto NO es** el producto final. No requiere autenticación, backend, base de datos, ni lectura automática del plano — el usuario dibuja el área y lee el número a simple vista. Es una demo de un solo usuario, corriendo 100% en el navegador.

---

## 2. Alcance funcional

### 2.1 Dentro de alcance (must-have)

- Mostrar `plano.png` como imagen de fondo de la zona central, a tamaño completo y legible.
- **Herramienta de marcado por arrastre:** el usuario hace clic y arrastra el mouse sobre cualquier zona vacía del plano para dibujar un rectángulo — mientras arrastra, debe verse una vista previa del rectángulo (ej. borde punteado).
- Al soltar el mouse, si el rectángulo tiene un tamaño mínimo razonable (para evitar que un clic accidental cree un área diminuta), se crea un **área marcada** y se abre automáticamente su panel de propiedades.
- El panel de propiedades de un área marcada debe tener: un campo de texto para digitar el número de referencia, un botón/acción de búsqueda (o buscar al presionar Enter), y — una vez encontrado un número válido — el selector de categoría.
- Si el número existe en el catálogo de 56, mostrar nombre del mueble, códigos HU y capacidad (o "sin capacidad de producto" si aplica) y habilitar el selector de categoría.
- Si el número no existe, mostrar "no encontrado" y permitir corregir sin perder el área dibujada.
- Al asignar categoría, **el área dibujada (el rectángulo completo) se rellena con el color de esa categoría**, en semi-transparencia, de forma que el detalle del plano siga viéndose debajo.
- El usuario puede crear tantas áreas marcadas como quiera, en cualquier parte del plano.
- Un **clic simple (sin arrastre)** sobre un área ya marcada la selecciona de nuevo, para poder cambiar su número o su categoría en cualquier momento.
- **Eliminar** un área marcada (por si se dibujó en el lugar equivocado o el usuario se arrepiente).
- Tabla **"Share Category"**, recalculada automáticamente, excluyendo áreas sin categoría y áreas cuyo mueble identificado esté marcado como "sin capacidad" en el catálogo.
- Leyenda de colores por categoría, siempre visible.

### 2.2 Fuera de alcance (explícitamente NO se construye en esta POC)

- **Redimensionar o mover** un área ya dibujada — para corregirla, se elimina y se vuelve a dibujar desde cero.
- **Formas libres o polígonos:** el área marcada es siempre un rectángulo simple, nunca un contorno ajustado a la silueta real del mueble.
- **Detección automática de la silueta del mueble** (auto-shape/edge detection sobre la imagen) — el usuario dibuja el rectángulo a mano, de forma aproximada, sobre lo que ve.
- **Lectura automática/OCR del número impreso en el plano** — el usuario lo lee a simple vista y lo escribe.
- **Editar el plano real** (mover muros, redibujar zonas) — se usa la imagen tal cual.
- **Cualquier cosa en 3D:** no hay Three.js, ni modelos `.obj`, ni cámara orbital.
- Autenticación, usuarios, roles, backend, API, **base de datos de cualquier tipo**.
- **Persistencia del estado** entre sesiones (recargar reinicia todo; `localStorage` es opcional, no obligatorio).
- Validar los códigos HU o las capacidades mock del catálogo contra datos reales de Adidas (ver advertencia en `Bubble_Plan_Catalogo_Mobiliario_Planilla_56.md`).
- Multi-tienda, multi-plano, exportar a PDF/PPT, versión responsive/móvil.

---

## 3. Stack tecnológico

| Capa | Tecnología | Justificación |
|---|---|---|
| Framework | **React 18** con **Vite** | Setup rápido, sin servidor |
| Lenguaje | **JavaScript** (no TypeScript) | Simplicidad para el alcance de esta POC |
| Plano de fondo | **Imagen real** (`plano.png`) como `<img>` o `background-image` de un contenedor `position: relative` | Es un asset real, ya vectorial/CAD — no se redibuja |
| Marcado de áreas | Eventos de mouse nativos (`mousedown` / `mousemove` / `mouseup`) sobre el contenedor del plano, guardando las coordenadas del rectángulo **en porcentaje** del ancho/alto de la imagen (no en píxeles fijos) | Para que las áreas marcadas escalen correctamente junto con la imagen sin importar el tamaño de pantalla |
| Overlay de áreas | `<div>` posicionados de forma absoluta (o `<rect>` de SVG) sobre la imagen, uno por cada área marcada | Simplicidad; no hace falta una librería de dibujo/canvas dedicada para rectángulos |
| Estado | **React state local** (`useState`/Context) | Alcance chico, no hace falta estado global |
| Estilos | **CSS plano**, reutilizando el sistema de diseño ya validado (monocromático + Poppins) | Continuidad visual |
| Persistencia | Ninguna requerida | Sin base de datos ni backend |
| Datos de mobiliario | Archivo JS/JSON con los 56 ítems de `Bubble_Plan_Catalogo_Mobiliario_Planilla_56.md` | Fuente de datos para la búsqueda por número |
| Tipografía | **Poppins** (Google Fonts) | Continuidad con la identidad visual ya validada |

**No usar:** Three.js, OBJLoader, TypeScript, Redux, Next.js, Tailwind, backend, base de datos, autenticación, OCR/reconocimiento de imágenes, librerías de canvas/dibujo pesadas (no hace falta para rectángulos simples).

---

## 4. Arquitectura general

Aplicación de una sola página (SPA), sin rutas, sin backend, sin persistencia obligatoria.

La pantalla se organiza en cuatro zonas:

- **Franja superior (ancho completo):** header con el título de la aplicación.
- **Panel lateral izquierdo:** panel de propiedades del área marcada seleccionada (o recién dibujada) — campo de número, resultado de la búsqueda, selector de categoría, botón eliminar. Si no hay ninguna área seleccionada, mensaje indicando que se debe dibujar o seleccionar una en el plano.
- **Zona central:** el plano real (`plano.png`) de fondo, con las áreas marcadas superpuestas. Es la zona donde ocurre toda la interacción de dibujo (clic + arrastre) y de selección (clic simple).
- **Panel lateral derecho:** la tabla "Share Category", recalculada en tiempo real.
- **Panel inferior (ancho completo):** leyenda de categorías, siempre visible.

---

## 5. Datos de referencia

### 5.1 Plano de tienda (asset real)

Se usa `plano.png` tal cual, como imagen de fondo de la zona central. No se recorta, redibuja ni edita.

### 5.2 Catálogo de mobiliario (56 ítems)

Ver `Bubble_Plan_Catalogo_Mobiliario_Planilla_56.md`: catálogo completo con nombre descriptivo, códigos HU de referencia y capacidad mock de SKU/Piezas por ítem, incluyendo los que no aportan capacidad de producto (decorativos, señalética, mobiliario de servicio).

### 5.3 Números de referencia sugeridos para la demo en vivo

A diferencia de la v4.0, **no hay posiciones pre-programadas**: el usuario dibuja el área donde quiera durante la demo. Como referencia de qué números probar (porque ya se identificaron visualmente en el fragmento de plano provisto), son útiles: **04, 06, 09, 13, 18, 19, 21, 22 y 41** — pero el usuario puede dibujar sobre cualquier zona del plano y digitar cualquier número que vea ahí, no está limitado a esta lista.

---

## 6. Modelo de datos (descripción funcional, sin código)

### 6.1 Catálogo de categorías

Mismo catálogo y colores ya validados en documentos anteriores del proyecto, sin cambios.

### 6.2 Catálogo de tipos de mobiliario (56 ítems)

Cada ítem: número (string, ej. "04"), nombre descriptivo, lista de códigos HU, si aporta capacidad (booleano), capacidad mock de SKU y Piezas (0 si no aporta).

### 6.3 Áreas marcadas (mobiliario identificado por el usuario)

Cada área marcada debe registrar, como mínimo: identificador único, coordenadas del rectángulo (posición x/y y ancho/alto, todo en **porcentaje** de la imagen del plano — no en píxeles), el número de referencia ingresado por el usuario (puede ser `null` si aún no se ha identificado), y la categoría asignada (puede ser `null`).

### 6.4 Selección activa

El estado registra cuál área marcada está actualmente seleccionada (o ninguna), para mostrar su panel de propiedades y resaltarla en el plano (ej. con un borde más grueso).

### 6.5 Reglas de negocio explícitas

- Un área recién dibujada inicia **sin número ni categoría asignados**.
- Un área **no puede tener categoría sin haber encontrado primero un número válido** en el catálogo — el selector de categoría permanece deshabilitado hasta entonces.
- El número identificado y la categoría de un área se pueden **cambiar libremente** en cualquier momento, volviendo a seleccionar el área.
- La capacidad de un área depende únicamente del ítem del catálogo identificado por su número, nunca de la categoría.
- La tabla Share Category **excluye**: áreas sin categoría asignada, y áreas cuyo mueble identificado esté marcado como "no aporta capacidad" en el catálogo, aunque tengan categoría.
- Un **clic simple** (sin arrastre, o con un arrastre menor al tamaño mínimo de creación) sobre un punto que cae dentro de un área ya marcada **selecciona esa área** en vez de crear una nueva. Un arrastre sobre una zona sin ningún área existente **crea una nueva**.
- No existe la posibilidad de redimensionar o mover un área ya creada — solo eliminarla y volver a dibujarla.

---

## 7. Comportamiento esperado de cada zona de la interfaz

### 7.1 Plano (zona central)

- Muestra `plano.png` como fondo, a tamaño completo.
- **Dibujar:** al hacer clic y arrastrar sobre una zona sin áreas existentes, se muestra una vista previa del rectángulo en tiempo real (ej. borde punteado, sin relleno). Al soltar el mouse, si el rectángulo supera un tamaño mínimo, se crea el área marcada correspondiente y se abre su panel de propiedades.
- **Seleccionar:** un clic simple sobre un área ya marcada la resalta (ej. borde más grueso) y abre su panel de propiedades.
- **Estados visuales de un área marcada:**
  - Sin número identificado: contorno neutro (gris), sin relleno.
  - Identificada (número válido encontrado), sin categoría: contorno sólido, sigue sin relleno de color.
  - Identificada y categorizada: relleno semi-transparente con el color de la categoría, dejando ver el detalle del plano debajo.

### 7.2 Panel de propiedades (panel lateral izquierdo)

- Sin área seleccionada/recién dibujada: mensaje indicando que se debe dibujar (clic + arrastre) sobre el plano para marcar un mueble.
- Área recién dibujada, sin número: campo de texto ("¿Qué número ves en el plano en esta zona?") + acción de búsqueda.
- Tras buscar: si existe en el catálogo, mostrar nombre, códigos HU y capacidad (o "sin capacidad de producto"), y habilitar el selector de categoría. Si no existe, mostrar "número no encontrado, intenta de nuevo".
- Con mueble identificado: selector de categoría habilitado; al elegir una, se refleja de inmediato en el plano (el área se colorea) y en la tabla Share Category.
- Botón **"Eliminar área"**, disponible en cualquier momento sobre el área seleccionada.
- El número y la categoría deben poder editarse de nuevo en cualquier momento volviendo a seleccionar el área.

### 7.3 Leyenda de categorías (panel inferior)

Sin cambios: chips de color + nombre por cada categoría del catálogo, siempre visibles.

### 7.4 Tabla Share Category (panel lateral derecho)

Misma lógica y formato ya validado: agrupación por categoría con subtotal de SKU/Piezas por género, y un total global grande al final. Excluye áreas sin categoría y áreas sin capacidad de producto (sección 6.5).

### 7.5 Identidad visual y sistema de diseño

Se mantiene el sistema de diseño ya validado (chrome monocromático, Poppins, `border-radius: 2px`, sin sombras). El color se reserva para categorías de producto y estados funcionales (área sin identificar / identificada / categorizada, selección activa, vista previa de dibujo).

---

## 8. Flujo de interacción principal (paso a paso)

1. La app carga con `plano.png` de fondo y **ninguna área marcada todavía**.
2. El usuario hace clic y arrastra sobre la zona del plano donde ve un mueble con un número circulado → al soltar, se crea el área marcada y se abre su panel.
3. El usuario lee el número impreso ahí y lo escribe en el campo de número.
4. La app busca ese número en el catálogo de 56 y muestra el resultado (mueble identificado, o "no encontrado").
5. Si se encontró, se habilita el selector de categoría; el usuario elige una.
6. El área dibujada se pinta del color de esa categoría, y la tabla Share Category se actualiza al instante (salvo que el ítem no aporte capacidad).
7. El usuario repite los pasos 2–6 para tantos muebles como quiera identificar, dibujando una nueva área cada vez.
8. En cualquier momento, puede hacer clic simple sobre un área ya marcada para cambiar su número o categoría, o eliminarla.
9. El resultado final —el plano real con varias zonas dibujadas y coloreadas según su categoría, más la tabla Share Category— es la pieza central de la demo frente al cliente.

---

## 9. Requisitos no funcionales

- **Ejecución:** debe levantarse localmente con los comandos estándar de un proyecto Vite.
- **Navegador objetivo:** Chrome/Edge recientes.
- **Sin backend, sin base de datos:** despliegue como sitio 100% estático.
- **Assets de imagen:** `plano.png` en resolución suficiente para leerse con claridad en pantalla completa.
- **Prioridad de desarrollo:** que dibujar un área se sienta natural y responsivo (sin lag visual mientras se arrastra), y que el plano real se vea nítido — por encima de cualquier robustez de manejo de errores no contemplada aquí.

---

## 10. Criterios de aceptación (Definition of Done)

1. Se puede hacer clic y arrastrar sobre el plano para dibujar un rectángulo, con vista previa mientras se arrastra.
2. Al soltar el mouse (con tamaño mínimo razonable), se crea un área marcada y se abre su panel con el campo de número vacío y categoría deshabilitada.
3. Al escribir un número existente en el catálogo, se muestra el mueble identificado y se habilita la categoría.
4. Al escribir un número inexistente, se muestra "no encontrado" sin romper la interfaz ni perder el área dibujada.
5. Al asignar categoría, el área se pinta del color correcto y la tabla Share Category se actualiza (o no suma, si el ítem no aporta capacidad).
6. Un clic simple sobre un área ya marcada la selecciona (sin crear una nueva), permitiendo cambiar su número o categoría.
7. Se puede eliminar un área marcada.
8. No existe ninguna forma de redimensionar o mover un área ya creada.
9. La tabla Share Category agrupa correctamente, con subtotales y total global, excluyendo lo que corresponde.
10. La leyenda muestra todas las categorías con su color correcto.
11. No hay llamadas a backend ni base de datos, y no hay errores en consola durante el flujo normal.

---

## 11. Notas para el agente de desarrollo

- El mecanismo de dibujo debe mantenerse **deliberadamente simple**: rectángulos únicamente, sin polígonos, sin redimensionar, sin mover — cualquier corrección se hace eliminando y volviendo a dibujar. No sobre-construir esta herramienta.
- Definir un tamaño mínimo de arrastre razonable (a criterio del agente) antes de considerar que el usuario quiso crear un área, para evitar que clics accidentales generen áreas diminutas e inútiles.
- Cargar el catálogo completo de 56 ítems (`Bubble_Plan_Catalogo_Mobiliario_Planilla_56.md`) desde el arranque, ya que el usuario puede escribir cualquier número válido de la planilla, no solo los sugeridos en la sección 5.3.
- No agregar OCR, reconocimiento de imagen, Three.js, ni ninguna forma de persistencia obligatoria.
- Todo el copy visible en la interfaz debe estar en **español**.
- Ante cualquier ambigüedad de detalle visual, tomar la decisión más simple y coherente con el sistema de diseño ya validado (sección 7.5).

---

## 12. Registro de cambios — v5.0 (marcado de área libre con mouse)

Respecto a la v4.0 (hotspots fijos pre-programados por número):

1. **Reemplazo del modelo de hotspots fijos por marcado de área libre:** el usuario ahora dibuja con el mouse (clic + arrastre) el rectángulo donde está el mueble, en vez de hacer clic sobre puntos pre-definidos por el desarrollador. Esto elimina la necesidad de mapear coordenadas de antemano (v4.0, sección 5.3).
2. **El área dibujada, no un punto, es lo que se colorea:** al asignar categoría, se rellena el rectángulo completo (semi-transparente) con el color de la categoría, señalando la forma y ubicación real del mueble sobre el plano — más fiel visualmente que un simple marcador puntual.
3. **El número pasa a ser puramente un dato de identificación**, no la definición de la posición: el usuario lo escribe después de dibujar el área, para consultar el catálogo — puede escribir cualquier número válido de los 56, no solo los ya mapeados.
4. **Nueva función: eliminar un área marcada** (para corregir errores de dibujo); se deja explícitamente fuera de alcance redimensionar o mover un área ya creada.
5. **La lista de números conocidos (04, 06, 09…)** pasa de ser una lista de hotspots pre-cargados a una simple sugerencia de qué probar durante la demo en vivo.
6. **Se mantiene sin cambios:** el catálogo de 56 muebles, el catálogo de categorías/colores, la lógica de Share Category, el sistema de diseño, y la ausencia de backend/base de datos/persistencia obligatoria.
