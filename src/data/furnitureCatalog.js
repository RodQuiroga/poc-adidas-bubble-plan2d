// Catálogo de 56 ítems de mobiliario — ver spec/Bubble_Plan_Catalogo_Mobiliario_Planilla_56.md
// Datos mock (capacidad SKU/Piezas) para la POC, no validados contra datos reales de Adidas.

// Recortes individuales de cada celda de mobiliario_referncia_plano.png (uno por número).
const furnitureImages = import.meta.glob('../assets/mobiliario/*.png', { eager: true, import: 'default' });

export function getFurnitureImage(numero) {
  const normalized = String(numero ?? '').trim().padStart(2, '0');
  return furnitureImages[`../assets/mobiliario/${normalized}.png`] ?? null;
}

export const FURNITURE_CATALOG = [
  { numero: '01', nombre: 'Rack doble de barras cruzadas', codigosHU: ['HU2368'], aportaCapacidad: true, capacidadSku: 8, capacidadPiezas: 16 },
  { numero: '02', nombre: 'Rack doble de barras (variante)', codigosHU: ['HU2367'], aportaCapacidad: true, capacidadSku: 8, capacidadPiezas: 16 },
  { numero: '03', nombre: 'Rack simple + caja/pedestal', codigosHU: ['HU2368', 'HU2351'], aportaCapacidad: true, capacidadSku: 6, capacidadPiezas: 12 },
  { numero: '04', nombre: 'Rack + panel texturado + contenedor', codigosHU: ['HU2367', 'HU2814'], aportaCapacidad: true, capacidadSku: 7, capacidadPiezas: 14 },
  { numero: '05', nombre: 'Rack + mesa redonda', codigosHU: ['HU2367', 'HU3418'], aportaCapacidad: true, capacidadSku: 9, capacidadPiezas: 20 },
  { numero: '06', nombre: 'Rack + pedestal + estante', codigosHU: ['HU2367', 'HU2360'], aportaCapacidad: true, capacidadSku: 10, capacidadPiezas: 22 },
  { numero: '07', nombre: 'Panel gráfico con acento naranja + contenedor', codigosHU: ['HU3556', 'HU2371'], aportaCapacidad: true, capacidadSku: 5, capacidadPiezas: 8 },
  { numero: '08', nombre: 'Rack triple de barras colgantes', codigosHU: ['HU2385', 'HU2347 (×3)'], aportaCapacidad: true, capacidadSku: 16, capacidadPiezas: 48 },
  { numero: '09', nombre: 'Mesa + rack con exhibidor', codigosHU: ['HU2353', 'HU2367'], aportaCapacidad: true, capacidadSku: 12, capacidadPiezas: 26 },
  { numero: '10', nombre: 'Rack + pedestal + tambor redondo', codigosHU: ['HU2367', 'HU2353'], aportaCapacidad: true, capacidadSku: 11, capacidadPiezas: 24 },
  { numero: '11', nombre: 'Rack + panel naranja + contenedores', codigosHU: ['HU2367', 'HU2360', 'HU2349'], aportaCapacidad: true, capacidadSku: 9, capacidadPiezas: 18 },
  { numero: '12', nombre: 'Rack + mueble bajo con tambor', codigosHU: ['HU2367', 'HU2376'], aportaCapacidad: true, capacidadSku: 8, capacidadPiezas: 16 },
  { numero: '13', nombre: 'Rack + bloque texturado + contenedor', codigosHU: ['HU2366', 'HU2354'], aportaCapacidad: true, capacidadSku: 10, capacidadPiezas: 20 },
  { numero: '14', nombre: 'Rack + pedestal + bloque naranja', codigosHU: ['HU2360', 'HU2366', 'HU2353', 'HU3556'], aportaCapacidad: true, capacidadSku: 9, capacidadPiezas: 18 },
  { numero: '15', nombre: 'Rack + panel gráfico pequeño', codigosHU: ['HU2351', 'HU2367'], aportaCapacidad: true, capacidadSku: 7, capacidadPiezas: 14 },
  { numero: '16', nombre: 'Rack + exhibidor circular de calzado', codigosHU: ['HU2367', 'HU2376'], aportaCapacidad: true, capacidadSku: 10, capacidadPiezas: 22 },
  { numero: '17', nombre: 'Rack + caja + accesorio naranja + pedestal', codigosHU: ['HU2353', 'HU2368', 'HU3556'], aportaCapacidad: true, capacidadSku: 9, capacidadPiezas: 18 },
  { numero: '18', nombre: 'Rack + mesa de doblado', codigosHU: ['HU2367', 'HU2360'], aportaCapacidad: true, capacidadSku: 11, capacidadPiezas: 24 },
  { numero: '19', nombre: 'Mesa midfloor simple', codigosHU: ['HU2353', 'HU2368'], aportaCapacidad: true, capacidadSku: 8, capacidadPiezas: 18 },
  { numero: '20', nombre: 'Rack + mesa de doblado + panel lateral', codigosHU: ['HU2367', 'HU2351', 'HU2356'], aportaCapacidad: true, capacidadSku: 12, capacidadPiezas: 26 },
  { numero: '21', nombre: 'Rack simple, mínimo', codigosHU: ['HU2367'], aportaCapacidad: true, capacidadSku: 6, capacidadPiezas: 12 },
  { numero: '22', nombre: 'Rack de pared con varias filas de prendas', codigosHU: ['HU2367', 'HU2353'], aportaCapacidad: true, capacidadSku: 18, capacidadPiezas: 60 },
  { numero: '23', nombre: 'Rack + mueble bajo + tambor', codigosHU: ['HU2367', 'HU2350', 'HU2376'], aportaCapacidad: true, capacidadSku: 10, capacidadPiezas: 22 },
  { numero: '24', nombre: 'Rack + pedestal redondo', codigosHU: ['HU2353', 'HU2367'], aportaCapacidad: true, capacidadSku: 11, capacidadPiezas: 24 },
  { numero: '25', nombre: 'Rack + panel texturado pequeño', codigosHU: ['HU2371', 'HU2814'], aportaCapacidad: true, capacidadSku: 7, capacidadPiezas: 14 },
  { numero: '26', nombre: 'Mueble compuesto grande (rack + bloque naranja + tambor)', codigosHU: ['HU2814', 'HU3556', 'HU2366', 'HU2353', 'HU2355'], aportaCapacidad: true, capacidadSku: 20, capacidadPiezas: 70 },
  { numero: '27', nombre: 'Rack alto de prendas colgadas', codigosHU: ['HU2366', 'HU2353'], aportaCapacidad: true, capacidadSku: 16, capacidadPiezas: 55 },
  { numero: '28', nombre: 'Mesa ovalada + tambores + bandeja de accesorios', codigosHU: ['HU2813', 'HU3418'], aportaCapacidad: true, capacidadSku: 14, capacidadPiezas: 30 },
  { numero: '29', nombre: 'Mesa ovalada + rack superior', codigosHU: ['HU2813', 'HU3418'], aportaCapacidad: true, capacidadSku: 22, capacidadPiezas: 80 },
  { numero: '30', nombre: 'Mueble con gráfica direccional (flecha destacada)', codigosHU: ['HU2348', 'HU2360', 'HU2367'], aportaCapacidad: true, capacidadSku: 6, capacidadPiezas: 10 },
  { numero: '31', nombre: 'Plataforma con figura y panel de fondo (Focus Zone)', codigosHU: ['HU2356', 'HU3418', 'HU2366', 'HU2353'], aportaCapacidad: true, capacidadSku: 7, capacidadPiezas: 9 },
  { numero: '32', nombre: 'Mesa ovalada + rack de prendas dobladas', codigosHU: ['HU2356', 'HU2354', 'HU2366'], aportaCapacidad: true, capacidadSku: 15, capacidadPiezas: 45 },
  { numero: '33', nombre: 'Rack + prendas colgadas + tambor', codigosHU: ['HU2366', 'HU2353', 'HU2356'], aportaCapacidad: true, capacidadSku: 14, capacidadPiezas: 42 },
  { numero: '34', nombre: 'Rack + tambor pedestal', codigosHU: ['HU2366', 'HU2353', 'HU3418'], aportaCapacidad: true, capacidadSku: 13, capacidadPiezas: 38 },
  { numero: '35', nombre: 'Panel oscuro de pared con rack', codigosHU: ['HU2366', 'HU5369'], aportaCapacidad: true, capacidadSku: 17, capacidadPiezas: 58 },
  { numero: '36', nombre: 'Panel gráfico de ícono (silueta/mano)', codigosHU: ['HU2365', 'HU2347'], aportaCapacidad: false, capacidadSku: 0, capacidadPiezas: 0 },
  { numero: '37', nombre: 'Mesas ovaladas gemelas con gráfica', codigosHU: ['HU2356', 'HU3418', 'HU2691'], aportaCapacidad: true, capacidadSku: 16, capacidadPiezas: 50 },
  { numero: '38', nombre: 'Plataforma naranja con figuras', codigosHU: ['HU2362', 'HU2353', 'HU2691'], aportaCapacidad: true, capacidadSku: 8, capacidadPiezas: 10 },
  { numero: '39', nombre: 'Rack + mannequin', codigosHU: ['HU2366', 'HU2353', 'HU2363'], aportaCapacidad: true, capacidadSku: 12, capacidadPiezas: 20 },
  { numero: '40', nombre: 'Mannequin individual con rack', codigosHU: ['HU2366', 'HU2353', 'HU2363'], aportaCapacidad: true, capacidadSku: 7, capacidadPiezas: 9 },
  { numero: '41', nombre: 'Panel gráfico de acción (silueta corredor)', codigosHU: ['HU5369'], aportaCapacidad: false, capacidadSku: 0, capacidadPiezas: 0 },
  { numero: '42', nombre: 'Mannequin + prenda + bloque naranja', codigosHU: ['HU2366', 'HU2353'], aportaCapacidad: true, capacidadSku: 6, capacidadPiezas: 8 },
  { numero: '43', nombre: 'Panel artístico + figura con dispositivo', codigosHU: ['HU2366', 'HU2353', 'HU3262'], aportaCapacidad: false, capacidadSku: 0, capacidadPiezas: 0 },
  { numero: '44', nombre: 'Panel artístico con figura corredora', codigosHU: ['HU2366', 'HU2353', 'HU3262'], aportaCapacidad: false, capacidadSku: 0, capacidadPiezas: 0 },
  { numero: '45', nombre: 'Trío de bustos/torsos', codigosHU: ['HU2365', 'HU2347', 'HU2355'], aportaCapacidad: true, capacidadSku: 6, capacidadPiezas: 9 },
  { numero: '46', nombre: 'Figura decorativa (tapete) + rack lateral', codigosHU: ['HU2366', 'HU2343', 'HU2355'], aportaCapacidad: true, capacidadSku: 10, capacidadPiezas: 20 },
  { numero: '47', nombre: 'Gráfica de piso (corredor) + banca', codigosHU: ['HU2366', 'HU2355', 'HU2343'], aportaCapacidad: false, capacidadSku: 0, capacidadPiezas: 0 },
  { numero: '48', nombre: 'Grupo de mannequins + torsos', codigosHU: ['HU2369', 'HU2355'], aportaCapacidad: true, capacidadSku: 9, capacidadPiezas: 14 },
  { numero: '49', nombre: 'Mannequin + mueble bajo + bloque naranja', codigosHU: ['HU2366', 'HU2655', 'HU3556'], aportaCapacidad: true, capacidadSku: 7, capacidadPiezas: 10 },
  { numero: '50', nombre: 'Figura/cutout tipo embajador de marca', codigosHU: ['HU2367'], aportaCapacidad: false, capacidadSku: 0, capacidadPiezas: 0 },
  { numero: '51', nombre: 'Mueble de servicio/caja con estante', codigosHU: ['HU3556', 'HU2361'], aportaCapacidad: true, capacidadSku: 6, capacidadPiezas: 10 },
  { numero: '52', nombre: 'Mueble de servicio compacto', codigosHU: ['HU2350', 'HU2361'], aportaCapacidad: true, capacidadSku: 5, capacidadPiezas: 8 },
  { numero: '53', nombre: 'Trío de pedestales cilíndricos', codigosHU: ['HU2371'], aportaCapacidad: false, capacidadSku: 0, capacidadPiezas: 0 },
  { numero: '54', nombre: 'Banca/otomana ovalada', codigosHU: ['HU2685', 'HU2684'], aportaCapacidad: false, capacidadSku: 0, capacidadPiezas: 0 },
  { numero: '55', nombre: 'Banca ovalada grande (zona footwear poles)', codigosHU: ['HU2689', 'HU2690'], aportaCapacidad: false, capacidadSku: 0, capacidadPiezas: 0 },
  { numero: '56', nombre: 'Mesa midfloor calzado "Opción 4 – Products Focus"', codigosHU: ['HU2361', 'HU2350', 'HU2360'], aportaCapacidad: true, capacidadSku: 12, capacidadPiezas: 24 },
];

export function findFurnitureByNumero(numero) {
  const normalized = String(numero ?? '').trim();
  if (!normalized) return null;
  return FURNITURE_CATALOG.find((item) => item.numero === normalized.padStart(2, '0')) ?? null;
}
