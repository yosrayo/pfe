import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PanierService } from '../services/panier.service';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';
import { Panier } from '../classes/panier';

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
 p=[] as any;
 totalamount:number;
  constructor(private formBuilder: FormBuilder, private panierService:PanierService, private userService:UserService ) { }

  ngOnInit(): void {
  
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

getTotal() {
  let total = 0;
  for (var i = 0; i < this.p.length; i++) {
      if (this.p[i].prix) {
          total += this.p[i].prix;
          this.totalamount = total;
      }
  }
  return total;
}

checkoutForm(){
this.userService.getUsers().subscribe((res) => {
 
   if(localStorage.getItem("id") === this.user.id.toString()) {
     this.list=res;
   }
   
});
}
}
