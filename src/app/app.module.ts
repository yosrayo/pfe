import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgSearchPipe } from 'ng-search-pipe';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { BlogDetailsComponent } from './blog-details/blog-details.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlogDetailsComponent,
    CheckOutComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    ProductComponent,
    ShopComponent,
    FooterComponent,
    NavbarComponent,
    LivreurComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule ,NgSearchPipe,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
