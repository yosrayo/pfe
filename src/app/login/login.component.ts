import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  users:User[];
  b=false;
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
  connexion()

  {
   
for(let us of this.users)
{
  console.log("loop");
  if((this.user.email==us.email)&&(this.user.mdp==us.mdp))
 { alert("ok");
this.b=true;
  


//window.location.replace("home");
localStorage.setItem("name","user");
break;
 }
}
    
  
    if(!this.b)
    {
      alert("compte non reconnu!");
    }
  
}

  
}
