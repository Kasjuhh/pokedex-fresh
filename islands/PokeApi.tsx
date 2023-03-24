import { useState } from "https://esm.sh/preact@10.11.0/hooks";
import { Pokemon } from "../interfaces/Pokemon.tsx";
import { Species } from "../interfaces/Species.tsx";
import { TypeData } from "../interfaces/TypeData.tsx";
import { EvolutionStage } from "../interfaces/EvolutionStage.tsx";
import EvolutionChain from "./EvolutionChain.tsx";

interface PokemonProps {
  pokemon: string;
}

export default function PokeApi(props: PokemonProps) {
  const [input, setInput] = useState(
    props.pokemon ? props.pokemon : "charmander"
  );
  const [data, setData] = useState<Pokemon | null>(null);
  const [typeData, setTypeData] = useState<TypeData | null>(null);
  const [evolutionChain, setEvolutionChain] = useState<EvolutionStage[] | null>(
    null
  );
  const [speciesData, setSpeciesData] = useState<Species | null>(null);
  const [error, setError] = useState<string | null>(null);
  window.onload = () => {
    fetchPokemon(
      input.toLowerCase(),
      setData,
      setTypeData,
      setError,
      setEvolutionChain,
      setSpeciesData
    );
  };

  return (
    <div>
      <div class="search">
        <p>Search for any pokemon 😊👇</p>
        <input
          type="text"
          id="pokeInput"
          value={input}
          onChange={(e) => setInput(e?.target?.value)}
          onKeyDown={(e) =>
            keyDown(
              e,
              (e?.target?.value).toLowerCase(),
              setData,
              setTypeData,
              setError,
              setEvolutionChain,
              setSpeciesData
            )
          }
        ></input>
        {/* <input type="submit" value="Search 🔎" onClick={() => fetchPokemon(input.toLowerCase(), setData, setTypeData, setError, setEvolutionChain, setSpeciesData)}/> */}
      </div>
      {error && ( // render error if it exists
        <p style={{ color: "red" }}>{error}</p>
      )}
      {data && ( // render data if pokemon it exists
        <div class="pokemon mt-8 markdown-body">
          <h1>{titleCaseWord(data.name)}</h1>
          <img src={data.sprites.front_default} alt={data.name} />
          <h2>Type</h2>
          <p>
            {data.types
              .map((t) => t.type.name + " " + pokemonTypes[t.type.name])
              .join(", ")}
          </p>
          {/* <p>Height: {data.height}</p>
         <p>Weight: {data.weight}</p> */}
          {typeData && ( // render type data if it exists
            <div>
              <h2>Strengths</h2>
              <ul>
                {typeData.damage_relations.double_damage_to.map((type) => (
                  <li>
                    {titleCaseWord(type.name)} {pokemonTypes[type.name]}
                  </li>
                ))}
              </ul>
              <h2>Weaknesses</h2>
              <ul>
                {typeData.damage_relations.double_damage_from.map((type) => (
                  <li>
                    {titleCaseWord(type.name)} {pokemonTypes[type.name]}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {evolutionChain && ( // render evolution chain if it exists
            <EvolutionChain evolutionChain={evolutionChain} />
          )}
        </div>
      )}
    </div>
  );
}

async function fetchPokemon(
  pokemon: string,
  setData: (data: Pokemon | null) => void,
  setTypeData: (typeData: TypeData | null) => void,
  setError: (error: string | null) => void,
  setEvolutionChain: (evolutionStages: EvolutionStage[] | null) => void,
  setSpeciesData: (species: Species | null) => void
) {
  const url = "https://pokeapi.co/api/v2/pokemon/" + pokemon;
  setData(null);
  setTypeData(null);
  setError(null);
  setEvolutionChain(null);
  setSpeciesData(null);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${pokemon}`);
    }
    const data: Pokemon = await response.json();
    setData(data);
    fetchTypeData(data.types[0].type.url, setTypeData);
    const species: Species = await fetchPokemonSpecies(pokemon, setSpeciesData);
    fetchEvolutionChain(species.evolution_chain.url, setEvolutionChain);
  } catch (error) {
    setError(error.message);
  }
}

async function fetchTypeData(
  url: string,
  setTypeData: (typeData: TypeData | null) => void
) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}`);
    }
    const data: TypeData = await response.json();
    setTypeData(data);
  } catch (error) {
    console.error(error);
    setTypeData(null);
  }
}

async function fetchPokemonSpecies(
  pokemon: string,
  setSpeciesData: (species: Species | null) => void
): Promise<Species> {
  // fetch the species json
  const url = "https://pokeapi.co/api/v2/pokemon-species/" + pokemon;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  // parse the response as JSON
  const data = await response.json();
  // create a pokemon species object from the data
  const pokemonSpecies: Species = {
    name: data.name,
    id: data.id,
    evolution_chain: data.evolution_chain,
    // add any other properties you need from the data
  };
  // return the pokemon species object
  // setSpeciesData(pokemonSpecies)
  return pokemonSpecies;
}

async function keyDown(
  e: KeyboardEvent,
  pokemon: string,
  setData: (data: Pokemon | null) => void,
  setTypeData: (typeData: TypeData | null) => void,
  setError: (error: string | null) => void,
  setEvolutionChain: (evolutionStages: EvolutionStage[] | null) => void,
  setSpeciesData: (species: Species | null) => void
) {
  if (e.code === "Enter") {
    await fetchPokemon(
      pokemon,
      setData,
      setTypeData,
      setError,
      setEvolutionChain,
      setSpeciesData
    );
  }
}

// a function that fetches the evolution chain from the pokeapi and returns an array of evolution stages
async function fetchEvolutionChain(
  url: string,
  setEvolutionChain: (evolutionStages: EvolutionStage[] | null) => void
) {
  // Fetch the evolution chain json
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }

  // parse the response as JSON
  const data = await response.json();
  // get the chain object from the data
  const chain = data.chain;
  // initialize an empty array to store the evolution stages
  const stages: EvolutionStage[] = [];

  // a helper function that recursively traverses the chain and adds each stage to the array
  function addStage(stage: any) {
    // create an evolution stage object from the stage data
    const evolutionStage: EvolutionStage = {
      name: titleCaseWord(stage.species.name),
      url: stage.species.url,
      minLevel: stage.evolution_details[0]?.min_level ?? null,
      trigger: titleCaseWord(stage.evolution_details[0]?.trigger?.name) ?? null,
      item: stage.evolution_details[0]?.item?.name ?? null,
      conditions:
        stage.evolution_details[0]?.conditions?.map((c: any) => c.name) ?? null,
      isBaby: stage.is_baby,
    };
    // add the evolution stage object to the array
    stages.push(evolutionStage);
    // if the stage has any evolutions, loop through them and call this function recursively
    if (stage.evolves_to.length > 0) {
      for (const evo of stage.evolves_to) {
        addStage(evo);
      }
    }
  }

  // call the helper function with the initial chain object
  addStage(chain);
  setEvolutionChain(stages);
}

//util
function titleCaseWord(word: string) {
  if (!word) return word;
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

const pokemonTypes: Record<string, string> = {
  normal: "🐻",
  fire: "🔥",
  water: "💧",
  electric: "⚡",
  grass: "🌿",
  ice: "❄️",
  fighting: "👊",
  poison: "☠️",
  ground: "🌎",
  flying: "🕊️",
  psychic: "👁️",
  bug: "🐛",
  rock: "🗿",
  ghost: "👻",
  dragon: "🐲",
  dark: "🌑",
  steel: "⚙️",
  fairy: "✨",
};
