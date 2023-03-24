export interface EvolutionStage {
    name: string;
    url: string;
    minLevel: number | null;
    trigger: string | null;
    item: string | null;
    conditions: string[] | null;
    isBaby: boolean;
  }