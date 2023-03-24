import { EvolutionStage } from "../interfaces/EvolutionStage.tsx";

export interface EvolutionProps {
  evolutionChain: EvolutionStage[];
}

export default function EvolutionChain(evolutionProps: EvolutionProps) {
  const evolutionChain: EvolutionStage[] = evolutionProps.evolutionChain;
  return (
    <div>
      <h2>Evolution Chain</h2>
      <ul class="evolutionList">
        {evolutionChain.map((stage) => (
          // display the name and url of the evolved species
          // and optionally the min level, trigger, item, and conditions
          // depending on their values
          <div class="evolution">
            <img src={getPokemonPhotoFromUrl(stage.url)} />
            <p>
              <a href={stage.name}>{stage.name}</a>
              {stage.minLevel && ` at level ${stage.minLevel}`}
              {stage.trigger && ` by ${stage.trigger}`}
              {stage.item && ` with ${stage.item}`}
              {stage.conditions &&
                stage.conditions.length > 0 &&
                ` if ${stage.conditions.join(" and ")}`}
            </p>
          </div>
        ))}
      </ul>
    </div>
  );
}

function getPokemonPhotoFromUrl(url: string): string {
  const parts = url.slice(0, -1).split("/");
  const id = parts.pop();
  return (
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
    id +
    ".png"
  );
}
