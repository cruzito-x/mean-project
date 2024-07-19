import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { CategoriesComponent } from './categories/categories.component';
import { BrandsComponent } from './brands/brands.component';
import { OffersComponent } from './offers/offers.component';
import { CartComponent } from './pay/cart/cart.component';
import { HomeComponent } from './home/home.component';
import { PayComponent } from './pay/pay.component';
import { CategoryComponent } from './categories/category/category.component';
import { DetailsComponent } from './categories/details/details.component';
import { BrandProductsComponent } from './brands/brand-products/brand-products.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductsComponent } from './products/products.component';
import { AccountComponent } from './account/account.component';

export const routes: Routes = [
  { path: "", component: HomeComponent, data: { params: ':isLoggedIn' } },
  { path: "register", component: RegisterComponent },
  { path: "account", component: AccountComponent },
  { path: "categories", component: CategoriesComponent },
  { path: "category/:category/:subcategory/:subsubcategory/:id", component: CategoryComponent },
  { path: "details/:name/:id", component: DetailsComponent},
  { path: "offers", component: OffersComponent },
  { path: "brands", component: BrandsComponent},
  { path: "brand/:brand", component: BrandProductsComponent},
  { path: "pay", component: PayComponent},
  { path: "products/:category", component: ProductsComponent},
  { path: "**", component: NotFoundComponent }
];
