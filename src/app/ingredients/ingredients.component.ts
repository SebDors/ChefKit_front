import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule, Router } from '@angular/router'; 
import { AuthService } from '../auth.service'; 
import { IngredientsService } from '../services/ingredients.service';
import { IngredientDetail } from '../models/ingredient-detail.model';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit, OnDestroy {
  isScrolled = false;
  selectedIngredients: string[] = []; 

  
  fruits: IngredientDetail[] = [];
  legumes: IngredientDetail[] = [];
  autres: IngredientDetail[] = [];

  
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  
  accordionState: { [key: string]: boolean } = {
    fruits: true,
    legumes: false,
    autres: false
  };

  constructor(
    public authService: AuthService,
    private router: Router,
    private ingredientsService: IngredientsService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.currentUser();
    if (currentUser) {
      
      this.ingredientsService.getFridgeIngredients(currentUser.nomUtilisateur).subscribe(fridgeIngredients => {
        this.selectedIngredients = fridgeIngredients.map(ingredient => ingredient.nomIngredient);
        
        this.loadIngredients();
      });
    } else {
      
      this.loadIngredients();
    }
  }

  ngOnDestroy(): void {
    
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

  
  toggleAccordion(section: string): void {
    if (this.accordionState[section]) {
      this.accordionState[section] = false;
      return;
    }
    Object.keys(this.accordionState).forEach(key => {
      this.accordionState[key] = false;
    });
    this.accordionState[section] = true;
  }

  
  isSelected(ingredientName: string): boolean {
    return this.selectedIngredients.includes(ingredientName);
  }

  
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

  
  triggerToast(message: string, type: 'success' | 'error' = 'success') {
    if (this.showToast) return;
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  
  saveSelectedIngredients(): void {
    const currentUser = this.authService.currentUser();
    if (!currentUser) {
      this.triggerToast("Vous devez être connecté pour sauvegarder votre frigo.", 'error');
      setTimeout(() => this.router.navigate(['/login']), 1500);
      return;
    }

    
    const allIngredients = [...this.fruits, ...this.legumes, ...this.autres];

    
    const selectedIds = this.selectedIngredients.map(name => {
      const ingredient = allIngredients.find(ing => ing.nomIngredient === name);
      return ingredient ? ingredient.idIngredient : null;
    }).filter(id => id !== null) as number[]; 

    console.log('IDs à sauvegarder :', selectedIds);

    
    this.ingredientsService.saveFridgeIngredients(currentUser.nomUtilisateur, selectedIds).subscribe({
      next: () => {
        this.triggerToast('Votre frigo a été mis à jour avec succès !');
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1500);
      },
      error: (err) => this.triggerToast('Une erreur est survenue lors de la sauvegarde : ' + err.message, 'error')
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
