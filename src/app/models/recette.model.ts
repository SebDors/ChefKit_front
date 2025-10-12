import { Ingredient } from './ingredient.model';

export interface Recette {
  id_recette: number;
  titre: string;
  description?: string;
  instructions: string;
  temps_preparation_minutes: number;
  temps_cuisson_minutes: number;
  nombre_personnes: number;
  path_image?: string;
  ingredients?: Ingredient[];
}