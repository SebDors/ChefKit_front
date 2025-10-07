import {
  Component,
  OnInit,
  // Après avoir retiré l'IntersectionObserver, AfterViewInit et OnDestroy ne sont plus nécessaires ici
  // ElementRef, QueryList, ViewChildren sont aussi retirés
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit { // Plus besoin d'AfterViewInit, OnDestroy
  currentYear: number = new Date().getFullYear();

  selectedFilters = {
    vegetarian: false,
    vegan: false,
    glutenFree: false
  };

  // @ViewChildren('[data-animate]', { read: ElementRef }) animatedElements!: QueryList<ElementRef>; // RETIRÉ
  // private observer!: IntersectionObserver; // RETIRÉ

  constructor() { }

  ngOnInit(): void {
    // Aucune logique complexe ici pour le moment.
  }

  // ngAfterViewInit(): void { // RETIRÉ
  //   // Logique de l'Intersection Observer retirée
  // }

  // ngOnDestroy(): void { // RETIRÉ
  //   // Logique de déconnexion de l'observer retirée
  // }

  // --- LOGIQUE DES FILTRES ---
  toggleFilter(filterName: 'vegetarian' | 'vegan' | 'glutenFree'): void {
    this.selectedFilters[filterName] = !this.selectedFilters[filterName];
    // Ici, vous intégreriez la logique pour appliquer ce filtre à votre recherche ou API.
    console.log(`Filtre ${filterName} : ${this.selectedFilters[filterName] ? 'actif' : 'inactif'}`);
  }

  // --- LOGIQUE D'ANIMATION AU DÉFILEMENT (Intersection Observer - Play Once) --- // RETIRÉ
  // private initIntersectionObserver(): void { /* ... */ } // RETIRÉ
}
