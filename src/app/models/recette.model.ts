import { Ingredient } from './ingredient.model';

export interface Recette {
  idRecette: number;
  titre: string;
  description?: string;
  instructions: string;
  tempsPreparationMinutes: number;
  tempsCuissonMinutes: number;
  nombrePersonnes: number;
  pathImage?: string;
  ingredients?: Ingredient[];
}
