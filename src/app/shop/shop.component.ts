import { Component, OnInit, NgModule } from '@angular/core';
import {ProduitService} from '../services/produit.service'
import { FavorisService } from '../services/favoris.service';
import { Favoris } from '../classes/favoris';
import { Panier } from '../classes/panier';
import { PanierService } from '../services/panier.service';
import { Produit } from '../classes/produit';
import { User } from '../classes/user';
import { PathLocationStrategy } from '@angular/common';
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
  produit:Produit;
  produits:Produit[];
  panier = {} as any;
  paniers:Panier [] ;
  favoris = {} as any;
  favoriss: Favoris[] ;
  list = [] as any ;
  listF= [] as any
  c = [] as any;
  b = [] as any;
  f = [] as any;
  be = [] as any;
  exist: boolean;


  
  constructor(private produitService:ProduitService, private panierService:PanierService , private favorisService: FavorisService) { }

  
  ngOnInit(): void {
 
    //get de localStorage variable clo
    this.clo = localStorage.getItem("clo");
    //get de localStorage variable food
    this.food = localStorage.getItem("food");
    //get de localStorage variable food
    this.bb = localStorage.getItem("bb");
    //get de localStorage variable beauty
    this.beauty = localStorage.getItem("beauty");
    //lire produit de la base
    this.produitService.getProduits().subscribe((res) => {
      this.list = res;
      console.log("listProduit",this.list);
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
    
    this.favorisService.getFavoriss().subscribe((res) => {
      this.listF = res;
      console.log("listFv",this.listF);
      for(let i = 0 ; i <= this.listF.length ; i++) {
       if(localStorage.getItem("id") === this.listF[i].id_user.toString()) {
          this.c.push(this.listF[i]);
          console.log(" c " ,this.c);
        }
      }
    });
  
  }
 
 //panier 
 pan(m){
 
 if(JSON.parse(localStorage.getItem('id'))!==null){
 this.panier.id_user= JSON.parse(localStorage.getItem('id'));
 this.panier.nom_produit= m.nom_produit;
 this.panier.prix= m.prix;
this.panier.photo= m.photo;
this.panier.id_produit=m.id
 this.panier.quantite=1; 

 this.panierService.create(this.panier).subscribe(panier=>{this.paniers.push(panier)}); 
 alert("Add to basket");
 window.location.replace("shop");
 }
 else{
   alert("please connect")
 }
}
//favoris

fav(m){
  
  
 this.favoris.id_user=JSON.parse(localStorage.getItem('id'));
 this.favoris.id_produit=m.id;
  this.favoris.nom=m.nom_produit;
  this.favoris.prix=m.prix;
 this.favoris.photo=m.photo;
 this.favoris.categorie=m.categorie;

  this.favorisService.create(this.favoris).subscribe(favoris=>{this.favoriss.push(favoris)}); 
  alert("Add to favorites");

  window.location.replace("shop");
}

//delete favoris
onDelete(_id: string) {
  if (confirm('remove product from favorite ?') === true) {
    this.favorisService.deleteFavoris(_id).subscribe((res) => {
      this.ngOnInit();
    });
    window.location.replace("shop");
  }
}
}