import clsx from "clsx";
import { getIconByTitle, getColorByTitle } from "../mappers/timeline-mapper";
import { isAvengersTitle, isFinalAvengersTitle, getSizeClass } from "../utils/utilsFunctions";  

const Node = ({ data }) => {
  if (!data?.title) return null;

  const isAvengers = isAvengersTitle(data.title);
  const finalAvengers = isFinalAvengersTitle(data.title);
  const sizeClass = getSizeClass(data.type, isAvengers, finalAvengers);
  const imageUrl = getIconByTitle (data.title);
  const borderColorClass = getColorByTitle(data.title);

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Wrapper con circunferencia */}
      <div className={clsx(
        "rounded-full ring-4 ring-offset-8 ring-offset-[#101828]",
        borderColorClass
      )}
    >
      {/* Nodo circular */}
      <div
        className={clsx(
          `rounded-full bg-black flex items-center justify-center ${sizeClass}`
        )}
      >
        <img
          src={imageUrl}
          alt="{data.title}"
          className="w-full h-full object-contain rounded-full"
        />
      </div>
            </div>
      {/* Título de la entrada */}
      <div className="min-w-[12rem] max-w-xs bg-gray-800 text-white rounded-lg p-2">
        <p className="text-2xl break-words text-center anton-regular">{data.title}</p>
      </div>
    </div>
  );
};

export default Node;