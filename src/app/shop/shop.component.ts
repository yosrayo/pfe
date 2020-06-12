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
  paniers= [] as any;
  favoris = {} as any;
  favoriss= [] as any
  list = [] as any ;
  c = [] as any;
  b = [] as any;
  f = [] as any;
  be = [] as any;

  
  constructor(private produitService:ProduitService, private panierService:PanierService , private favorisService: FavorisService) { }

  
  ngOnInit(): void {
    this.clo = localStorage.getItem("clo");
    this.food = localStorage.getItem("food");
    this.bb = localStorage.getItem("bb");
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
    
    
  
  }
 
 //panier 
 pan(i){
 console.log(this.c[i]);
 this.panier.id_user=localStorage.getItem("id");
 this.panier.nom_produit=this.c[i].nom_produit;
 this.panier.prix=this.c[i].prix;
this.panier.photo=this.c[i].photo;
 this.panier.quantite=1; 

 this.panierService.create(this.panier).subscribe(panier=>{this.paniers.push(panier)}); 
 alert("ajouter avec succés");
 }

//favoris

fav(i){
 console.log(this.c[i]);
  this.favoris.id_user=localStorage.getItem("id");
  this.favoris.nom=this.c[i].nom;
  this.favoris.prix=this.c[i].prix;
  this.favoris.photo=this.c[i].photo;
  this.favoris.categorie=this.c[i].categorie;
    

  this.favorisService.create(this.favoris).subscribe(fav=>{this.favoriss.push(this.favoris)});
  alert("ajouter avec succés");
}
}
