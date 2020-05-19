import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  constructor(private router: Router) { }
 
  ngOnInit(): void {
    this.user= new User();
  }
  
  connexion()
  {
    if((this.user.email=="admin@gmail.com")||(this.user.mdp=="admin"))
    {
window.location.replace("home");
localStorage.setItem("name","admin");

    }
    else
    {
      alert("compte non reconnue!");
      localStorage.setItem("name","");
    }
  }
  
}
