import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import {  RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';



@Component({
  selector: 'app-home',
  imports: [ RouterLink , SearchPipe , FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',

})
export class ProductsComponent implements OnInit {

  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);
  
  search:string = '';
  products:Iproduct[] = [];
  wishListData:string[] = [];





  ngOnInit(): void {
    this.getAllProducts();
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




  addToCart(id:string){
    this.cartService.addToCart(id).subscribe({
      next:res=>{
        console.log(res);
        this.toastrService.success( res.message , 'Exclusive');
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



