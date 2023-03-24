export interface Pokemon {
    id: bigint,
    name: string;
    sprites: { front_default: string };
    types: { type: { name: string; url: string } }[];
    height: number;
    weight: number;
    species: { url: string}
  }