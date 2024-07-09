import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrandsComponent } from './brands/brands.component';
import { OffersComponent } from './offers/offers.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: "", component: HomeComponent, data: { params: ':isLoggedIn' } },
  { path: "register", component: RegisterComponent },
  { path: "categories", component: CategoriesComponent },
  { path: "offers", component: OffersComponent },
  { path: "brands", component: BrandsComponent, data: { params: ':brand' }},
  { path: "cart", component: CartComponent }
];
