import {
  Component,
  OnInit,
  OnDestroy,
  HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { RecetteService } from '../services/recette.service';
import { Recette } from '../models/recette.model';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'] // correction : styleUrls au pluriel
})
export class HomePageComponent implements OnInit, OnDestroy {
  // === Données dynamiques ===
  recettes: Recette[] = [];
  featuredRecipes: Recette[] = []; // pour le carrousel
  isLoading = true;
  errorMsg = '';

  // === Données pour la mise en page ===
  currentYear: number = new Date().getFullYear();
  isScrolled = false;

  // === Carrousel ===
  currentSlideIndex = 0;
  recipesPerSlide = 3;
  public Array = Array;

  // === Filtres ===
  selectedFilters = {
    vegetarian: false,
    vegan: false,
    glutenFree: false
  };

  // === Souscription backend ===
  private recetteSubscription: any;

  constructor(private recetteService: RecetteService, private router: Router) {}

  ngOnInit(): void {
    this.updateRecipesPerSlide();
    this.getAllRecettes();
  }

  ngOnDestroy(): void {
    if (this.recetteSubscription) this.recetteSubscription.unsubscribe();
  }

  // === Récupération des recettes depuis le backend ===
  getAllRecettes(): void {
    this.isLoading = true;
    this.recetteSubscription = this.recetteService.getAllRecettes().subscribe({
      next: (data: Recette[]) => {
        this.recettes = data;
        this.isLoading = false;

        // Choix des recettes mises en avant pour le carrousel
        this.featuredRecipes = data.slice(0, 6); // 6 premières recettes
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des recettes :', err);
        this.errorMsg = 'Erreur lors du chargement des recettes.';
        this.isLoading = false;
      }
    });
  }

  // === Navigation vers la page de détail ===
  ouvrirRecette(idRecette: number): void {
    this.router.navigate(['/recette', idRecette]);
  }

  // === Carrousel ===
  get totalSlides(): number {
    return Math.ceil(this.featuredRecipes.length / this.recipesPerSlide);
  }

  nextSlide(): void {
    if (this.totalSlides > 0) {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.totalSlides;
    }
  }

  prevSlide(): void {
    if (this.totalSlides > 0) {
      this.currentSlideIndex = (this.currentSlideIndex - 1 + this.totalSlides) % this.totalSlides;
    }
  }

  goToSlide(index: number): void {
    if (index >= 0 && index < this.totalSlides) {
      this.currentSlideIndex = index;
    }
  }

  // === Responsive : ajuste le nombre de recettes visibles ===
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateRecipesPerSlide();
  }

  updateRecipesPerSlide(): void {
    const width = window.innerWidth;
    if (width >= 1024) this.recipesPerSlide = 3;
    else if (width >= 768) this.recipesPerSlide = 2;
    else this.recipesPerSlide = 1;

    if (this.totalSlides > 0 && this.currentSlideIndex >= this.totalSlides) {
      this.currentSlideIndex = this.totalSlides - 1;
    } else if (this.totalSlides === 0) {
      this.currentSlideIndex = 0;
    }
  }

  // === Scroll dynamique pour le header sticky ===
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50;
  }

  // === Gestion des filtres ===
  toggleFilter(filterName: 'vegetarian' | 'vegan' | 'glutenFree'): void {
    this.selectedFilters[filterName] = !this.selectedFilters[filterName];
  }
}
