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
  client = [] as any ;
  idr:number;
  trouve=0;
  i = 0;
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
     if(localStorage.getItem("id") === this.list[i].id_user.toString()) {
        this.p.push(this.list[i]);
        console.log(" p " ,this.p);
      }}

  });
  this.userService .getUsers().subscribe((res) => {
    this.client = res;
   console.log("client0",this.client[0]);
   console.log("client0",this.client[0].nom);
   console.log("client0",this.client[0].id);
   this.idr=localStorage.JSON.stringify("id") ;
   console.log("idconn",this.idr)
    
     // if(localStorage.getItem("id_user") === us.id.toString())

     
     do {
       if(this.client[this.i].id=== 10){
        console.log("clienti",this.client[this.i].nom);
        this.trouve=1;
       }else{
        this.i += 1;
       }
      
       console.log(this.i);
     } while (this.trouve==0);

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
    if(localStorage.getItem("id") === this.list[i].id_user.toString()) {
      console.log("nnn" ,this.list)
     this.list1= this.list[i] ;
     console.log("nnn" ,this.list1)
   }}
   
});

}

PasseCommande(){
  for(let u of this.p){
    this.commande.id_user= JSON.parse(localStorage.getItem('id'));
    this.commande.id_produit=u.id_produit;
     this.commande.date=this.today;
     this.commande.quantite=u.quantite;
    this.commandeService.create(this.commande).subscribe(commande=>{this.commandes.push(commande)}); 
    
    
  }
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

updateForm(form: NgForm) {
  for(let i = 0 ; i <= this.p.length ; i++) {
    if(localStorage.getItem("id") === this.list[i].id_user.toString()) {
  this.userService.updateUser(form.value).subscribe((res) => {
   console.log('user');
  });
window.location.replace("checkout")
}
  }
}
}
