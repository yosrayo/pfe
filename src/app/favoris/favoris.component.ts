import { Component, OnInit } from '@angular/core';
import { FavorisService } from '../services/favoris.service';

import { Favoris } from '../classes/favoris';
import { ProduitService } from '../services/produit.service';
import { Produit } from '../classes/produit';
import { PanierService } from '../services/panier.service';
import { Panier } from '../classes/panier';

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
  paniers:Panier [] ;
  panier = {} as any;
  constructor( private favorisService: FavorisService ,private panierService:PanierService, ) { }

  ngOnInit(): void {

    this.favorisService.getFavoriss().subscribe((res) => {
      this.list = res;
      console.log("listFv",this.list);
      for(let i = 0 ; i <= this.list.length ; i++) {
       if(localStorage.getItem("id") === this.list[i].id_user.toString()) {
          this.c.push(this.list[i]);
          console.log(" c " ,this.c);
        }
      }
    });
    
    } 
//compteur favoris
    nemberFav() {
      //console.log("favnum",this.num);
          this.num = this.c.length;   
           return this.num;
}
//delete favoris
onDelete(_id: string) {
  if (confirm('Voulez-vous vraiment supprimer ce produit ?') === true) {
    this.favorisService.deleteFavoris(_id).subscribe((res) => {
      this.ngOnInit();
    });
    window.location.replace("favoris");
  }
}
//ajout favoris au panier 
pan(i){
  console.log(this.c[i]);
  if(JSON.parse(localStorage.getItem('id'))!==null){
  this.panier.id_user= JSON.parse(localStorage.getItem('id'));
  this.panier.nom_produit="this.c[i]";
  this.panier.prix=200;
 this.panier.photo="ffff";
 this.panier.id_produit=222;
  this.panier.quantite=1; 
 
  this.panierService.create(this.panier).subscribe(panier=>{this.paniers.push(panier)}); 
  alert("Add to basket");
  window.location.replace("favoris");
  }
  else{
    alert("please connect")
  }
 }
  }
