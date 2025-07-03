import {
  getPhasesMCU,
  getAllEntriesByPhase,
  groupEntriesByYear
} from "../../utils/utilsFunctions";
import { useDragScroll } from "../../hooks/useDragScroll";
import { useZoom } from "../../hooks/useZoom";

import ZoomControls from "./ZoomControls";
import YearSection from "./YearSection";

const Timeline = () => {
  const phases = getPhasesMCU();
  const entries = getAllEntriesByPhase(phases);
  const entriesByYear = groupEntriesByYear(entries);

  const { scrollRef, eventHandlers } = useDragScroll();
  const { scale, zoomIn, zoomOut, resetZoom, onWheel } = useZoom();

  return (
    <div className="h-screen w-full bg-gray-900 flex flex-col">
      {/* Botones de zoom */}
      <ZoomControls zoomIn={zoomIn} zoomOut={zoomOut} resetZoom={resetZoom} />

      <div
        ref={scrollRef}
        className="w-full h-screen overflow-x-auto gap-4 cursor-grab"
        style={{ touchAction: "none" }}
        {...eventHandlers}
        onWheel={onWheel}
      >
        <div
          className="flex gap-64 py-8 px-48"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "0 0",
            transition: "transform 0.2s",
          }}
        >
          {Object.entries(entriesByYear).map(([year, entries]) => (
            <YearSection key={year} year={year} entries={entries} />
          ))} 
          <div style={{ minWidth: "0.5rem" }} />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
