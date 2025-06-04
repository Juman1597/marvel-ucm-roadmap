import { ucmContent } from "../data/ucm-mocker.js";
import { useMemo } from "react";

export default function Timeline() {
  // Funcion ordenar por fecha de lanzamiento
  const sortedContent = useMemo(() => {
    return [...ucmContent].sort(
      (a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)
    );
  }, []);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">
        Marvel Cinematic Universe Timeline
      </h1>
      <div className="flex flex-col gap-6">
        {sortedContent.map((item) => (
          <div
            key={`${item.id}-${item.season || 0}`}
            class="flex flex-col md:flex-row items-start gap-4 bg-white shadow rounded-2xl p-4 border-l-4"
            style={{ borderColor: getBorderColor(item.type) }}
          >
            <img
              src={item.poster}
              alt={item.title}
              className="w-24 h-36 object-cover rounded-xl shadow"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">
                {item.title}{" "}
                {item.season && (
                  <span className="text-sm">(Season {item.season})</span>
                )}
              </h2>
              <p className="text-sm text-gray-500">
                {formatDate(item.releaseDate)}
              </p>
              <p className="mt-2 text-sm">
                Type:{" "}
                <span className="capitalize font-medium">{item.type}</span>
              </p>
              {item.episodes && (
                <p className="text-sm text-gray-600">
                  Episodes: {item.episodes.length}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getBorderColor(type) {
  switch (type) {
    case "movie":
      return "#e11d48"; // Rojo
    case "serie":
      return "#2563eb"; // Azul
    case "animated":
      return "#10b981"; // Verde
    default:
      return "#6b7280"; // Gris
  }
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
