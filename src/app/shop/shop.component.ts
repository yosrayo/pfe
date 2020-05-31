import { Component, OnInit } from '@angular/core';
import {ProduitService} from '../services/produit.service'
import { FavorisService } from '../services/favoris.service';
import { Favoris } from '../classes/favoris';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  clo: string;
  food: string;
  bb: string;
  beauty: string;
 
  list = [] as any ;
  c = [] as any;
  b = [] as any;
  f = [] as any;
  be = [] as any;

  favoris = [] as any ;
  constructor(private produitService:ProduitService, private favService:FavorisService) { }

  ngOnInit(): void {
    this.clo = localStorage.getItem("clo");
    this.food = localStorage.getItem("food");
    this.bb = localStorage.getItem("bb");
    this.beauty = localStorage.getItem("beauty");
 
    
    this.produitService.getProduits().subscribe((res) => {
      this.list = res;
      console.log("hhhh",this.list);
      for(let i = 0 ; i < this.list.length; i++) {
        if(this.list[i].categorie === "Bébés") {
          this.b.push(this.list[i]);
        }
        else{
          if(this.list[i].categorie === "Alimentations") {
            this.f.push(this.list[i]);
          } else{
            if(this.list[i].categorie === "Beauté") {
           this.be.push(this.list[i]);
         }else{
          this.c.push(this.list[i]); 
         }
        }
       
        
        }}
    });
    
    
  }
 
  
 

}
