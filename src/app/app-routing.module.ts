import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { QuantiteComponent } from './quantite/quantite.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { LivreurComponent } from './livreur/livreur.component';

import{ HomeComponent} from './home/home.component';
import{ RegisterComponent} from './register/register.component';
import{LoginComponent} from './login/login.component';
import{ContactComponent} from './contact/contact.component';
import{ProductComponent} from './product/product.component';

import{CheckOutComponent} from'./check-out/check-out.component';







const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full' },
  {path:'shop', component: ShopComponent },
  {path:'quantite', component: QuantiteComponent },
  {path:'home', component: HomeComponent },
  {path:'login', component: LoginComponent },
  {path:'register', component: RegisterComponent },
  {path:'contact', component: ContactComponent },
  {path:'product', component: ProductComponent },
  {path:'aboutus', component: AboutusComponent },
  {path:'livreur', component: LivreurComponent },
  {path:'checkout', component: CheckOutComponent }
  

]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
