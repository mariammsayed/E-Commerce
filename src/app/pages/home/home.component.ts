import { WishlistService } from './../../core/services/wishlist/wishlist.service';
import { CategoriesService } from './../../core/services/categories/categories.service';
import { Component, inject, NgModule, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { Icategories } from '../../shared/interfaces/icategories';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  imports: [RouterLink,CarouselModule, RouterLink , SearchPipe , FormsModule , TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',

})
export class HomeComponent implements OnInit {

  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  search:string = '';
  products:Iproduct[] = [];
  categories:Icategories[] = [];
  wishListData:string[] = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
    navText: ['<span class=" text-[#316565]"><i class="fa-solid fa-angles-left"></i></span>', '<span class=" text-[#316565]"><i class="fa-solid fa-angles-right"></i></span>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }



    ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
    this.wishlistService.getAllWishList().subscribe(res=>{
      this.wishListData = res.data.map((item:any)=>item._id)
    })
  }


  getAllProducts(){
    
    this.productsService.getAllProducts().subscribe({
      next:(res)=>{
        this.products = res.data
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  getAllCategories(){
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categories = res.data
        
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }


  addToCart(id:string){
    this.cartService.addToCart(id).subscribe({
      next:res=>{
        
        this.toastrService.success( res.message , 'Exclusive');
        this.cartService.cartNumber.set(res.numOfCartItems)

        
        
      },
      error:err=>{
        console.log(err);
        
      }
    })

  }

  addProductToWishList(id:string){

    this.wishlistService.addProductToWishList(id).subscribe({
      next:res=>{
        
        
          this.toastrService.success( res.message , 'Exclusive');
          this.wishlistService.wishListCount.set(res.data.length);
          localStorage.setItem('red','text-red-500');
          this.wishListData = res.data


          

          
        
      }
      
    })
    
  }



  removeproductFromWishList(id:string):void{
    this.wishlistService.removeProductFromWishList(id).subscribe(res=>{ 
      this.toastrService.success( res.message , 'Exclusive');
      this.wishListData = res.data
    })
  }




}







