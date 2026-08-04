import { CATEGORY_CATALOG } from '../data/categoryCatalog';

export default function CategoryLegend() {
  return (
    <div className="legend">
      {CATEGORY_CATALOG.map((category) => (
        <span className="legend__chip" key={category.id}>
          <span className="legend__swatch" style={{ background: category.color }} />
          {category.nombre}
        </span>
      ))}
    </div>
  );
}
