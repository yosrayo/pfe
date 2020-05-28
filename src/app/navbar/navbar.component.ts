import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchText: String;
  nameUser = localStorage.getItem('name');

  constructor() { 
    
  }
  
  ngOnInit(): void {
  }
  c() {
    if(localStorage.getItem('name') === '') {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    localStorage.setItem("name","")
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
}
