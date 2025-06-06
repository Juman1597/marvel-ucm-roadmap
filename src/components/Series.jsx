import React from "react";
import series from "../data/series.json";

const Series = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {series.map((serie) => (
        <div key={serie.id} className="bg-white rounded-2xl shadow p-4">
          <img
            src={serie.cover_url}
            alt={`Cover of ${serie.title}`}
            className="w-full h-72 object-cover rounded-xl mb-4"
          />
          <h2 className="text-xl font-bold">{serie.title}</h2>
          <p className="text-sm text-gray-500 mb-1">
            {serie.release_date} — Temporada {serie.season}
          </p>
          <p className="text-sm mb-2">{serie.overview}</p>

          {serie.trailer_url && (
            <a
              href={serie.trailer_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-blue-500 hover:underline"
            >
              Ver tráiler
            </a>
          )}

          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2">Episodios</h3>
            <ul className="text-sm list-disc list-inside space-y-1 max-h-48 overflow-y-auto pr-2">
              {serie.episodes.map((ep) => (
                <li key={ep.number}>
                  <strong>Ep {ep.number}:</strong> {ep.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Series;
