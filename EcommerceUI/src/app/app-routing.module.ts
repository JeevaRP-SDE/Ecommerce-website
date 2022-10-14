import { NewproductComponent } from './newproduct/newproduct.component';
import { AdminAddComponent } from './admin-add/admin-add.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AccountComponent } from './account/account.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductsComponent } from './products/products.component';
import { AdminComponent } from './admin/admin.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AddproductComponent } from './addproduct/addproduct.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'newproduct',component: NewproductComponent},
  { path: 'addproduct', component: AddproductComponent},
  { path: 'admindashboard', component: AdmindashboardComponent},
  { path: 'admin-add',component: AdminAddComponent},
  { path: 'admin',component: AdminComponent},
  { path: 'products', component: ProductsComponent },
  { path: 'product-details', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'account', component: AccountComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
