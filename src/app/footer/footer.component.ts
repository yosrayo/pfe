import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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
