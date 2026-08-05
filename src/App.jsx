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
        <svg className="brand-mark" viewBox="100 100 50.07 31.439" xmlns="http://www.w3.org/2000/svg">
          <path d="M 150.07 131.439 L 131.925 100 L 122.206 105.606 L 137.112 131.439 L 150.07 131.439 Z M 132.781 131.439 L 120.797 110.692 L 111.078 116.298 L 119.823 131.439 L 132.781 131.439 Z M 109.718 121.401 L 115.509 131.439 L 102.551 131.439 L 100 127.007 L 109.718 121.401 Z" />
        </svg>
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
