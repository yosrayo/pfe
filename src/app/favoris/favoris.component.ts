import { Component, OnInit } from '@angular/core';
import { FavorisService } from '../services/favoris.service';

import { Favoris } from '../classes/favoris';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css']
})
export class FavorisComponent implements OnInit {
  list = [] as any ;
  num:number;
  c = [] as any;
  favoris:Favoris;
  constructor( private favorisService: FavorisService ) { }

  ngOnInit(): void {

    this.favorisService.getFavoriss().subscribe((res) => {
      this.list = res;
     // console.log("listFv",this.list);
      for(let i = 0 ; i <= this.list.length ; i++) {
       if(localStorage.getItem("id") === this.list[i].id_user.toString()) {
          this.c.push(this.list[i]);
         // console.log(" c " ,this.c);
        }
      }
    });
    
    } 

    nemberFav() {
      //console.log("favnum",this.num);
          this.num = this.c.length;   
           return this.num;
 
}
onDelete(_id: string) {
  if (confirm('Voulez-vous vraiment supprimer ce produit ?') === true) {
    this.favorisService.deleteFavoris(_id).subscribe((res) => {
      this.ngOnInit();
    });
    window.location.replace("favoris");
  }
}

  }
