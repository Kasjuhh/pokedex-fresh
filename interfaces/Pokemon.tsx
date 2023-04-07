export interface Pokemon {
    id: bigint,
    name: string;
    sprites: { front_default: string, front_shiny: string };
    types: { type: { name: string; url: string } }[];
    height: number;
    weight: number;
    species: { url: string}
  }