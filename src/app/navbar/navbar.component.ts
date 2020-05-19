import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  searchText: String;
  nameUser = localStorage.getItem('name'); 
  constructor() { }

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
}
