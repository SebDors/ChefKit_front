import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientsService } from '../services/ingredients.service';
import { HttpClientModule } from '@angular/common/http';
import { Ingredient } from '../models/ingredient.model';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
  providers: [IngredientsService]
})
export class IngredientsComponent implements OnInit {
  private ingredientsService = inject(IngredientsService);

  allIngredients: Ingredient[] = [];
  fruits: Ingredient[] = [];
  legumes: Ingredient[] = [];
  autres: Ingredient[] = [];
  selectedIngredients = new Set<string>();

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
}
