import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrandsComponent } from './brands/brands.component';
import { OffersComponent } from './offers/offers.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { PayComponent } from './pay/pay.component';
import { CategoryComponent } from './categories/category/category.component';
import { DetailsComponent } from './categories/details/details.component';
import { BrandProductsComponent } from './brands/brand-products/brand-products.component';

export const routes: Routes = [
  { path: "", component: HomeComponent, data: { params: ':isLoggedIn' } },
  { path: "register", component: RegisterComponent },
  { path: "categories", component: CategoriesComponent },
  { path: "category/:category/:subcategory/:subsubcategory/:id", component: CategoryComponent },
  { path: "details/:name/:id", component: DetailsComponent},
  { path: "offers", component: OffersComponent },
  { path: "brands", component: BrandsComponent},
  { path: "brand/:brand", component: BrandProductsComponent},
  { path: "cart", component: CartComponent },
  { path: "pay", component: PayComponent}
];
