import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { parseTemplate } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  users:User[];
  b=false;
  i:string;
  email: string;
  password: string;
  constructor(private router: Router,private userService:UserService) { }
 
  ngOnInit(): void {
    this.user= new User();
    this.getUsers();
  }

  getUsers()
  {
    this.userService.getUsers().subscribe(users => this.users = users);
    console.log(this.users);
    
  }
  connexion() {
   
  
    for(let us of this.users)
    {
      console.log("loop");
      if((this.user.email==us.email)&&(this.user.mdp==us.mdp))
     { 
    this.b=true;
      
    
    //localStorage.setItem("id",this.user.id.toString());
    window.location.replace("shop");
   
    localStorage.setItem("name",this.i);
    localStorage.setItem("id","");
    
     }
    
    }
        
      
        if(!this.b)
        {
          alert("compte non reconnu!");
        }
      
    }

  
}
