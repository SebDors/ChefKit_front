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
    // Ici, vous enverriez les ingrédients sélectionnés à votre backend ou les stockeriez localement
    console.log('Ingrédients à sauvegarder :', this.selectedIngredients);
    alert('Ingrédients sauvegardés : ' + this.selectedIngredients.join(', '));
    // Redirection possible après la sauvegarde
    // this.router.navigate(['/mes-recettes-basees-sur-ingredients']);
  }

  logout(): void {
    this.authService.logout();
  }
}