import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-livreur',
  templateUrl: './livreur.component.html',
  styleUrls: ['./livreur.component.css']
})
export class LivreurComponent implements OnInit {
  totalstar = 5;
 liv = [] as any ;
  constructor( private userService:UserService ) { }

  ngOnInit(): void {
    this.userService .getUsers().subscribe((res) => {
      this.liv = res;
    });
  }

  
  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    alert(``);
  }
  
}
