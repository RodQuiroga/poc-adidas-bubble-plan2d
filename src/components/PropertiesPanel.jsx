import { useEffect, useState } from 'react';
import { findFurnitureByNumero, getFurnitureImage } from '../data/furnitureCatalog';
import { CATEGORY_CATALOG } from '../data/categoryCatalog';

export default function PropertiesPanel({ area, onSearchNumero, onAssignCategory, onDeleteArea }) {
  const [numeroInput, setNumeroInput] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setNumeroInput(area?.numero ?? '');
    setNotFound(false);
  }, [area?.id, area?.numero]);

  if (!area) {
    return (
      <div className="panel-block properties-panel">
        <h2 className="panel-title">Propiedades</h2>
        <p className="muted">
          Dibujá un área sobre el plano (clic y arrastre) para identificar un mueble, o hacé clic sobre un área ya
          marcada para editarla.
        </p>
      </div>
    );
  }

  const runSearch = () => {
    const trimmed = numeroInput.trim();
    if (!trimmed) return;
    const found = findFurnitureByNumero(trimmed);
    onSearchNumero(area.id, trimmed, found);
    setNotFound(!found);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') runSearch();
  };

  return (
    <div className="panel-block properties-panel">
      <h2 className="panel-title">Propiedades del área</h2>

      <div className="properties">
        <div className="properties__row properties__row--field">
          <label className="properties__label" htmlFor="numero-input">
            ¿Qué número ves en el plano en esta zona?
          </label>
          <div className="properties__search-row">
            <input
              id="numero-input"
              className="properties__input"
              type="text"
              inputMode="numeric"
              placeholder="Ej. 04"
              value={numeroInput}
              onChange={(event) => {
                setNumeroInput(event.target.value);
                setNotFound(false);
              }}
              onKeyDown={handleKeyDown}
            />
            <button type="button" className="btn" onClick={runSearch}>
              Buscar
            </button>
          </div>
        </div>

        {notFound && <p className="properties__warning">Número no encontrado, intenta de nuevo.</p>}

        {area.furniture && (
          <div className="properties__result">
            {getFurnitureImage(area.numero) && (
              <img
                className="properties__result-image"
                src={getFurnitureImage(area.numero)}
                alt={`Referencia del mueble Nº ${area.numero}`}
              />
            )}
            <p className="properties__result-name">{area.furniture.nombre}</p>
            <p className="properties__result-meta">
              Códigos HU: {area.furniture.codigosHU.join(', ')}
            </p>
            <p className="properties__result-meta">
              {area.furniture.aportaCapacidad
                ? `Capacidad: ${area.furniture.capacidadSku} SKU / ${area.furniture.capacidadPiezas} piezas`
                : 'Sin capacidad de producto'}
            </p>
          </div>
        )}

        <div className="properties__row properties__row--field">
          <label className="properties__label" htmlFor="category-select">
            Categoría de producto
          </label>
          <select
            id="category-select"
            value={area.categoryId ?? ''}
            disabled={!area.furniture}
            onChange={(event) => onAssignCategory(area.id, event.target.value || null)}
          >
            <option value="">Sin categoría</option>
            {CATEGORY_CATALOG.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="properties__actions">
          <button type="button" className="btn btn--danger" onClick={() => onDeleteArea(area.id)}>
            Eliminar área
          </button>
        </div>
      </div>
    </div>
  );
}
