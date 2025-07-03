import { useState, useCallback } from "react";

export function useZoom({ min = 0.5, max = 2, step = 0.1 } = {}) {
  const [scale, setScale] = useState(1);

  const zoomIn = useCallback(
    () => setScale((s) => Math.min(max, +(s + step).toFixed(2))),
    [max, step]
  );
  const zoomOut = useCallback(
    () => setScale((s) => Math.max(min, +(s - step).toFixed(2))),
    [min, step]
  );
  const resetZoom = useCallback(() => setScale(1), []);

  const onWheel = useCallback(
    (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        if (e.deltaY < 0) zoomIn();
        else zoomOut();
      }
    },
    [zoomIn, zoomOut]
  );

  return { scale, zoomIn, zoomOut, resetZoom, onWheel };
}
