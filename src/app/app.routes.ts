import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { logedGuard } from './core/guards/loged/loged.guard';

export const routes: Routes = [
    {path:'' , redirectTo:'login' ,pathMatch:'full'},
    {
        path:'',
        component:AuthLayoutComponent,
        children:[
            {path:'login' , component:LoginComponent , title:'Login' ,canActivate:[logedGuard]},
            {path:'register' ,component:RegisterComponent , title:'Register' , canActivate:[logedGuard] },
            {path:'forget-password' , loadComponent:()=>import('./shared/components/forget-passowrd/forget-passowrd.component').then((c)=>c.ForgetPassowrdComponent) , title:'Reset Password'},
        ]
    },
    {
        path:'',
        component:MainLayoutComponent,
        children:[
            {path:'' , redirectTo:'home' ,pathMatch:'full'},
            {path:'home' , loadComponent:()=>import('./pages/home/home.component').then((c)=>c.HomeComponent) , title:'Home' , canActivate:[ authGuard],},
            {path:'cart' , loadComponent:()=>import('./pages/cart/cart.component').then((c)=>c.CartComponent) , title:'Cart', canActivate:[ authGuard],},
            {path:'products' , loadComponent:()=>import('./pages/products/products.component').then((c)=>c.ProductsComponent) , title:'Products' , canActivate:[ authGuard],},
            {path:'brands' , loadComponent:()=>import('./pages/brands/brands.component').then((c)=>c.BrandsComponent) , title:'Brands', canActivate:[ authGuard],},
            {path:'allorders' , loadComponent:()=>import('./pages/allorders/allorders.component').then((c)=>c.AllordersComponent) , title:'All Orders', canActivate:[ authGuard],},
            {path:'category' , loadComponent:()=>import('./pages/categories/categories.component').then((c)=>c.CategoriesComponent) , title:'Categories', canActivate:[ authGuard],},
            {path:'checkout/:id' , loadComponent:()=>import('./pages/checkout/checkout.component').then((c)=>c.CheckoutComponent) , title:'Checkout', canActivate:[ authGuard],},
            {path:'details/:id' , loadComponent:()=>import('./pages/details/details.component').then((c)=>c.DetailsComponent) , title:'Details', canActivate:[ authGuard],},
            {path:'wishlist' , loadComponent:()=>import('./pages/wishlist/wishlist.component').then((c)=>c.WishlistComponent) , title:'Wishlist', canActivate:[ authGuard],},
            {path:'**' , loadComponent:()=>import('./pages/notfound/notfound.component').then((c)=>c.NotfoundComponent) , title:'Not Found'},
        ]
    }    ,
    {path:'**' , loadComponent:()=>import('./pages/notfound/notfound.component').then((c)=>c.NotfoundComponent) , title:'Not Found'}
];
