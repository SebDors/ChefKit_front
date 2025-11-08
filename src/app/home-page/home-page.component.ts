import {
  Component,
  OnInit,
  OnDestroy,
  HostListener
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RecetteService } from '../services/recette.service';
import { Recette } from '../models/recette.model';
import { AuthService } from '../auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'] // correction : styleUrls au pluriel
})
export class HomePageComponent implements OnInit, OnDestroy {
  // === Données dynamiques ===
  recettes: Recette[] = [];
  associatedRecipes: Recette[] = []; // Pour les recettes suggérées
  featuredRecipes: Recette[] = []; // pour le carrousel
  isLoading = true;
  isLoadingAssociated = false;
  errorMsg = '';

  // === Données pour la mise en page ===
  currentYear: number = new Date().getFullYear();
  isScrolled = false;

  // === Search ===
  public searchInput: string = '';
  public searchTags: string[] = [];

  // === Notification ===
  public showNotification = false;
  public notificationMessage = '';

  // === Carrousel ===
  currentSlideIndex = 0;
  recipesPerSlide = 3;
  public Array = Array;

  // === Souscription backend ===
  private recetteSubscription: any;


  constructor(
    private recetteService: RecetteService,
    private router: Router,
    public authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.updateRecipesPerSlide();
    this.getAllRecettes(); // On charge toujours toutes les recettes
    const currentUser = this.authService.currentUser();
    if (currentUser) {
      this.getAssociatedRecipes(currentUser.nomUtilisateur); // On charge les recettes suggérées en plus
    }
  }

  ngOnDestroy(): void {
    if (this.recetteSubscription) this.recetteSubscription.unsubscribe();
  }

  // === Récupération des recettes depuis le backend ===
  getAssociatedRecipes(username: string): void {
    this.isLoadingAssociated = true;
    this.userService.getRecipesByFridge(username).subscribe({
      next: (data: Recette[]) => {
        this.associatedRecipes = data || []; // On assigne toujours le résultat, même s'il est vide.
        this.isLoadingAssociated = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des recettes suggérées :', err);
        this.isLoadingAssociated = false;
      }
    });
  }
  getAllRecettes(): void {
    this.isLoading = true;
    this.recetteSubscription = this.recetteService.getAllRecettes().subscribe({
      next: (data: Recette[]) => {
        this.recettes = data;
        this.isLoading = false;

        // Choix des recettes mises en avant pour le carrousel
        this.featuredRecipes = data.slice(0, 9); // 9 premières recettes
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

  // === Gestion de la recherche ===
  addSearchTag(): void {
    const tags = this.searchInput.split(',').map(tag => tag.trim()).filter(tag => tag);
    let tagAdded = false;
    if (tags.length > 0) {
      tags.forEach(tag => {
        if (tag && !this.searchTags.includes(tag)) {
          this.searchTags.push(tag);
          tagAdded = true;
        }
      });
    }
    this.searchInput = '';

    if (tagAdded) {
      this.showToast("Nous n'avons pas réussi à implémenter la recherche de recette par ingrédient");
    }
  }

  removeSearchTag(tagToRemove: string): void {
    this.searchTags = this.searchTags.filter(tag => tag !== tagToRemove);
  }

  showToast(message: string): void {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 5000); // Hide after 5 seconds
  }

  // === Authentification ===
  logout(): void {
    this.authService.logout();
  }
}
