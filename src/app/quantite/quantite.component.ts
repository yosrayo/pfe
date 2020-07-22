import { Component, OnInit } from '@angular/core';
import { PanierService } from '../services/panier.service';
import { Panier } from '../classes/panier';

@Component({
  selector: 'app-quantite',
  templateUrl: './quantite.component.html',
  styleUrls: ['./quantite.component.css']
})
export class QuantiteComponent implements OnInit {
  list = [] as any ;
  panier: Panier;
  paniers={} as any;
  p= [] as any ;
  totalamount:number;
  m=[]as any;
  constructor(private panierService:PanierService) { }

  ngOnInit(): void {
  
    this.panierService.getPaniers().subscribe((res) => {
      this.list = res;
      console.log("listPanier",this.list);
      for(let i = 0 ; i < this.list.length ; i++) {
       if(localStorage.getItem("id") === this.list[i].id_user.toString()) {
          this.p.push(this.list[i]);
          console.log(" p " ,this.p);
        }}
  
    });
  }
//supprimer produit
  onDelete(_id: string) {
    if (confirm('Voulez-vous vraiment supprimer ce produit ?') === true) {
      this.panierService.deletePanier(_id).subscribe((res) => {
        this.ngOnInit();
      });
      window.location.replace("quantite");
    }
  }

  //calculer somme produits
quan(p){
  let total = 0;
   total = p.quantite*p.prix;
   this.totalamount = total;
  return total;

}

//calculer somme total
somme() {
  let total = 0;
  for (var i = 0; i < this.p.length; i++) {
    total += this.p[i].quantite*this.p[i].prix;
          this.totalamount = total;
  }
  return total;
}
updateCard() {
  for(let i = 0 ; i <= this.p.length ; i++) {
  this.panierService.updatepanier(this.p[i]).subscribe((res) => {
   console.log('card');
  });
window.location.replace("quantite")
}
}

}
