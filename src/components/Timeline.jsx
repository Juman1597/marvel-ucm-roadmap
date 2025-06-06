import Node from "./Node";

import {
  getPhasesMCU,
  getAllEntriesByPhase,
  groupEntriesByYear,
} from "../utils/utilsFunctions";
import { useDragScroll } from "../hooks/useDragScroll";

const Timeline = () => {
  const phases = getPhasesMCU(); // Obtenemos las fases del MCU
  const entries = getAllEntriesByPhase(phases);
  const entriesByYear = groupEntriesByYear(entries);

  const { scrollRef, eventHandlers } = useDragScroll();

  return (
    <div className="min-h-screen w-full bg-gray-900 flex flex-col">
      <div
        ref={scrollRef}
        className="w-full h-screen overflow-auto cursor-grab"
        style={{ touchAction: "grab" }}
        {...eventHandlers}
      >
        {/* Timeline con scroll horizontal */}
        <div className="flex gap-32 py-8 px-6 min-w-full">
          {Object.entries(entriesByYear).map(([year, entries]) => (
            <div key={year} className="flex flex-col items-center">
              <div className="text-white mb-4 font-bold text-center w-32">
                {year}
              </div>
              <div className="flex flex-col items-center gap-8">
                {entries.map((entry) => (
                  <Node key={entry.id} data={entry} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
