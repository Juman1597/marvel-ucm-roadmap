import movies from "../data/movies.json";
import series from "../data/series.json";
import animated from "../data/animatedSeries.json";

const finalAvengersWords = ["Infinity", "Endgame", "Doomsday", "Secret Wars"];

//* NODE FUNCTIONS

/**
 * Determina si el título hace referencia a una película de los Vengadores.
 * @param {string} title - El título a evaluar.
 * @returns {boolean} - Devuelve `true` si el título contiene la palabra "Avengers".
 */
export function isAvengersTitle(title) {
  return title.includes("Avengers");
}

/**
 * Determina si el título corresponde a una película de los Vengadores con un gran evento (por ejemplo, Endgame, Infinity War, ...).
 * @param {string} title - El título a evaluar.
 * @returns {boolean} - Devuelve `true` si el título incluye alguna palabra clave de final.
 */
export function isFinalAvengersTitle(title) {
  return finalAvengersWords.some(word => title.includes(word));
}

/**
 * Devuelve la clase de tamaño correspondiente para el nodo, según su tipo y si es de los Vengadores o una película final.
 * @param {string} type - El tipo de nodo (por ejemplo, "movie", "serie", "animated").
 * @param {boolean} isAvengers - Indica si el título pertenece a una película de los Vengadores.
 * @param {boolean} isFinalAvengers - Indica si el título es una película de gran evento de los Vengadores.
 * @returns {string} - Una cadena con las clases de Tailwind CSS correspondientes al tamaño del nodo.
 */
export function getSizeClass(type, isAvengers, isFinalAvengers) {
  if (type === "serie" || type === "animated") return "w-16 h-16 text-sm";
  if (isFinalAvengers) return "w-80 h-80 text-sm";
  if (isAvengers) return "w-48 h-48 text-sm";
  return "w-32 h-32 text-sm";
}

//* TIMELINE FUNCTIONS

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

/**
 * Divide las entradas de un año en dos semestres: 
 * - firstHalf: enero a junio
 * - secondHalf: julio a diciembre
 * @param {Array<Object>} entries - Entradas de un año
 * @returns {{ firstHalf: Array, secondHalf: Array }}
 */
export const splitEntriesBySemester = (entries) => {
  const firstHalf = entries.filter(e => {
    const month = Number(e.release_date?.slice(5, 7));
    return month >= 1 && month <= 6;
  });
  const secondHalf = entries.filter(e => {
    const month = Number(e.release_date?.slice(5, 7));
    return month >= 7 && month <= 12;
  });
  return { firstHalf, secondHalf };
};

/**
 * Divide las entradas de un año en dos semestres: 
 * - first: enero a abril
 * - second: mayo a agosto
 * - third: septiembre a diciembre
 * @param {Array<Object>} entries - Entradas de un año
 * @returns {{  first: Array, second: Array, third: Array }}
 */
export const splitEntriesByTrimester = (entries) => {
  const first = entries.filter(e => {
    const month = Number(e.release_date?.slice(5, 7));
    return month >= 1 && month <= 4;
  });
  const second = entries.filter(e => {
    const month = Number(e.release_date?.slice(5, 7));
    return month >= 5 && month <= 8;
  });
  const third = entries.filter(e => {
    const month = Number(e.release_date?.slice(5, 7));
    return month >= 9 && month <= 12;
  });
  return { first, second, third };
};
