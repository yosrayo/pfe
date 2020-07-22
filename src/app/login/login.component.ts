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
  id:number;
  u = {} as any;
  h: any;
  constructor(private router: Router,private userService:UserService) { }
 
  ngOnInit(): void {
    this.user= new User();
    this.userService.getUsers().subscribe((res) => {
      this.u = res;
      
    });
    this.getUsers();
    console.log('rrrr' , this.u)
  }

  getUsers()
  {
    this.userService.getUsers().subscribe((res) => {
      this.u = res;
     
    });
  
    
  }
  connexion() {
    console.log('rrrr' , this.u)
  
    for(let us of this.u)
    {
      console.log("loop");
      if((this.user.email==us.email)&&(this.user.mdp==us.mdp))
     { 
    this.b=true;
      this.h = us ;
    localStorage.setItem("id",JSON.stringify(this.h.id));
    localStorage.setItem("user",JSON.stringify(this.h));
  
    window.location.replace("shop");
   
    localStorage.setItem("name",this.i);
    
    
     }
    
    }
        
      
        if(!this.b)
        {
          alert("compte non reconnu!");
        }
      
    }

  
}
