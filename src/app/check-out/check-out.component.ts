import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
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
  today = new Date();
  m:number;
  client= [] as any ;
  

  constructor(private formBuilder: FormBuilder, private panierService:PanierService, private userService:UserService , private commandeService:CommandeService ) { }

  ngOnInit(): void {
    this.chek();
    
    //saisie de conrole
    this.checkout = this.formBuilder.group({
      phone: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
     
  
      
  });
  //affichage les produits de la panier 
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
  //fontion de saisie de controle
  get f() { return this.checkout.controls; }
  //pass commande et  update coordonnées user et controle
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



//passer la commande
PasseCommande(){
  for(let u of this.p){
    this.commande.id_user= JSON.parse(localStorage.getItem('id'));
    this.commande.id_produit=u.id_produit;
     this.commande.date=this.today;
     this.commande.quantite=u.quantite;
    this.commandeService.create(this.commande).subscribe(commande=>{this.commandes.push(commande)}); 
    this.updateUser();
    
  }
  alert("ajouter avec succés");
  window.location.replace("shop");
}
//calcul quantite*prix
quan(){
  let total = 1;
  for (var i = 0; i < this.p.length; i++) {
          total = this.p[i].quantite*this.p[i].prix;
          this.totalamount = total;
     
  }
  return total;

}
//calcul total
getTotal() {
  let total = 0;
  for (var i = 0; i < this.p.length; i++) {
     
          total += this.quan();
          this.totalamount = total;
     
  }
  return total;
}

//client connecte
chek(){
  this.m=parseInt( localStorage.getItem('id'));
   console.log('th',this.m);
  this.userService.getUserId(this.m).subscribe((res) => {
    this.client = res;
  });
}
//update user s'il ya un changement dans les coordnnées
updateUser() {
  for(let i = 0 ; i <= this.client.length ; i++) {
  this.userService.updateUser(this.client[i]).subscribe((res) => {
   console.log('client' ,  this.client);
  });
window.location.replace("checkout")
}
}
}
