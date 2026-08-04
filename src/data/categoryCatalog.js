// Catálogo de categorías de producto y sus colores — usado para la leyenda,
// el relleno de las áreas marcadas y la tabla Share Category.
export const CATEGORY_CATALOG = [
  { id: 'running', nombre: 'Running', color: '#2f6fed' },
  { id: 'basketball', nombre: 'Basketball', color: '#e8531e' },
  { id: 'futbol', nombre: 'Fútbol', color: '#1b9e5a' },
  { id: 'originals', nombre: 'Originals', color: '#111111' },
  { id: 'training', nombre: 'Training', color: '#8a2be2' },
  { id: 'outdoor', nombre: 'Outdoor', color: '#8a5a2c' },
  { id: 'sportswear', nombre: 'Sportswear', color: '#d3a017' },
  { id: 'accesorios', nombre: 'Accesorios', color: '#0aa3a3' },
];

export function findCategoryById(id) {
  if (!id) return null;
  return CATEGORY_CATALOG.find((cat) => cat.id === id) ?? null;
}
