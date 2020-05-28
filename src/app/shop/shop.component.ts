import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
    this.clo = localStorage.getItem("clo");
    this.food = localStorage.getItem("food");
    this.bb = localStorage.getItem("bb");
    this.beauty = localStorage.getItem("beauty");

  }

}
