import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PanierService } from '../services/panier.service';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';

import { Commande } from '../classes/commande';
import { CommandeService } from '../services/commande.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  phone : string;
  city: string;
  country: string;
  address: string;
  firstName: string;
  lastName: string;
  email: string;
  checkout: FormGroup;
  ReactiveFormModul
  submitted = false;
  list = [] as any ;
  u = [] as any ;
  user : User;
  users:User[];
  commande = {} as any;
  commandes : Commande[];
  p=[] as any;
 totalamount:number;
  list1: User[];
  constructor(private formBuilder: FormBuilder, private panierService:PanierService, private userService:UserService , private commandeService:CommandeService ) { }

  ngOnInit(): void {
    this.checkoutForm()
    this.checkout = this.formBuilder.group({
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
     
  
      
  });
  this.panierService.getPaniers().subscribe((res) => {
    this.list = res;
    console.log("listPanier",this.list);
    for(let i = 0 ; i < this.list.length ; i++) {
     if(localStorage.getItem("id") === this.list[i].id_user) {
        this.p.push(this.list[i]);
        console.log(" p " ,this.p);
      }}

  });
 // for(let us of this.users)
//{
  //console.log("loop");
  //if(localStorage.getItem("id_user") === this.user.id.toString())
//{
       //this.lastName=this.user.prenom;
      // this.firstName = this.user.nom;
       //this.email = this.user.email;
      // this.city = this.user.ville;
      // this.country = this.user.pays;
      // this.address = this.user.adresse;
       //this.phone = this.user.telephone;

 // }
//}
 //checkout formulaire

  }
  get f() { return this.checkout.controls; }
  onSubmit() {
    this.submitted = true;
   
   
    if (this.checkout.invalid) {
        return;
    } else {
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.city = '';
      this.country = '';
      this.address = '';
      this.phone = '';
      alert('SUCCESS!!');
    console.log(this.checkout.value);
    }

   
    
 
} 
  onReset() {
        this.submitted = false;
        this.checkout.reset();

}


checkoutForm(){
this.userService.getUsers().subscribe((res) => {
    this.list=res;
    console.log("rrrrr" ,this.list)
    for(let i =0 ; i<= this.list.length ; i++) {
    if(localStorage.getItem("id") === this.list[i].id_user) {
      console.log("nnn" ,this.list)
     this.list1= this.list[i] ;
     console.log("nnn" ,this.list1)
   }}
   
});
}

PasseCommande(){
  
  this.commande.id_user= localStorage.getItem("id");
  this.commande.id_produit="5";
   this.commande.date="hhgh";
   this.commande.quantite=1;
  this.commandeService.create(this.commande).subscribe(commande=>{this.commandes.push(commande)}); 
  alert("ajouter avec succés");
  window.location.replace("shop");
}

quan(){
  let total = 1;
  for (var i = 0; i < this.p.length; i++) {
      
          total = this.p[i].quantite*this.p[i].prix;
          this.totalamount = total;
     
  }
  return total;

}

getTotal() {
  let total = 0;
  for (var i = 0; i < this.p.length; i++) {
     
          total += this.quan();
          this.totalamount = total;
     
  }
  return total;
}
}
