import {
  Component,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Interface pour définir la structure d'une recette
interface Recipe {
  id: number;
  title: string;
  // meta: string; // RETIRÉ : Vous ne voulez plus de la difficulté
  imagePath: string; // Chemin vers l'image de la recette
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  currentYear: number = new Date().getFullYear();

  selectedFilters = {
    vegetarian: false,
    vegan: false,
    glutenFree: false
  };

  // VOTRE LISTE COMPLÈTE DE RECETTES AVEC LES CHEMINS D'IMAGES
  featuredRecipes: Recipe[] = [
    {
      id: 1,
      title: 'Toast à l\'Avocat',
      imagePath: 'assets/images/recipe-avocado_toast.jpg'
    },
    {
      id: 2,
      title: 'Bol Bouddha Coloré',
      imagePath: 'assets/images/recipe-bol_bouddha.jpg'
    },
    {
      id: 3,
      title: 'Boulettes de Pomme de Terre Farcies',
      imagePath: 'assets/images/recipe-boulette_pomme_de_terre.jpg'
    },
    {
      id: 4,
      title: 'Brownies au Chocolat Fondant',
      imagePath: 'assets/images/recipe-brownies.jpg'
    },
    {
      id: 5,
      title: 'Burger Végétal Maison',
      imagePath: 'assets/images/recipe-burger_végétal.jpg'
    },
    {
      id: 6,
      title: 'Burger Classique Américain',
      imagePath: 'assets/images/recipe-burger.jpg'
    },
    {
      id: 7,
      title: 'Poulet Rôti aux Herbes',
      imagePath: 'assets/images/recipe-chicken.jpg'
    },
    {
      id: 8,
      title: 'Gratin de Chou-fleur au Fromage',
      imagePath: 'assets/images/recipe-chou_fleur_fromage.jpg'
    },
    {
      id: 9,
      title: 'Croque-Monsieur Gourmand',
      imagePath: 'assets/images/recipe-croque_monsieur.jpg'
    },
    {
      id: 10,
      title: 'Lasagnes aux Légumes du Soleil',
      imagePath: 'assets/images/recipe-lasagnes_aux_légumes_de_soleil.jpg'
    },
    {
      id: 11,
      title: 'Légumes Rôtis au Four',
      imagePath: 'assets/images/recipe-légumes_rotis.jpg'
    },
    {
      id: 12,
      title: 'Moelleux au Chocolat Coulant',
      imagePath: 'assets/images/recipe-moelleux_aux_chocolats.jpg'
    },
    {
      id: 13,
      title: 'Pad Thaï Traditionnel avec Œuf',
      imagePath: 'assets/images/recipe-pad_thai_oeuf.jpg'
    },
    {
      id: 14,
      title: 'Pancakes Salés au Bacon',
      imagePath: 'assets/images/recipe-pancakes_bacon.jpg'
    },
    {
      id: 15,
      title: 'Pancakes aux Myrtilles et Sirop',
      imagePath: 'assets/images/recipe-pancakes_myrtille.jpg'
    },
    {
      id: 16,
      title: 'Panna Cotta à la Vanille',
      imagePath: 'assets/images/recipe-panna_cotta.jpg'
    },
    {
      id: 17,
      title: 'Pâtes Fraîches à la Napolitaine',
      imagePath: 'assets/images/recipe-pasta.jpg'
    },
    {
      id: 18,
      title: 'Pâtes aux Crevettes Ail et Huile d\'Olive',
      imagePath: 'assets/images/recipe-pates_crevettes_huile_olive.jpg'
    },
    {
      id: 19,
      title: 'Pizza Jambon Basilic Maison',
      imagePath: 'assets/images/recipe-pizza_jambon_basilic.jpg'
    },
    {
      id: 20,
      title: 'Poulet Curry Sans Gluten',
      imagePath: 'assets/images/recipe-poulet_sans_gluten.jpg'
    },
    {
      id: 21,
      title: 'Salade Composée Fraîcheur',
      imagePath: 'assets/images/recipe-salad.jpg'
    },
    {
      id: 22,
      title: 'Salade de Quinoa Méditerranéenne',
      imagePath: 'assets/images/recipe-salade_quinoa.jpg'
    },
    {
      id: 23,
      title: 'Soupe Froide de Concombre et Menthe',
      imagePath: 'assets/images/recipe-soupe_concombre.jpg'
    },
    {
      id: 24,
      title: 'Soupe de Lentilles Corail et Coco',
      imagePath: 'assets/images/recipe-soupe_lentilles_corail_ coco.jpg'
    },
    {
      id: 25,
      title: 'Steak Frites Classique',
      imagePath: 'assets/images/recipe-steak_frites.jpg'
    },
    {
      id: 26,
      title: 'Tacos de Poulet Épicés',
      imagePath: 'assets/images/recipe-tacos_poulet.jpg'
    },
    {
      id: 27,
      title: 'Tarte Tatin aux Pommes Caramelisées',
      imagePath: 'assets/images/recipe-tarte_tatin_aux_pommes.jpg'
    },
    {
      id: 28,
      title: 'Tartelette Individuelle à la Fraise',
      imagePath: 'assets/images/recipe-tartelette_à_la_fraise.jpg'
    },
    {
      id: 29,
      title: 'Toast Avocat et Œuf Poché',
      imagePath: 'assets/images/recipe-toast_avocat_oeuf_poché.jpg'
    },
    {
      id: 30,
      title: 'Vegan Poke Bowl Fraîcheur',
      imagePath: 'assets/images/recipe-vegan_poke_bowl.jpg'
    },
  ];

  constructor() { }

  ngOnInit(): void {
    // Aucune logique complexe ici pour le moment.
  }

  toggleFilter(filterName: 'vegetarian' | 'vegan' | 'glutenFree'): void {
    this.selectedFilters[filterName] = !this.selectedFilters[filterName];
    console.log(`Filtre ${filterName} : ${this.selectedFilters[filterName] ? 'actif' : 'inactif'}`);
  }
}
