import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecetteService } from '../services/recette.service';
import { Recette } from '../models/recette.model';

@Component({
  selector: 'app-recette',
  imports: [],
  templateUrl: './recette.component.html',
  styleUrl: './recette.component.scss'
})
export class RecetteComponent implements OnInit{
  recette!: Recette;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private recetteService: RecetteService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recetteService.getRecetteById(id).subscribe({
      next: (data) => {
        this.recette = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

}
