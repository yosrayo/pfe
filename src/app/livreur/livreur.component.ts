import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-livreur',
  templateUrl: './livreur.component.html',
  styleUrls: ['./livreur.component.css']
})
export class LivreurComponent implements OnInit {
  totalstar = 5;
  constructor() { }

  ngOnInit(): void {
  }

  
  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    alert(``);
  }
  
}
