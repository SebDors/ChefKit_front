// ingredients.component.ts
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common'; // Important pour ngFor, ngIf
import { RouterModule, Router } from '@angular/router'; // Important pour routerLink
import { AuthService } from '../auth.service'; // Assurez-vous du bon chemin
import { IngredientsService } from '../services/ingredients.service';
import { IngredientDetail } from '../models/ingredient-detail.model';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [CommonModule, RouterModule], // Ajoutez RouterModule ici
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit, OnDestroy {
  isScrolled = false;
  selectedIngredients: string[] = []; // Tableau pour stocker les noms des ingrédients sélectionnés

  // Données d'ingrédients
  fruits: IngredientDetail[] = [];
  legumes: IngredientDetail[] = [];
  autres: IngredientDetail[] = [];

  constructor(
    public authService: AuthService,
    private router: Router,
    private ingredientsService: IngredientsService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUser();
    if (currentUser) {
      // Charger les ingrédients du frigo de l'utilisateur
      this.ingredientsService.getFridgeIngredients(currentUser.nomUtilisateur).subscribe(fridgeIngredients => {
        this.selectedIngredients = fridgeIngredients.map(ingredient => ingredient.nomIngredient);
        // Une fois les ingrédients du frigo chargés, charger tous les ingrédients
        this.loadIngredients();
      });
    } else {
      // Si aucun utilisateur n'est connecté ou n'a pas d'ID, charger simplement tous les ingrédients
      this.loadIngredients();
    }
  }

  ngOnDestroy(): void {
    // Nettoyage si nécessaire
  }

  loadIngredients(): void {
    this.ingredientsService.getIngredients().subscribe(ingredients => {
      this.fruits = ingredients.filter(ingredient => ingredient.categorie === 'fruit');
      this.legumes = ingredients.filter(ingredient => ingredient.categorie === 'légume');
      this.autres = ingredients.filter(ingredient => ingredient.categorie === 'Autre');
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50;
  }

  // Méthode pour vérifier si un ingrédient est sélectionné
  isSelected(ingredientName: string): boolean {
    return this.selectedIngredients.includes(ingredientName);
  }

  // Méthode pour basculer la sélection d'un ingrédient
  toggleIngredient(ingredientName: string): void {
    if (this.isSelected(ingredientName)) {
      this.selectedIngredients = this.selectedIngredients.filter(
        (name) => name !== ingredientName
      );
    } else {
      this.selectedIngredients.push(ingredientName);
    }
    console.log('Ingrédients sélectionnés :', this.selectedIngredients);
  }

  // Méthode appelée lorsque l'utilisateur clique sur "Sauvegarder"
  saveSelectedIngredients(): void {
    const currentUser = this.authService.currentUser();
    if (!currentUser) {
      alert("Vous devez être connecté pour sauvegarder votre frigo.");
      this.router.navigate(['/login']);
      return;
    }

    // 1. Créer une liste complète de tous les ingrédients avec leurs IDs
    const allIngredients = [...this.fruits, ...this.legumes, ...this.autres];

    // 2. Mapper les noms des ingrédients sélectionnés à leurs IDs
    const selectedIds = this.selectedIngredients.map(name => {
      const ingredient = allIngredients.find(ing => ing.nomIngredient === name);
      return ingredient ? ingredient.idIngredient : null;
    }).filter(id => id !== null) as number[]; // Filtrer les nuls et typer en number[]

    console.log('IDs à sauvegarder :', selectedIds);

    // 3. Appeler le service pour sauvegarder les IDs dans le frigo de l'utilisateur
    this.ingredientsService.saveFridgeIngredients(currentUser.nomUtilisateur, selectedIds).subscribe({
      next: () => alert('Votre frigo a été mis à jour avec succès !'),
      error: (err) => alert('Une erreur est survenue lors de la sauvegarde : ' + err.message)
    });
  }

  logout(): void {
    this.authService.logout();
  }
}