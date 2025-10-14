// ingredients.component.ts
import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common'; // Important pour ngFor, ngIf
import { RouterModule, Router } from '@angular/router'; // Important pour routerLink
import { AuthService } from '../auth.service'; // Assurez-vous du bon chemin

// Interface pour simuler vos objets d'ingrédients
interface Ingredient {
  nomIngredient: string;
  // Vous pouvez ajouter d'autres propriétés comme id, image, etc.
}

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

  // Données d'ingrédients fictives pour l'exemple
  fruits: Ingredient[] = [
    { nomIngredient: 'Pommes' },
    { nomIngredient: 'Bananes' },
    { nomIngredient: 'Fraises' },
    { nomIngredient: 'Oranges' },
    { nomIngredient: 'Raisins' },
    { nomIngredient: 'Mangues' },
    { nomIngredient: 'Avocats' },
    { nomIngredient: 'Kiwi' },
    { nomIngredient: 'Poires' },
    { nomIngredient: 'Citrons' }
  ];

  legumes: Ingredient[] = [
    { nomIngredient: 'Brocolis' },
    { nomIngredient: 'Carottes' },
    { nomIngredient: 'Tomates' },
    { nomIngredient: 'Concombres' },
    { nomIngredient: 'Poivrons' },
    { nomIngredient: 'Oignons' },
    { nomIngredient: 'Ail' },
    { nomIngredient: 'Salade' },
    { nomIngredient: 'Pommes de terre' },
    { nomIngredient: 'Épinards' }
  ];

  autres: Ingredient[] = [
    { nomIngredient: 'Poulet' },
    { nomIngredient: 'Riz' },
    { nomIngredient: 'Pâtes' },
    { nomIngredient: 'Oeufs' },
    { nomIngredient: 'Fromage' },
    { nomIngredient: 'Lait' },
    { nomIngredient: 'Farine' },
    { nomIngredient: 'Huile d\'olive' },
    { nomIngredient: 'Thon' },
    { nomIngredient: 'Bœuf haché' }
  ];

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Vous pouvez charger les ingrédients sélectionnés de l'utilisateur ici
    // Par exemple : this.selectedIngredients = this.ingredientService.getUserIngredients();
  }

  ngOnDestroy(): void {
    // Nettoyage si nécessaire
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