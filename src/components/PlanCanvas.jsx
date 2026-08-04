import { useCallback, useRef, useState } from 'react';
import planoSrc from '../assets/plano/plano.png';
import { findCategoryById } from '../data/categoryCatalog';

// Tamaño mínimo de arrastre (en porcentaje del ancho/alto de la imagen) para
// considerar que el usuario quiso dibujar un área y no un clic accidental.
const MIN_DRAG_PERCENT = 1.5;

function toPercentRect(container, startClientX, startClientY, endClientX, endClientY) {
  const bounds = container.getBoundingClientRect();
  const clamp = (value) => Math.min(100, Math.max(0, value));

  const startX = clamp(((startClientX - bounds.left) / bounds.width) * 100);
  const startY = clamp(((startClientY - bounds.top) / bounds.height) * 100);
  const endX = clamp(((endClientX - bounds.left) / bounds.width) * 100);
  const endY = clamp(((endClientY - bounds.top) / bounds.height) * 100);

  return {
    x: Math.min(startX, endX),
    y: Math.min(startY, endY),
    width: Math.abs(endX - startX),
    height: Math.abs(endY - startY),
  };
}

function pointInsideArea(area, xPercent, yPercent) {
  return (
    xPercent >= area.x &&
    xPercent <= area.x + area.width &&
    yPercent >= area.y &&
    yPercent <= area.y + area.height
  );
}

function areaVisualState(area) {
  if (area.categoryId) return 'categorized';
  if (area.furniture) return 'identified';
  return 'blank';
}

export default function PlanCanvas({ areas, selectedAreaId, onCreateArea, onSelectArea }) {
  const containerRef = useRef(null);
  const dragStateRef = useRef(null);
  const [draftRect, setDraftRect] = useState(null);

  const handleMouseDown = useCallback((event) => {
    if (event.button !== 0) return;
    const container = containerRef.current;
    if (!container) return;

    dragStateRef.current = {
      startClientX: event.clientX,
      startClientY: event.clientY,
    };
    setDraftRect(toPercentRect(container, event.clientX, event.clientY, event.clientX, event.clientY));

    const handleMouseMove = (moveEvent) => {
      const dragState = dragStateRef.current;
      if (!dragState || !container) return;
      setDraftRect(
        toPercentRect(container, dragState.startClientX, dragState.startClientY, moveEvent.clientX, moveEvent.clientY)
      );
    };

    const handleMouseUp = (upEvent) => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      const dragState = dragStateRef.current;
      dragStateRef.current = null;
      setDraftRect(null);
      if (!dragState || !container) return;

      const rect = toPercentRect(container, dragState.startClientX, dragState.startClientY, upEvent.clientX, upEvent.clientY);

      if (rect.width < MIN_DRAG_PERCENT || rect.height < MIN_DRAG_PERCENT) {
        // Arrastre insuficiente: se interpreta como clic simple.
        const clickBounds = container.getBoundingClientRect();
        const clickX = ((upEvent.clientX - clickBounds.left) / clickBounds.width) * 100;
        const clickY = ((upEvent.clientY - clickBounds.top) / clickBounds.height) * 100;
        const hit = [...areas].reverse().find((area) => pointInsideArea(area, clickX, clickY));
        if (hit) {
          onSelectArea(hit.id);
        }
        return;
      }

      onCreateArea(rect);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, [areas, onCreateArea, onSelectArea]);

  return (
    <div className="plan-canvas" ref={containerRef} onMouseDown={handleMouseDown}>
      <img className="plan-canvas__image" src={planoSrc} alt="Plano de tienda" draggable={false} />

      {areas.map((area) => {
        const category = findCategoryById(area.categoryId);
        const state = areaVisualState(area);
        const isSelected = area.id === selectedAreaId;

        return (
          <div
            key={area.id}
            className={`plan-area plan-area--${state} ${isSelected ? 'plan-area--selected' : ''}`}
            style={{
              left: `${area.x}%`,
              top: `${area.y}%`,
              width: `${area.width}%`,
              height: `${area.height}%`,
              '--area-color': category?.color ?? 'transparent',
            }}
            onMouseDown={(event) => event.stopPropagation()}
            onClick={() => onSelectArea(area.id)}
          >
            {area.numero && <span className="plan-area__label">{area.numero}</span>}
          </div>
        );
      })}

      {draftRect && (
        <div
          className="plan-area plan-area--draft"
          style={{
            left: `${draftRect.x}%`,
            top: `${draftRect.y}%`,
            width: `${draftRect.width}%`,
            height: `${draftRect.height}%`,
          }}
        />
      )}
    </div>
  );
}
