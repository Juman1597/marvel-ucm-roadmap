
const ZoomControls = ({ zoomIn, zoomOut, resetZoom }) => (
  <div className="flex gap-2 p-4">
    <button
      onClick={zoomOut}
      className="px-3 py-1 bg-gray-700 text-white rounded"
    >
      -
    </button>
    <button
      onClick={resetZoom}
      className="px-3 py-1 bg-gray-700 text-white rounded"
    >
      Reset
    </button>
    <button
      onClick={zoomIn}
      className="px-3 py-1 bg-gray-700 text-white rounded"
    >
      +
    </button>
  </div>
);

export default ZoomControls;