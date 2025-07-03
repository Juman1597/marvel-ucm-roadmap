import { heroMappings } from "../mappings/heroMappings";
import { titleToHero, heroToColor } from "../mappings/heroColorMapping";

export const getIconByTitle = (title) => {
  if (!title || typeof title !== "string") return "/marvel-vectors/default.png";

  const normalizedTitle = title;
  const imageName = heroMappings[normalizedTitle];

  return imageName
    ? `/marvel-vectors/${imageName}.png`
    : "/marvel-vectors/default.png";
};

export const getColorByTitle = (title) => {
  const heroKey = titleToHero[title];
  return heroToColor[heroKey] ?? "ring-white";
};
