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
  p= [] as any ;
  totalamount:number;
  
  constructor(private panierService:PanierService) { }

  ngOnInit(): void {
  
    this.panierService.getPaniers().subscribe((res) => {
      this.list = res;
      console.log("listPanier",this.list);
      for(let i = 0 ; i < 100; i++) {
       if(localStorage.getItem("id") === this.list[i].id_user.toString()) {
          this.p.push(this.list[i]);
          console.log(" p " ,this.p);
        }}

    });
  }

  onDelete(_id: string) {
    if (confirm('Voulez-vous vraiment supprimer ce produit ?') === true) {
      this.panierService.deletePanier(_id).subscribe((res) => {
        this.ngOnInit();
      });
    }
  }
  getTotal() {
    let total = 0;
    for (var i = 0; i < this.p.length; i++) {
        if (this.p[i].quantite) {
            total = (this.p[i].prix) * (this.p[i].quantite);
            this.totalamount = total;
        }
    }
    return total;
}


somme() {
  let total = 0;
  for (var i = 0; i < this.p.length; i++) {
      if (this.p[i].somme) {
          total += this.p[i].somme;
          this.totalamount = total;
      }
  }
  return total;
}
}
