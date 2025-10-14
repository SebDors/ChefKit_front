// ingredients.component.ts
import { Component, OnInit, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientsService } from '../services/ingredients.service';
import { HttpClientModule } from '@angular/common/http';
import { Ingredient } from '../models/ingredient.model';
import { Router, RouterModule } from '@angular/router'; // <-- Importation de Router et RouterModule
import { AuthService } from '../auth.service'; // <-- Importation de AuthService

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule], // <-- Ajouter RouterModule ici
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
  providers: [IngredientsService]
})
export class IngredientsComponent implements OnInit {
  private ingredientsService = inject(IngredientsService);
  private router = inject(Router); // <-- Injection du Router
  public authService = inject(AuthService); // <-- Injection de AuthService

  allIngredients: Ingredient[] = [];
  fruits: Ingredient[] = [];
  legumes: Ingredient[] = [];
  autres: Ingredient[] = [];
  selectedIngredients = new Set<string>();

  isScrolled = false; // <-- Propriété pour le header collant

  ngOnInit(): void {
    this.ingredientsService.getIngredients().subscribe(data => {
      this.allIngredients = data;
      // Cast to 'any' to access the 'categorie' property which exists in the API data but not in the official model.
      this.fruits = data.filter((ing: any) => ing.categorie && ing.categorie.toLowerCase() === 'fruit');
      this.legumes = data.filter((ing: any) => ing.categorie && ing.categorie.toLowerCase() === 'légume');
      this.autres = data.filter((ing: any) => ing.categorie && ing.categorie.toLowerCase() !== 'fruit' && ing.categorie.toLowerCase() !== 'légume');
    });
  }

  toggleIngredient(ingredientName: string): void {
    if (this.selectedIngredients.has(ingredientName)) {
      this.selectedIngredients.delete(ingredientName);
    } else {
      this.selectedIngredients.add(ingredientName);
    }
  }

  isSelected(ingredientName: string): boolean {
    return this.selectedIngredients.has(ingredientName);
  }

  // Fonction pour le header sticky (adaptée de la home-page)
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50;
  }

  // Fonction de déconnexion (adaptée de la home-page)
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']); // Rediriger vers l'accueil ou la page de connexion
  }
}