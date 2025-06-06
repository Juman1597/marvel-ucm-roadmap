import clsx from "clsx";

const Node = ({ data }) => {
  if (!data?.title) return null; // Evita renderizar si no hay título

  const isAvengers = data.title.includes("Avengers"); // Comprobamos si la pelicula es de Avengers
  const sizeClass = isAvengers ? "w-24 h-24 text-sm" : "w-16 h-16 text-xs"; // Definimos el tamaño del nodo

  return (
    <div className="flex flex-col items-center space-y-2">
      {/* Nodo circular */}
      <div
        className={clsx(
          `rounded-full bg-red-600 flex items-center justify-center ${sizeClass}`
        )}
      >
        {/* TODO: Más adelante añadiremos el icono */}
      </div>
      {/* Título de la entrada */}
      <div className="max-w-xs bg-gray-800 text-white rounded-lg p-2">
        <p className="text-sm break-words text-center">{data.title}</p>
      </div>
    </div>
  );
};

export default Node;
// Nota: Asegúrate de que la prop "movie" tenga una propiedad "title" que sea una cadena de texto.
