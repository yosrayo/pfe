import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSearchPipe } from 'ng-search-pipe';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';


import { HomeComponent } from './home/home.component';

import { CheckOutComponent } from './check-out/check-out.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductComponent } from './product/product.component';
import { ShopComponent } from './shop/shop.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LivreurComponent } from './livreur/livreur.component';
import { QuantiteComponent } from './quantite/quantite.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { RatingModule } from 'ng-starrating';
import { FavorisComponent } from './favoris/favoris.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
   
    CheckOutComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    ShopComponent,
    FooterComponent,
    NavbarComponent,
    LivreurComponent,
    QuantiteComponent,
    AboutusComponent,
    FavorisComponent,
    ResetPassComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule ,
    NgSearchPipe , 
    RatingModule,
    HttpClientModule
    
    
  


   
    
  
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
