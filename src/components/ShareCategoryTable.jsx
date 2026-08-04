import { useMemo } from 'react';
import { CATEGORY_CATALOG } from '../data/categoryCatalog';

export default function ShareCategoryTable({ areas }) {
  const groups = useMemo(() => {
    const eligible = areas.filter((area) => area.categoryId && area.furniture?.aportaCapacidad);

    return CATEGORY_CATALOG.map((category) => {
      const items = eligible.filter((area) => area.categoryId === category.id);
      const sku = items.reduce((sum, area) => sum + area.furniture.capacidadSku, 0);
      const piezas = items.reduce((sum, area) => sum + area.furniture.capacidadPiezas, 0);
      return { category, items, sku, piezas };
    }).filter((group) => group.items.length > 0);
  }, [areas]);

  const grandTotal = useMemo(
    () =>
      groups.reduce(
        (acc, group) => ({ sku: acc.sku + group.sku, piezas: acc.piezas + group.piezas }),
        { sku: 0, piezas: 0 }
      ),
    [groups]
  );

  return (
    <div className="panel-block share-table">
      <h2 className="panel-title">Share Category</h2>

      {groups.length === 0 ? (
        <p className="muted">
          Todavía no hay muebles categorizados con capacidad de producto. Identificá un área y asignale una
          categoría para verla acá.
        </p>
      ) : (
        <div className="share-table__groups">
          {groups.map((group) => (
            <div className="share-group" key={group.category.id}>
              <div className="share-group__header" style={{ background: group.category.color }}>
                {group.category.nombre}
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Mueble</th>
                    <th>SKU</th>
                    <th>Piezas</th>
                  </tr>
                </thead>
                <tbody>
                  {group.items.map((area) => (
                    <tr key={area.id}>
                      <td>Nº {area.numero} — {area.furniture.nombre}</td>
                      <td>{area.furniture.capacidadSku}</td>
                      <td>{area.furniture.capacidadPiezas}</td>
                    </tr>
                  ))}
                  <tr className="share-group__total">
                    <td>Subtotal</td>
                    <td>{group.sku}</td>
                    <td>{group.piezas}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      <div className="share-grand-total">
        <div>
          <span className="share-grand-total__label">Total SKU</span>
          <span className="share-grand-total__value">{grandTotal.sku}</span>
        </div>
        <div>
          <span className="share-grand-total__label">Total Piezas</span>
          <span className="share-grand-total__value">{grandTotal.piezas}</span>
        </div>
      </div>
    </div>
  );
}
