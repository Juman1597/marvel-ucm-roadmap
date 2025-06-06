import movies from "../data/movies.json";
import series from "../data/series.json";
import animated from "../data/animatedSeries.json";

/**
 * Obtiene todas las fases únicas presentes en las entradas del MCU (películas, series y animaciones).
 * Busca la propiedad "phase" en cada entrada, filtra los valores válidos, elimina duplicados y los ordena.
 * @returns {number[]} Array de números de fase ordenados de menor a mayor.
 */
export const getPhasesMCU = () => {
  const allEntries = [...movies, ...series, ...animated];
  // Filtra solo los que tienen phase y que sea un número
  const phases = allEntries
    .map((entry) => entry.phase)
    .filter((phase) => typeof phase === "number" && phase > 0);
  return [...new Set(phases)].sort((a, b) => a - b); // Se eliminan duplicados y se ordenan de 1 en adelante
};

/**
 * Combina todas las entradas del MCU y las filtra por fase ordenadas por fecha de estreno.
 * @param {number|number[]|Set<number>} phase - Fase o fases a obtener.
 * @returns {Array} Lista de películas/series ordenadas por fecha.
 */
export const getAllEntriesByPhase = (phases) => {
  const allEntries = [...movies, ...series, ...animated];
  // Convierte cualquier entrada a un Set de fases
  const phaseSet = new Set(
    phases === null
      ? []
      : phases instanceof Set
        ? Array.from(phases)
        : Array.isArray(phases)
          ? phases
          : [phases]
  );
  return allEntries
    .filter((entry) => phaseSet.has(entry.phase))
    .sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
};

/**
 * Agrupa una lista de entradas del MCU por su año de estreno.
 * Extrae el año de estreno desde la propiedad release_date (formato YYYY-MM-DD).
 * @param {Array<Object>} entries - Lista de películas, series y animaciones a agrupar.
 * @returns {Object} Un objeto donde las claves son los años y los valores son arrays con las entradas de ese año.
 */
export const groupEntriesByYear = (entries) => {
  return entries
    .filter((entry) => !!entry.release_date) // Filtrado de entradas con fecha de estreno
    .reduce((acc, entry) => {
      const year = entry.release_date?.slice(0, 4); // Se extae el año en los primeros 4 caracteres
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(entry);
      return acc;
    }, {});
};
