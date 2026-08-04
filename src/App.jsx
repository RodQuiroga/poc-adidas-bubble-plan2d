import { useCallback, useState } from 'react';
import PlanCanvas from './components/PlanCanvas.jsx';
import PropertiesPanel from './components/PropertiesPanel.jsx';
import ShareCategoryTable from './components/ShareCategoryTable.jsx';
import CategoryLegend from './components/CategoryLegend.jsx';

let nextAreaId = 1;

export default function App() {
  const [areas, setAreas] = useState([]);
  const [selectedAreaId, setSelectedAreaId] = useState(null);

  const handleCreateArea = useCallback((rect) => {
    const id = nextAreaId++;
    setAreas((prev) => [
      ...prev,
      {
        id,
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        numero: null,
        furniture: null,
        categoryId: null,
      },
    ]);
    setSelectedAreaId(id);
  }, []);

  const handleSelectArea = useCallback((id) => {
    setSelectedAreaId(id);
  }, []);

  const handleSearchNumero = useCallback((id, numero, furniture) => {
    setAreas((prev) =>
      prev.map((area) =>
        area.id === id
          ? {
              ...area,
              numero,
              furniture,
              // Si el mueble identificado cambió, la categoría previa deja de ser válida.
              categoryId: furniture ? area.categoryId : null,
            }
          : area
      )
    );
  }, []);

  const handleAssignCategory = useCallback((id, categoryId) => {
    setAreas((prev) => prev.map((area) => (area.id === id ? { ...area, categoryId } : area)));
  }, []);

  const handleDeleteArea = useCallback((id) => {
    setAreas((prev) => prev.filter((area) => area.id !== id));
    setSelectedAreaId((current) => (current === id ? null : current));
  }, []);

  const selectedArea = areas.find((area) => area.id === selectedAreaId) ?? null;

  return (
    <div className="app">
      <header className="brand-header">
        <svg className="brand-mark" viewBox="0 0 34 22" xmlns="http://www.w3.org/2000/svg">
          <polygon points="0,22 6,22 13,6 10,0" />
          <polygon points="10,22 16,22 21,9 18,3" />
          <polygon points="20,22 26,22 29,15 26,9" />
        </svg>
        <span className="brand-wordmark">adidas</span>
        <span className="brand-divider" />
        <h1 className="brand-title">Bubble Plan Digital — POC 2D</h1>
      </header>

      <aside className="sidebar sidebar--left">
        <PropertiesPanel
          area={selectedArea}
          onSearchNumero={handleSearchNumero}
          onAssignCategory={handleAssignCategory}
          onDeleteArea={handleDeleteArea}
        />
      </aside>

      <main className="scene-area">
        <PlanCanvas
          areas={areas}
          selectedAreaId={selectedAreaId}
          onCreateArea={handleCreateArea}
          onSelectArea={handleSelectArea}
        />
      </main>

      <aside className="sidebar sidebar--right">
        <ShareCategoryTable areas={areas} />
      </aside>

      <CategoryLegend />
    </div>
  );
}
