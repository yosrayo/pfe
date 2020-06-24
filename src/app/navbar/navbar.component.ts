import { Component, OnInit } from '@angular/core';
import { PanierService } from '../services/panier.service';
import { CategorieService } from '../services/categorie.service';
import { Categorie } from '../classes/categorie';
import { FavorisService } from '../services/favoris.service';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchText: String;
  nameUser = localStorage.getItem('name');
  list = [] as any ;
  l = [] as any ;
  p = [] as any ;
  ll = [] as any ;
  loc: string;
 cat = [] as any ;
 selected: string;
 fr = 'fr';
  categorie:Categorie;
  totalamount:number;
  num:number;
  nav:string;
  m:number;
  client = [] as any ;
  constructor(public translate: TranslateService, private userService:UserService ,private panierService:PanierService ,private categorieService: CategorieService, private favorisService:FavorisService ) { 
    translate.addLangs(['en' , 'fr' ]);
    translate.setDefaultLang('en');

  }
  
  ngOnInit(): void {
    this.nav = localStorage.getItem("nav");
    this.navbar();
    
    this.nember();
    this.panierService.getPaniers().subscribe((res) => {
      this.list = res;
      console.log("listPanier",this.list);
      for(let i = 0 ; i < this.list.length ; i++) {
       if(localStorage.getItem("id") === this.list[i].id_user.toString()) {
          this.p.push(this.list[i]);
          console.log(" p " ,this.p);
        }}
  
    

    });
    this.categorieService .getCategories().subscribe((res) => {
      this.cat = res;
    });

    this.favorisService.getFavoriss().subscribe((res) => {
      this.l = res;
      //console.log("listFv",this.l);
      for(let i = 0 ; i <= this.l.length ; i++) {
       if(localStorage.getItem("id") === this.l[i].id_user.toString()) {
          this.ll.push(this.l[i]);
          console.log("ll " ,this.ll);
        }
      }
    });
this.nemberFav();
  }

  nemberFav() {
    console.log("favnum",this.num);
        this.num = this.ll.length;   
         return this.num;

}
  
  clothers() {
    localStorage.setItem("clo","clo");
    window.location.replace("shop");
    localStorage.removeItem("food");
    localStorage.removeItem("bb");
    localStorage.removeItem("beauty");

  }
  beauty() {
    localStorage.setItem("beauty","beauty");
    window.location.replace("shop");
    localStorage.removeItem("food");
    localStorage.removeItem("bb");
    localStorage.removeItem("clo");

  }
  food() {
    localStorage.setItem("food","food");
    window.location.replace("shop");
    localStorage.removeItem("beauty");
    localStorage.removeItem("bb");
    localStorage.removeItem("clo");

  }
  baby() {
    localStorage.setItem("bb","bb");
    window.location.replace("shop");
    localStorage.removeItem("food");
    localStorage.removeItem("beauty");
    localStorage.removeItem("clo");

  }
  
  
  shop() {
    localStorage.setItem("clo","clo");
    localStorage.setItem("food","food");
    localStorage.setItem("bb","bb");
    localStorage.setItem("beauty","beauty");
    window.location.replace("shop");
  }
  
  fb(){
    window.open('https://www.facebook.com/polpoTN/');
  }
  twitter(){
    window.open('http://localhost:4200/ch');
  }
  insta(){
    window.open('https://www.instagram.com/polpo.shop/');
  }

  c() {
    if(localStorage.getItem('name') === '') {
      return false;
    } else {
      return true;
    }
  }
  logout() {
    window.location.replace("login");
    localStorage.setItem("name","");;
    localStorage.removeItem("id");
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
nember() {
          this.num = this.p.length;   
  return this.num;

}
//delete de panier
onDelete(_id: string) {
  if (confirm('Voulez-vous vraiment supprimer ce produit ?') === true) {
    this.panierService.deletePanier(_id).subscribe((res) => {
      this.ngOnInit();
    });
    window.location.replace("shop");
  }
}
//langues
filterChanged(selectedValue: string) {
  this.selected = selectedValue;
  this.translate.use(this.selected);
  console.log( this.selected);
  console.log( selectedValue);
  localStorage.setItem('lng', this.selected);
 

}
//navbar
navbar(){
  localStorage.removeItem("nav");
}



}
