import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent implements OnInit{
  usersCount:number = 0;
  recettesCount:number = 0;
  ingredientsCount:number = 0;

  constructor(
    private adminService: AdminService
  ) { }
  
  ngOnInit(): void {

  //appeler les services pour récupérer les données
  this.adminService.getUserCount().subscribe(count => {
    this.usersCount = count;
  });
  this.adminService.getRecetteCount().subscribe(count => {
    this.recettesCount = count;
  });
  this.adminService.getIngredientCount().subscribe(count => {
    this.ingredientsCount = count;
  });
}

}
