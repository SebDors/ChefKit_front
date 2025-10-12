import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recette } from '../models/recette.model';

@Component({
  selector: 'app-homepag',
  imports: [],
  templateUrl: './homepag.component.html',
  styleUrl: './homepag.component.scss'
})
export class HomepagComponent implements OnInit {
  recettes: Recette[] = []; // tableau de recettes

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Pour l'instant on met des données statiques
    this.recettes = [
      { 
        id_recette: 1, 
        titre: 'Avocado Toast', 
        description: 'Une tartine à l\'avocat simple et délicieuse', 
        instructions: '1. Faites griller le pain. 2. Écrasez l’avocat...', 
        temps_preparation_minutes: 5,
        temps_cuisson_minutes: 5,
        nombre_personnes: 1
      },
      { 
        id_recette: 2, 
        titre: 'Pancakes', 
        description: 'Des pancakes moelleux pour le petit-déj', 
        instructions: '1. Mélangez les ingrédients. 2. Faites cuire sur une poêle...', 
        temps_preparation_minutes: 10,
        temps_cuisson_minutes: 10,
        nombre_personnes: 2
      }
    ];
  }

  ouvrirRecette(id: number) {
    this.router.navigate(['/recette', id]); // navigation vers la page recette
  }
}
