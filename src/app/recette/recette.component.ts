import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { RecetteService } from '../services/recette.service';
import { Recette } from '../models/recette.model';
import { AuthService } from '../auth.service';
import { Ingredient } from '../models/ingredient.model';
import { IngredientsService } from '../services/ingredients.service';

@Component({
  selector: 'app-recette',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './recette.component.html',
  styleUrls: ['./recette.component.scss']
})
export class RecetteComponent implements OnInit {
  recette: Recette | undefined;
  instructionSteps: string[] = [];
  isLoading = true;
  isScrolled = false;
  currentYear: number = new Date().getFullYear();
  
  ingredients: Ingredient[] = [];

  ownedIngredients: Ingredient[] = [];
  missingIngredients: Ingredient[] = [];
  isUserLoggedIn = false;

  constructor(
    private route: ActivatedRoute,
    private recetteService: RecetteService,
    private router: Router,
    public authService: AuthService,
    private location: Location,
    private ingredientsService: IngredientsService
  ) {}

  ngOnInit(): void {
    this.isUserLoggedIn = this.authService.isLoggedIn();
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.recetteService.getRecetteById(id).subscribe({
        next: (res) => {
          this.recette = res;
          if (this.recette && this.recette.instructions) {
            this.instructionSteps = this.recette.instructions
              .split(/\s*\d+\.\s*|\.\s*(?=[A-ZÉÀÈÙÛÂÊÎÔUMJ])/)
              .filter(step => step.trim() !== '');
          }

          this.recetteService.getIngredientsByRecetteId(id).subscribe({
            next: (ingredientsRes) => {
              this.ingredients = ingredientsRes;

              if (this.isUserLoggedIn) {
                const currentUser = this.authService.currentUser();
                if (currentUser) {
                  this.ingredientsService.getFridgeIngredients(currentUser.nomUtilisateur).subscribe(fridgeIngredients => {
                    const fridgeIngredientNames = fridgeIngredients.map(ing => ing.nomIngredient);
                    this.ownedIngredients = this.ingredients.filter(recipeIng => fridgeIngredientNames.includes(recipeIng.name));
                    this.missingIngredients = this.ingredients.filter(recipeIng => !fridgeIngredientNames.includes(recipeIng.name));
                    this.isLoading = false;
                  });
                } else {
                  this.isLoading = false;
                }
              } else {
                this.isLoading = false;
              }
            },
            error: (err) => {
              console.error('Erreur lors de la récupération des ingrédients:', err);
              this.isLoading = false;
              this.router.navigate(['/']);
            }
          });
        },
        error: (err) => {
          console.error('Erreur lors de la récupération de la recette:', err);
          this.isLoading = false;
          this.router.navigate(['/']);
        }
      });
    } else {
      console.error('ID de recette non fourni');
      this.isLoading = false;
      this.router.navigate(['/']);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  goBack(): void {
    this.location.back();
  }
}