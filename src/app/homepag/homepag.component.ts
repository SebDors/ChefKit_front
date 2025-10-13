import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecetteService } from '../services/recette.service';
import { Router, RouterModule } from '@angular/router';
import { Recette } from '../models/recette.model';

@Component({
  selector: 'app-homepag',
  imports: [CommonModule, RouterModule],
  templateUrl: './homepag.component.html',
  styleUrl: './homepag.component.scss'
})
export class HomepagComponent implements OnInit {
  recettes: Recette[] = [];
  isLoading = true;
  errorMsg = '';

  constructor(private recetteService: RecetteService, private router: Router) {}

  ngOnInit(): void {
    this.recetteService.getAllRecettes().subscribe({
      next: (res) => {
        this.recettes = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des recettes', err);
        this.errorMsg = 'Erreur lors de la récupération des recettes';
        this.isLoading = false;
      }
    });
  }

  ouvrirRecette(id: number) {
    this.router.navigate(['/recette', id]); // navigation vers la page recette
  }
}

