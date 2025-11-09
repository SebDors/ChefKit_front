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
  styleUrls: ['./home-page.component.scss'] 
})
export class HomePageComponent implements OnInit, OnDestroy {
  
  recettes: Recette[] = [];
  associatedRecipes: Recette[] = []; 
  featuredRecipes: Recette[] = []; 
  isLoading = true;
  isLoadingAssociated = false;
  errorMsg = '';

  
  currentYear: number = new Date().getFullYear();
  isScrolled = false;

  
  public searchInput: string = '';
  public searchTags: string[] = [];

  
  public showNotification = false;
  public notificationMessage = '';

  
  currentSlideIndex = 0;
  recipesPerSlide = 3;
  public Array = Array;

  
  accordionState: { [key: string]: boolean } = {
    allrecipes: false, 
  };

  
  private recetteSubscription: any;


  constructor(
    private recetteService: RecetteService,
    private router: Router,
    public authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.updateRecipesPerSlide();
    this.getAllRecettes(); 
    const currentUser = this.authService.currentUser();
    if (currentUser) {
      this.getAssociatedRecipes(currentUser.nomUtilisateur); 
    }
  }

  ngOnDestroy(): void {
    if (this.recetteSubscription) this.recetteSubscription.unsubscribe();
  }

  
  getAssociatedRecipes(username: string): void {
    this.isLoadingAssociated = true;
    this.userService.getRecipesByFridge(username).subscribe({
      next: (data: Recette[]) => {
        this.associatedRecipes = data || []; 
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

        
        this.featuredRecipes = data.slice(0, 9); 
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des recettes :', err);
        this.errorMsg = 'Erreur lors du chargement des recettes.';
        this.isLoading = false;
      }
    });
  }

  
  ouvrirRecette(idRecette: number): void {
    this.router.navigate(['/recette', idRecette]);
  }

  
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

  
  @HostListener('window:resize')
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

  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50;
  }

  
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
    }, 5000); 
  }

  
  logout(): void {
    this.authService.logout();
  }

  toggleAccordion(section: string): void {
    this.accordionState[section] = !this.accordionState[section];
  }
}