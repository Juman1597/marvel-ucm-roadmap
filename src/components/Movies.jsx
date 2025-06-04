import React from "react";
import movies from "../data/movies.json";

const Movies = () => {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies.map((movie) => (
        <div key={movie.id} className="bg-white rounded-2xl shadow p-4">
          <img
            src={movie.cover_url}
            alt={`Cover of ${movie.title}`}
            className="w-full h-72 object-cover rounded-xl mb-4"
          />
          <h2 className="text-xl font-bold">{movie.title}</h2>
          <p className="text-sm text-gray-500 mb-2">{movie.release_date}</p>
          <p className="text-sm mb-2">{movie.overview}</p>
          {movie.trailer_url && (
            <a
              href={movie.trailer_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-blue-500 hover:underline"
            >
              Ver tráiler
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default Movies;